'use strict';

// Simple script to test if the logger works
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.warn(`No .env file found at ${envPath}. Using environment variables from the system.`);
  dotenv.config();
}

// Import the logger
try {
  const logger = require('./src/utils/logger');
  
  // Test the logger
  console.log('Testing logger...');
  logger.info('This is an info message');
  logger.debug('This is a debug message');
  logger.warn('This is a warning message');
  logger.error('This is an error message');
  
  console.log('Logger test completed successfully!');
} catch (err) {
  console.error('Error testing logger:', err);
}
