'use strict';

const pino = require('pino');
const config = require('../config');

// Configure logger based on environment
const logger = pino({
  level: config.server.env === 'production' ? 'info' : 'debug',
  // Removed pino-pretty transport to avoid dependency issues
  timestamp: pino.stdTimeFunctions.isoTime,
  // Simple configuration without external dependencies
  formatters: {
    level: (label) => {
      return { level: label };
    }
  }
});

module.exports = logger;