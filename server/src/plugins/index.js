'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const logger = require('../utils/logger');
const auth = require('./auth');

// Swagger documentation options
const swaggerOptions = {
  info: {
    title: 'DXC Pathfinder API Documentation',
    version: '1.0.0',
    description: 'API documentation for DXC Pathfinder platform - an AI-powered sales enablement system designed to enhance DXC\'s sales process.'
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT token obtained from Azure AD authentication. Format: Bearer {token}'
    }
  },
  security: [{ jwt: [] }],
  // Define documentation paths
  documentationPath: '/documentation',
  swaggerUIPath: '/swagger',
  jsonPath: '/swagger.json',
  // Additional documentation options
  expanded: 'list',
  grouping: 'tags',
  sortEndpoints: 'ordered',
  auth: false, // Allow access to documentation without authentication
  // Add authentication instructions
  documentationPage: true,
  validatorUrl: null,
  templates: {
    // Add custom documentation content
    index: `
      <div style="padding: 20px 0; background-color: #f8f9fa; margin-bottom: 20px; border-radius: 5px; padding: 15px;">
        <h2>Authentication</h2>
        <p>Most API endpoints require authentication using a JWT token.</p>
        <p>To authenticate:</p>
        <ol>
          <li>Obtain a JWT token from Azure AD</li>
          <li>Click the "Authorize" button at the top of this page</li>
          <li>Enter your token in the format: <code>Bearer your-token-here</code></li>
          <li>Click "Authorize" and close the dialog</li>
        </ol>
        <p>In development mode, you can use a simplified authentication mechanism.</p>
      </div>
    `
  }
};

// Register all plugins
module.exports = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  {
    plugin: HapiAuthJwt2
  },
  {
    plugin: {
      name: 'authentication',
      register: async (server) => {
        // Register authentication strategy
        await auth.register(server);
        logger.info('Authentication plugin registered');
      }
    }
  },
  {
    plugin: {
      name: 'error-handler',
      register: async (server) => {
        // Global error handler
        server.ext('onPreResponse', (request, h) => {
          const response = request.response;

          if (!response.isBoom) {
            return h.continue;
          }

          // Log error
          logger.error(`Error response: ${response.message}`, {
            statusCode: response.output.statusCode,
            error: response.output.payload.error,
            path: request.path,
            method: request.method
          });

          return h.continue;
        });

        logger.info('Error handler plugin registered');
      }
    }
  }
];