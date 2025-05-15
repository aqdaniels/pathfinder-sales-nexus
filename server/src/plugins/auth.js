'use strict';

const config = require('../config');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

// Azure Key Vault client
const keyVaultUrl = `https://${config.azure.keyVault.name}.vault.azure.net`;
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUrl, credential);

// User roles
const ROLES = {
  ACCOUNT_EXECUTIVE: 'account_executive',
  SALES_CONSULTANT: 'sales_consultant',
  PRACTICE_LEADER: 'practice_leader',
  ADMIN: 'admin'
};

/**
 * Validate JWT token
 */
const validateToken = async (decoded, request, h) => {
  try {
    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp <= currentTime) {
      return { isValid: false };
    }
    
    // Check if user exists in our system
    // This would typically involve a database lookup
    // For now, we'll just check if the token has the required claims
    if (!decoded.sub || !decoded.roles) {
      return { isValid: false };
    }
    
    // Add user info to request for later use
    request.user = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles
    };
    
    return { isValid: true };
  } catch (err) {
    logger.error('Token validation error:', err);
    return { isValid: false };
  }
};

/**
 * Register authentication strategy
 */
const register = async (server) => {
  // Register JWT authentication strategy
  server.auth.strategy('jwt', 'jwt', {
    key: async () => {
      // In production, you would fetch the signing key from Azure Key Vault
      // For development, we'll use a placeholder
      if (config.server.env === 'production') {
        try {
          const secret = await secretClient.getSecret('jwt-signing-key');
          return secret.value;
        } catch (err) {
          logger.error('Failed to fetch JWT signing key from Key Vault:', err);
          throw err;
        }
      } else {
        return 'development-signing-key';
      }
    },
    validate: validateToken,
    verifyOptions: { algorithms: ['RS256'] }
  });
  
  // Set default authentication strategy
  server.auth.default('jwt');
  
  // Add authorization helper method
  server.decorate('toolkit', 'authorize', (request, requiredRoles) => {
    if (!request.user || !request.user.roles) {
      return false;
    }
    
    // Check if user has any of the required roles
    return requiredRoles.some(role => request.user.roles.includes(role));
  });
};

module.exports = {
  register,
  ROLES
};