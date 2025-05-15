'use strict';

const Joi = require('joi');
const database = require('../utils/database');
const logger = require('../utils/logger');

module.exports = [
  {
    method: 'GET',
    path: '/health',
    options: {
      auth: false,
      description: 'Health check endpoint',
      notes: 'Returns the health status of the API',
      tags: ['api', 'health'],
      handler: async (request, h) => {
        try {
          // Check database connection
          const pool = await database.getPool();
          const dbStatus = pool.connected ? 'connected' : 'disconnected';

          return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
              database: dbStatus
            }
          };
        } catch (err) {
          logger.error('Health check error:', err);
          return h.response({
            status: 'error',
            timestamp: new Date().toISOString(),
            error: err.message,
            services: {
              database: 'error'
            }
          }).code(500);
        }
      }
    }
  }
];