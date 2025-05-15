'use strict';

const sql = require('mssql');
const config = require('../config');
const logger = require('./logger');

// SQL connection pool
let pool = null;

/**
 * Initialize the database connection pool
 */
const initializePool = async () => {
  try {
    // Check if we're in development mode with mock data
    if (config.server.env === 'development' && process.env.USE_MOCK_DB === 'true') {
      logger.info('Using mock database in development mode');
      // Create a mock pool that simulates database operations
      pool = {
        connected: true,
        request: () => {
          const request = {
            input: () => request,
            query: async () => ({ recordset: [] }),
            execute: async () => ({ recordset: [] })
          };
          return request;
        },
        close: async () => {}
      };
      return pool;
    }

    // Connect to real database
    pool = await new sql.ConnectionPool(config.azure.sql).connect();
    logger.info('Connected to Azure SQL Database');

    // Handle pool errors
    pool.on('error', err => {
      logger.error('SQL Pool Error:', err);
      // Attempt to reconnect after a delay
      setTimeout(initializePool, 5000);
    });

    return pool;
  } catch (err) {
    logger.error('Failed to connect to Azure SQL Database:', err);

    // In development mode, create a mock pool if connection fails
    if (config.server.env === 'development') {
      logger.warn('Creating mock database pool for development');
      pool = {
        connected: true,
        request: () => {
          const request = {
            input: () => request,
            query: async () => ({ recordset: [] }),
            execute: async () => ({ recordset: [] })
          };
          return request;
        },
        close: async () => {}
      };
      return pool;
    }

    throw err;
  }
};

/**
 * Get the database connection pool
 */
const getPool = async () => {
  if (!pool) {
    return await initializePool();
  }
  return pool;
};

/**
 * Execute a SQL query with parameters
 */
const query = async (sqlQuery, params = {}) => {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Add parameters to the request
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    return await request.query(sqlQuery);
  } catch (err) {
    logger.error('SQL Query Error:', err);
    throw err;
  }
};

/**
 * Execute a stored procedure with parameters
 */
const procedure = async (procedureName, params = {}) => {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Add parameters to the request
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    return await request.execute(procedureName);
  } catch (err) {
    logger.error('SQL Procedure Error:', err);
    throw err;
  }
};

module.exports = {
  initializePool,
  getPool,
  query,
  procedure
};