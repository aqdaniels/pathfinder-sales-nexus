'use strict';

const Joi = require('joi');
const logger = require('../utils/logger');
const database = require('../utils/database');
const storage = require('../utils/storage');
const { ROLES } = require('../plugins/auth');

/**
 * Meeting Intelligence Routes
 */
module.exports = [
  // Get all meetings
  {
    method: 'GET',
    path: '/api/meetings',
    options: {
      description: 'Get all meetings',
      notes: 'Returns a list of all meetings',
      tags: ['api', 'meetings'],
      validate: {
        query: Joi.object({
          limit: Joi.number().integer().min(1).max(100).default(10),
          offset: Joi.number().integer().min(0).default(0),
          clientId: Joi.string().optional()
        })
      },
      handler: async (request, h) => {
        try {
          const { limit, offset, clientId } = request.query;
          
          // Build query based on parameters
          let sqlQuery = 'SELECT * FROM Meetings';
          const params = {};
          
          if (clientId) {
            sqlQuery += ' WHERE clientId = @clientId';
            params.clientId = clientId;
          }
          
          sqlQuery += ' ORDER BY meetingDate DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY';
          params.offset = offset;
          params.limit = limit;
          
          // Execute query
          const result = await database.query(sqlQuery, params);
          
          return {
            meetings: result.recordset,
            count: result.recordset.length,
            limit,
            offset
          };
        } catch (err) {
          logger.error('Error fetching meetings:', err);
          throw err;
        }
      }
    }
  },
  
  // Get meeting by ID
  {
    method: 'GET',
    path: '/api/meetings/{id}',
    options: {
      description: 'Get meeting by ID',
      notes: 'Returns a single meeting by ID',
      tags: ['api', 'meetings'],
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      },
      handler: async (request, h) => {
        try {
          const { id } = request.params;
          
          // Get meeting details
          const result = await database.query(
            'SELECT * FROM Meetings WHERE id = @id',
            { id }
          );
          
          if (result.recordset.length === 0) {
            return h.response({ message: 'Meeting not found' }).code(404);
          }
          
          const meeting = result.recordset[0];
          
          // Get meeting insights
          const insightsResult = await database.query(
            'SELECT * FROM MeetingInsights WHERE meetingId = @meetingId',
            { meetingId: id }
          );
          
          // Get meeting topics
          const topicsResult = await database.query(
            'SELECT * FROM MeetingTopics WHERE meetingId = @meetingId',
            { meetingId: id }
          );
          
          // Get meeting challenges
          const challengesResult = await database.query(
            'SELECT * FROM MeetingChallenges WHERE meetingId = @meetingId',
            { meetingId: id }
          );
          
          return {
            ...meeting,
            insights: insightsResult.recordset,
            topics: topicsResult.recordset,
            challenges: challengesResult.recordset
          };
        } catch (err) {
          logger.error(`Error fetching meeting ${request.params.id}:`, err);
          throw err;
        }
      }
    }
  },
  
  // Upload meeting recording
  {
    method: 'POST',
    path: '/api/meetings/upload',
    options: {
      description: 'Upload meeting recording',
      notes: 'Uploads a meeting recording for processing',
      tags: ['api', 'meetings'],
      payload: {
        maxBytes: 209715200, // 200MB
        output: 'stream',
        parse: true,
        multipart: true
      },
      validate: {
        payload: Joi.object({
          file: Joi.object().required(),
          meetingTitle: Joi.string().required(),
          meetingDate: Joi.date().iso().required(),
          clientId: Joi.string().required(),
          participants: Joi.string().required() // JSON string of participants
        })
      },
      handler: async (request, h) => {
        try {
          const { file, meetingTitle, meetingDate, clientId, participants } = request.payload;
          
          // Generate unique filename
          const timestamp = new Date().getTime();
          const fileName = `meeting_${timestamp}_${file.filename}`;
          
          // Upload file to Azure Blob Storage
          const uploadResult = await storage.uploadFile(
            fileName,
            file._data,
            {
              contentType: file.headers['content-type'],
              meetingTitle,
              meetingDate,
              clientId,
              uploadedBy: request.user.id
            }
          );
          
          // Create meeting record in database
          const meetingResult = await database.query(
            `INSERT INTO Meetings (title, meetingDate, clientId, recordingUrl, status, createdBy)
             VALUES (@title, @meetingDate, @clientId, @recordingUrl, 'processing', @createdBy);
             SELECT SCOPE_IDENTITY() AS id;`,
            {
              title: meetingTitle,
              meetingDate,
              clientId,
              recordingUrl: uploadResult.url,
              createdBy: request.user.id
            }
          );
          
          const meetingId = meetingResult.recordset[0].id;
          
          // Parse and store participants
          const parsedParticipants = JSON.parse(participants);
          for (const participant of parsedParticipants) {
            await database.query(
              `INSERT INTO MeetingParticipants (meetingId, name, email, role)
               VALUES (@meetingId, @name, @email, @role)`,
              {
                meetingId,
                name: participant.name,
                email: participant.email,
                role: participant.role
              }
            );
          }
          
          // Trigger async processing (in a real implementation, this would call an Azure Function)
          // processMeetingRecording(meetingId);
          
          return {
            id: meetingId,
            message: 'Meeting recording uploaded successfully and processing started',
            status: 'processing'
          };
        } catch (err) {
          logger.error('Error uploading meeting recording:', err);
          throw err;
        }
      }
    }
  },
  
  // Get meeting transcript
  {
    method: 'GET',
    path: '/api/meetings/{id}/transcript',
    options: {
      description: 'Get meeting transcript',
      notes: 'Returns the transcript for a meeting',
      tags: ['api', 'meetings'],
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      },
      handler: async (request, h) => {
        try {
          const { id } = request.params;
          
          // Get transcript from database
          const result = await database.query(
            'SELECT * FROM MeetingTranscripts WHERE meetingId = @meetingId ORDER BY timestamp',
            { meetingId: id }
          );
          
          if (result.recordset.length === 0) {
            return h.response({ message: 'Transcript not found' }).code(404);
          }
          
          return {
            meetingId: id,
            transcript: result.recordset
          };
        } catch (err) {
          logger.error(`Error fetching transcript for meeting ${request.params.id}:`, err);
          throw err;
        }
      }
    }
  },
  
  // Get meeting insights
  {
    method: 'GET',
    path: '/api/meetings/{id}/insights',
    options: {
      description: 'Get meeting insights',
      notes: 'Returns AI-generated insights for a meeting',
      tags: ['api', 'meetings'],
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      },
      handler: async (request, h) => {
        try {
          const { id } = request.params;
          
          // Get meeting details to check if processing is complete
          const meetingResult = await database.query(
            'SELECT status FROM Meetings WHERE id = @id',
            { id }
          );
          
          if (meetingResult.recordset.length === 0) {
            return h.response({ message: 'Meeting not found' }).code(404);
          }
          
          const meeting = meetingResult.recordset[0];
          
          if (meeting.status !== 'completed') {
            return h.response({ 
              message: 'Meeting processing not yet complete',
              status: meeting.status
            }).code(202);
          }
          
          // Get insights
          const insightsResult = await database.query(
            'SELECT * FROM MeetingInsights WHERE meetingId = @meetingId',
            { meetingId: id }
          );
          
          // Get topics
          const topicsResult = await database.query(
            'SELECT * FROM MeetingTopics WHERE meetingId = @meetingId ORDER BY confidence DESC',
            { meetingId: id }
          );
          
          // Get sentiment analysis
          const sentimentResult = await database.query(
            'SELECT * FROM MeetingSentiment WHERE meetingId = @meetingId',
            { meetingId: id }
          );
          
          // Get challenges
          const challengesResult = await database.query(
            'SELECT * FROM MeetingChallenges WHERE meetingId = @meetingId ORDER BY confidence DESC',
            { meetingId: id }
          );
          
          return {
            meetingId: id,
            insights: insightsResult.recordset,
            topics: topicsResult.recordset,
            sentiment: sentimentResult.recordset[0] || {},
            challenges: challengesResult.recordset
          };
        } catch (err) {
          logger.error(`Error fetching insights for meeting ${request.params.id}:`, err);
          throw err;
        }
      }
    }
  }
];
