'use strict';

const Joi = require('joi');

// Define validation schema for environment variables
const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  HOST: Joi.string().default('localhost'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),

  // Azure AD Authentication
  AZURE_AD_TENANT_ID: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('development-tenant-id')
  }),
  AZURE_AD_CLIENT_ID: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('development-client-id')
  }),
  AZURE_AD_CLIENT_SECRET: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('development-client-secret')
  }),

  // Azure SQL Database
  SQL_SERVER: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('localhost')
  }),
  SQL_DATABASE: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('pathfinder')
  }),
  SQL_USER: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('sa')
  }),
  SQL_PASSWORD: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('Password123!')
  }),
  SQL_ENCRYPT: Joi.boolean().default(true),

  // Azure Blob Storage
  STORAGE_ACCOUNT_NAME: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('devstorageaccount')
  }),
  STORAGE_ACCOUNT_KEY: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('devstoragekey')
  }),
  STORAGE_CONTAINER_NAME: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('pathfinder')
  }),

  // Azure Key Vault
  KEY_VAULT_NAME: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('pathfinder-keyvault')
  }),

  // Application Insights
  APPINSIGHTS_INSTRUMENTATIONKEY: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.string().default('00000000-0000-0000-0000-000000000000')
  })
}).unknown();

// Validate environment variables
const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  console.error('Environment variable validation error:');
  console.error(error.details.map(detail => `  - ${detail.message}`).join('\n'));
  console.error('\nPlease check your .env file or environment variables.');
  console.error('You can use the .env.example file as a template.');

  // In development mode, we'll continue with defaults
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Config validation error: ${error.message}`);
  } else {
    console.warn('Running in development mode with default values for missing environment variables.');
  }
}

// Export configuration
module.exports = {
  server: {
    port: envVars.PORT,
    host: envVars.HOST,
    env: envVars.NODE_ENV,
    cors: {
      origin: ['*'],
      credentials: true
    }
  },
  azure: {
    ad: {
      tenantId: envVars.AZURE_AD_TENANT_ID,
      clientId: envVars.AZURE_AD_CLIENT_ID,
      clientSecret: envVars.AZURE_AD_CLIENT_SECRET
    },
    sql: {
      server: envVars.SQL_SERVER,
      database: envVars.SQL_DATABASE,
      user: envVars.SQL_USER,
      password: envVars.SQL_PASSWORD,
      options: {
        encrypt: envVars.SQL_ENCRYPT
      }
    },
    storage: {
      accountName: envVars.STORAGE_ACCOUNT_NAME,
      accountKey: envVars.STORAGE_ACCOUNT_KEY,
      containerName: envVars.STORAGE_CONTAINER_NAME
    },
    keyVault: {
      name: envVars.KEY_VAULT_NAME
    },
    appInsights: {
      instrumentationKey: envVars.APPINSIGHTS_INSTRUMENTATIONKEY
    }
  }
};