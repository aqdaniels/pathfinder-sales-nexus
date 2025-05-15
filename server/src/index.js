'use strict';

const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.warn(`No .env file found at ${envPath}. Using environment variables from the system.`);
  dotenv.config();
}

// Import server configuration
const config = require('./config');
const logger = require('./utils/logger');

// Import plugins
const plugins = require('./plugins');

// Import routes
const routes = require('./routes');

const init = async () => {
  // Create server instance
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
    routes: {
      cors: config.server.cors,
      validate: {
        failAction: (request, h, err) => {
          logger.error('Validation error:', err.message);
          throw err;
        }
      }
    }
  });

  // Register plugins
  await server.register(plugins);

  // Add routes
  server.route(routes);

  // Start server
  await server.start();
  logger.info(`Server running on ${server.info.uri}`);

  return server;
};

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection:', err);
  process.exit(1);
});

// Start the server
init();