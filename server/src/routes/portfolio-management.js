'use strict';

const Joi = require('joi');
const logger = require('../utils/logger');
const database = require('../utils/database');
const { ROLES } = require('../plugins/auth');

/**
 * Portfolio Management Routes
 */
module.exports = [
  // Get portfolio analytics
  {
    method: 'GET',
    path: '/api/portfolio/analytics',
    options: {
      description: 'Get portfolio analytics',
      notes: 'Returns analytics data for the portfolio',
      tags: ['api', 'portfolio'],
      validate: {
        query: Joi.object({
          practiceId: Joi.string().optional(),
          timeframe: Joi.string().valid('month', 'quarter', 'year').default('quarter'),
          region: Joi.string().optional()
        })
      },
      handler: async (request, h) => {
        try {
          const { practiceId, timeframe, region } = request.query;
          
          // Build query based on parameters
          let sqlQuery = `
            SELECT 
              p.name as practice,
              COUNT(DISTINCT m.id) as meetingCount,
              COUNT(DISTINCT m.clientId) as clientCount,
              AVG(ms.overallSentiment) as avgSentiment,
              COUNT(DISTINCT mc.id) as challengeCount
            FROM Practices p
            LEFT JOIN Solutions s ON s.practiceId = p.id
            LEFT JOIN Meetings m ON m.id IN (
              SELECT meetingId FROM MeetingSolutions WHERE solutionId = s.id
            )
            LEFT JOIN MeetingSentiment ms ON ms.meetingId = m.id
            LEFT JOIN MeetingChallenges mc ON mc.meetingId = m.id
          `;
          
          const conditions = [];
          const params = {};
          
          if (practiceId) {
            conditions.push('p.id = @practiceId');
            params.practiceId = practiceId;
          }
          
          if (region) {
            conditions.push('m.region = @region');
            params.region = region;
          }
          
          // Add timeframe condition
          const now = new Date();
          let startDate;
          
          if (timeframe === 'month') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          } else if (timeframe === 'quarter') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          } else { // year
            startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          }
          
          conditions.push('m.meetingDate >= @startDate');
          params.startDate = startDate.toISOString();
          
          if (conditions.length > 0) {
            sqlQuery += ' WHERE ' + conditions.join(' AND ');
          }
          
          sqlQuery += ' GROUP BY p.name';
          
          // Execute query
          const result = await database.query(sqlQuery, params);
          
          // Get top challenges across all meetings
          const challengesQuery = `
            SELECT 
              mc.name,
              COUNT(*) as count,
              AVG(mc.confidence) as avgConfidence
            FROM MeetingChallenges mc
            JOIN Meetings m ON mc.meetingId = m.id
          `;
          
          let challengeConditions = [];
          
          if (practiceId) {
            challengeConditions.push('m.id IN (SELECT meetingId FROM MeetingSolutions ms JOIN Solutions s ON ms.solutionId = s.id WHERE s.practiceId = @practiceId)');
          }
          
          if (region) {
            challengeConditions.push('m.region = @region');
          }
          
          challengeConditions.push('m.meetingDate >= @startDate');
          
          if (challengeConditions.length > 0) {
            challengesQuery += ' WHERE ' + challengeConditions.join(' AND ');
          }
          
          challengesQuery += ' GROUP BY mc.name ORDER BY count DESC LIMIT 10';
          
          const challengesResult = await database.query(challengesQuery, params);
          
          // Get solution performance metrics
          const solutionsQuery = `
            SELECT 
              s.name,
              COUNT(DISTINCT m.id) as meetingCount,
              COUNT(DISTINCT m.clientId) as clientCount,
              AVG(ms.overallSentiment) as avgSentiment
            FROM Solutions s
            LEFT JOIN MeetingSolutions ms ON ms.solutionId = s.id
            LEFT JOIN Meetings m ON ms.meetingId = m.id
            LEFT JOIN MeetingSentiment mst ON mst.meetingId = m.id
          `;
          
          let solutionConditions = [];
          
          if (practiceId) {
            solutionConditions.push('s.practiceId = @practiceId');
          }
          
          if (region) {
            solutionConditions.push('m.region = @region');
          }
          
          solutionConditions.push('m.meetingDate >= @startDate');
          
          if (solutionConditions.length > 0) {
            solutionsQuery += ' WHERE ' + solutionConditions.join(' AND ');
          }
          
          solutionsQuery += ' GROUP BY s.name ORDER BY meetingCount DESC LIMIT 10';
          
          const solutionsResult = await database.query(solutionsQuery, params);
          
          return {
            practices: result.recordset,
            topChallenges: challengesResult.recordset,
            topSolutions: solutionsResult.recordset,
            timeframe,
            startDate: startDate.toISOString(),
            endDate: now.toISOString()
          };
        } catch (err) {
          logger.error('Error fetching portfolio analytics:', err);
          throw err;
        }
      }
    }
  },
  
  // Get challenge trends
  {
    method: 'GET',
    path: '/api/portfolio/challenge-trends',
    options: {
      description: 'Get challenge trends',
      notes: 'Returns trend data for challenges over time',
      tags: ['api', 'portfolio'],
      validate: {
        query: Joi.object({
          practiceId: Joi.string().optional(),
          timeframe: Joi.string().valid('month', 'quarter', 'year').default('quarter'),
          region: Joi.string().optional(),
          challengeName: Joi.string().optional()
        })
      },
      handler: async (request, h) => {
        try {
          const { practiceId, timeframe, region, challengeName } = request.query;
          
          // Determine time grouping based on timeframe
          let timeGroup;
          let startDate;
          const now = new Date();
          
          if (timeframe === 'month') {
            timeGroup = 'DAY(m.meetingDate)';
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          } else if (timeframe === 'quarter') {
            timeGroup = 'WEEK(m.meetingDate)';
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          } else { // year
            timeGroup = 'MONTH(m.meetingDate)';
            startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          }
          
          // Build query
          let sqlQuery = `
            SELECT 
              ${timeGroup} as timePeriod,
              mc.name as challengeName,
              COUNT(*) as count,
              AVG(mc.confidence) as avgConfidence
            FROM MeetingChallenges mc
            JOIN Meetings m ON mc.meetingId = m.id
          `;
          
          const conditions = [];
          const params = {};
          
          if (practiceId) {
            conditions.push('m.id IN (SELECT meetingId FROM MeetingSolutions ms JOIN Solutions s ON ms.solutionId = s.id WHERE s.practiceId = @practiceId)');
            params.practiceId = practiceId;
          }
          
          if (region) {
            conditions.push('m.region = @region');
            params.region = region;
          }
          
          if (challengeName) {
            conditions.push('mc.name = @challengeName');
            params.challengeName = challengeName;
          }
          
          conditions.push('m.meetingDate >= @startDate');
          params.startDate = startDate.toISOString();
          
          if (conditions.length > 0) {
            sqlQuery += ' WHERE ' + conditions.join(' AND ');
          }
          
          sqlQuery += ` GROUP BY ${timeGroup}, mc.name ORDER BY ${timeGroup}, mc.name`;
          
          // Execute query
          const result = await database.query(sqlQuery, params);
          
          // Transform data for time series visualization
          const challenges = [...new Set(result.recordset.map(r => r.challengeName))];
          const timePeriods = [...new Set(result.recordset.map(r => r.timePeriod))].sort((a, b) => a - b);
          
          const trends = timePeriods.map(period => {
            const periodData = { timePeriod: period };
            
            challenges.forEach(challenge => {
              const record = result.recordset.find(r => r.timePeriod === period && r.challengeName === challenge);
              periodData[challenge] = record ? record.count : 0;
            });
            
            return periodData;
          });
          
          return {
            challenges,
            timePeriods,
            trends,
            timeframe,
            startDate: startDate.toISOString(),
            endDate: now.toISOString()
          };
        } catch (err) {
          logger.error('Error fetching challenge trends:', err);
          throw err;
        }
      }
    }
  },
  
  // Get solution performance
  {
    method: 'GET',
    path: '/api/portfolio/solution-performance',
    options: {
      description: 'Get solution performance metrics',
      notes: 'Returns performance metrics for solutions',
      tags: ['api', 'portfolio'],
      validate: {
        query: Joi.object({
          practiceId: Joi.string().optional(),
          timeframe: Joi.string().valid('month', 'quarter', 'year').default('quarter'),
          region: Joi.string().optional(),
          solutionId: Joi.string().optional()
        })
      },
      handler: async (request, h) => {
        try {
          const { practiceId, timeframe, region, solutionId } = request.query;
          
          // Build query
          let sqlQuery = `
            SELECT 
              s.id,
              s.name,
              COUNT(DISTINCT m.id) as meetingCount,
              COUNT(DISTINCT m.clientId) as clientCount,
              AVG(ms.overallSentiment) as avgSentiment,
              SUM(CASE WHEN m.outcome = 'positive' THEN 1 ELSE 0 END) as positiveOutcomes,
              SUM(CASE WHEN m.outcome = 'negative' THEN 1 ELSE 0 END) as negativeOutcomes,
              SUM(CASE WHEN m.outcome = 'neutral' THEN 1 ELSE 0 END) as neutralOutcomes
            FROM Solutions s
            LEFT JOIN MeetingSolutions ms ON ms.solutionId = s.id
            LEFT JOIN Meetings m ON ms.meetingId = m.id
            LEFT JOIN MeetingSentiment mst ON mst.meetingId = m.id
          `;
          
          const conditions = [];
          const params = {};
          
          if (practiceId) {
            conditions.push('s.practiceId = @practiceId');
            params.practiceId = practiceId;
          }
          
          if (region) {
            conditions.push('m.region = @region');
            params.region = region;
          }
          
          if (solutionId) {
            conditions.push('s.id = @solutionId');
            params.solutionId = solutionId;
          }
          
          // Add timeframe condition
          const now = new Date();
          let startDate;
          
          if (timeframe === 'month') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          } else if (timeframe === 'quarter') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          } else { // year
            startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          }
          
          conditions.push('m.meetingDate >= @startDate');
          params.startDate = startDate.toISOString();
          
          if (conditions.length > 0) {
            sqlQuery += ' WHERE ' + conditions.join(' AND ');
          }
          
          sqlQuery += ' GROUP BY s.id, s.name ORDER BY meetingCount DESC';
          
          // Execute query
          const result = await database.query(sqlQuery, params);
          
          return {
            solutions: result.recordset,
            timeframe,
            startDate: startDate.toISOString(),
            endDate: now.toISOString()
          };
        } catch (err) {
          logger.error('Error fetching solution performance:', err);
          throw err;
        }
      }
    }
  }
];
