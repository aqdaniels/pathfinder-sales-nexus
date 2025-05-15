'use strict';

const Joi = require('joi');
const logger = require('../utils/logger');
const database = require('../utils/database');
const { ROLES } = require('../plugins/auth');

/**
 * Solution Mapping Routes
 */
module.exports = [
  // Get all solutions
  {
    method: 'GET',
    path: '/api/solutions',
    options: {
      description: 'Get all solutions',
      notes: 'Returns a list of all DXC solutions',
      tags: ['api', 'solutions'],
      validate: {
        query: Joi.object({
          limit: Joi.number().integer().min(1).max(100).default(50),
          offset: Joi.number().integer().min(0).default(0),
          category: Joi.string().optional(),
          industry: Joi.string().optional()
        })
      },
      handler: async (request, h) => {
        try {
          const { limit, offset, category, industry } = request.query;
          
          // Build query based on parameters
          let sqlQuery = 'SELECT * FROM Solutions';
          const params = {};
          
          const conditions = [];
          
          if (category) {
            conditions.push('category = @category');
            params.category = category;
          }
          
          if (industry) {
            conditions.push('industry = @industry');
            params.industry = industry;
          }
          
          if (conditions.length > 0) {
            sqlQuery += ' WHERE ' + conditions.join(' AND ');
          }
          
          sqlQuery += ' ORDER BY name OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY';
          params.offset = offset;
          params.limit = limit;
          
          // Execute query
          const result = await database.query(sqlQuery, params);
          
          return {
            solutions: result.recordset,
            count: result.recordset.length,
            limit,
            offset
          };
        } catch (err) {
          logger.error('Error fetching solutions:', err);
          throw err;
        }
      }
    }
  },
  
  // Get solution by ID
  {
    method: 'GET',
    path: '/api/solutions/{id}',
    options: {
      description: 'Get solution by ID',
      notes: 'Returns a single solution by ID',
      tags: ['api', 'solutions'],
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      },
      handler: async (request, h) => {
        try {
          const { id } = request.params;
          
          // Get solution details
          const result = await database.query(
            'SELECT * FROM Solutions WHERE id = @id',
            { id }
          );
          
          if (result.recordset.length === 0) {
            return h.response({ message: 'Solution not found' }).code(404);
          }
          
          const solution = result.recordset[0];
          
          // Get solution capabilities
          const capabilitiesResult = await database.query(
            'SELECT * FROM SolutionCapabilities WHERE solutionId = @solutionId',
            { solutionId: id }
          );
          
          // Get solution case studies
          const caseStudiesResult = await database.query(
            'SELECT * FROM SolutionCaseStudies WHERE solutionId = @solutionId',
            { solutionId: id }
          );
          
          // Get solution references
          const referencesResult = await database.query(
            'SELECT * FROM SolutionReferences WHERE solutionId = @solutionId',
            { solutionId: id }
          );
          
          return {
            ...solution,
            capabilities: capabilitiesResult.recordset,
            caseStudies: caseStudiesResult.recordset,
            references: referencesResult.recordset
          };
        } catch (err) {
          logger.error(`Error fetching solution ${request.params.id}:`, err);
          throw err;
        }
      }
    }
  },
  
  // Get client challenges
  {
    method: 'GET',
    path: '/api/clients/{clientId}/challenges',
    options: {
      description: 'Get client challenges',
      notes: 'Returns challenges identified for a client',
      tags: ['api', 'clients', 'challenges'],
      validate: {
        params: Joi.object({
          clientId: Joi.string().required()
        })
      },
      handler: async (request, h) => {
        try {
          const { clientId } = request.params;
          
          // Get client challenges from meeting insights
          const result = await database.query(
            `SELECT mc.* 
             FROM MeetingChallenges mc
             JOIN Meetings m ON mc.meetingId = m.id
             WHERE m.clientId = @clientId
             ORDER BY mc.confidence DESC`,
            { clientId }
          );
          
          return {
            clientId,
            challenges: result.recordset
          };
        } catch (err) {
          logger.error(`Error fetching challenges for client ${request.params.clientId}:`, err);
          throw err;
        }
      }
    }
  },
  
  // Match solutions to client challenges
  {
    method: 'POST',
    path: '/api/clients/{clientId}/solution-matches',
    options: {
      description: 'Match solutions to client challenges',
      notes: 'Returns solutions matched to client challenges',
      tags: ['api', 'clients', 'solutions'],
      validate: {
        params: Joi.object({
          clientId: Joi.string().required()
        }),
        payload: Joi.object({
          challengeIds: Joi.array().items(Joi.string()).optional(),
          includeReferences: Joi.boolean().default(true),
          includeCaseStudies: Joi.boolean().default(true)
        })
      },
      handler: async (request, h) => {
        try {
          const { clientId } = request.params;
          const { challengeIds, includeReferences, includeCaseStudies } = request.payload;
          
          // Get client challenges if not provided
          let challenges = [];
          if (!challengeIds || challengeIds.length === 0) {
            const challengesResult = await database.query(
              `SELECT mc.* 
               FROM MeetingChallenges mc
               JOIN Meetings m ON mc.meetingId = m.id
               WHERE m.clientId = @clientId
               ORDER BY mc.confidence DESC`,
              { clientId }
            );
            challenges = challengesResult.recordset;
          } else {
            const challengesResult = await database.query(
              `SELECT * FROM MeetingChallenges WHERE id IN (${challengeIds.map((_, i) => `@id${i}`).join(',')})`,
              challengeIds.reduce((acc, id, i) => ({ ...acc, [`id${i}`]: id }), {})
            );
            challenges = challengesResult.recordset;
          }
          
          // Match solutions to challenges
          // In a real implementation, this would use a more sophisticated matching algorithm
          // For now, we'll use a simple keyword matching approach
          const matchedSolutions = [];
          
          for (const challenge of challenges) {
            // Find solutions that match the challenge keywords
            const solutionsResult = await database.query(
              `SELECT s.*, 
                      (SELECT COUNT(*) FROM SolutionKeywords sk 
                       WHERE sk.solutionId = s.id AND 
                             CONTAINS(LOWER(@challengeName), LOWER(sk.keyword))) as matchScore
               FROM Solutions s
               WHERE (SELECT COUNT(*) FROM SolutionKeywords sk 
                      WHERE sk.solutionId = s.id AND 
                            CONTAINS(LOWER(@challengeName), LOWER(sk.keyword))) > 0
               ORDER BY matchScore DESC`,
              { challengeName: challenge.name }
            );
            
            const solutions = solutionsResult.recordset;
            
            // For each matched solution, get additional data if requested
            for (const solution of solutions) {
              let solutionData = { ...solution };
              
              if (includeReferences) {
                const referencesResult = await database.query(
                  'SELECT * FROM SolutionReferences WHERE solutionId = @solutionId',
                  { solutionId: solution.id }
                );
                solutionData.references = referencesResult.recordset;
              }
              
              if (includeCaseStudies) {
                const caseStudiesResult = await database.query(
                  'SELECT * FROM SolutionCaseStudies WHERE solutionId = @solutionId',
                  { solutionId: solution.id }
                );
                solutionData.caseStudies = caseStudiesResult.recordset;
              }
              
              matchedSolutions.push({
                challenge,
                solution: solutionData,
                matchScore: solution.matchScore
              });
            }
          }
          
          // Group by solution and calculate overall match score
          const solutionMap = {};
          
          for (const match of matchedSolutions) {
            if (!solutionMap[match.solution.id]) {
              solutionMap[match.solution.id] = {
                solution: match.solution,
                challenges: [],
                overallScore: 0
              };
            }
            
            solutionMap[match.solution.id].challenges.push({
              challenge: match.challenge,
              matchScore: match.matchScore
            });
            
            solutionMap[match.solution.id].overallScore += match.matchScore * (match.challenge.confidence / 100);
          }
          
          // Convert to array and sort by overall score
          const result = Object.values(solutionMap)
            .sort((a, b) => b.overallScore - a.overallScore);
          
          return {
            clientId,
            matches: result
          };
        } catch (err) {
          logger.error(`Error matching solutions for client ${request.params.clientId}:`, err);
          throw err;
        }
      }
    }
  }
];
