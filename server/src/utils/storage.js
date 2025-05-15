'use strict';

const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('./logger');

// Local storage for development mode
const localStoragePath = path.join(__dirname, '../../local-storage');
const isDevelopment = config.server.env === 'development';
const useMockStorage = isDevelopment && (process.env.USE_MOCK_STORAGE === 'true');

let sharedKeyCredential;
let blobServiceClient;
let containerClient;

// Ensure local storage directory exists if in development mode
if (useMockStorage) {
  logger.info('Using local file storage for development');
  if (!fs.existsSync(localStoragePath)) {
    fs.mkdirSync(localStoragePath, { recursive: true });
    logger.info(`Created local storage directory at ${localStoragePath}`);
  }
} else {
  try {
    // Create the BlobServiceClient
    sharedKeyCredential = new StorageSharedKeyCredential(
      config.azure.storage.accountName,
      config.azure.storage.accountKey
    );

    blobServiceClient = new BlobServiceClient(
      `https://${config.azure.storage.accountName}.blob.core.windows.net`,
      sharedKeyCredential
    );

    // Get container client
    containerClient = blobServiceClient.getContainerClient(config.azure.storage.containerName);
    logger.info('Azure Blob Storage client initialized');
  } catch (err) {
    if (isDevelopment) {
      logger.warn('Failed to initialize Azure Blob Storage, falling back to local storage:', err.message);
      useMockStorage = true;
    } else {
      logger.error('Failed to initialize Azure Blob Storage:', err);
      throw err;
    }
  }
}

/**
 * Upload a file to storage (Azure Blob Storage or local file system)
 */
const uploadFile = async (fileName, fileBuffer, metadata = {}) => {
  try {
    if (useMockStorage) {
      // Save to local file system in development mode
      const filePath = path.join(localStoragePath, fileName);

      // Save metadata to a separate JSON file
      const metadataPath = `${filePath}.metadata.json`;

      // Write the file and metadata
      await fs.promises.writeFile(filePath, fileBuffer);
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

      logger.info(`File ${fileName} saved to local storage at ${filePath}`);

      // Return mock response
      return {
        fileName,
        url: `file://${filePath}`,
        etag: new Date().toISOString()
      };
    } else {
      // Create blob client
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      // Upload file
      const uploadOptions = {
        metadata,
        blobHTTPHeaders: {
          blobContentType: metadata.contentType || 'application/octet-stream'
        }
      };

      const uploadResponse = await blockBlobClient.upload(fileBuffer, fileBuffer.length, uploadOptions);
      logger.info(`File ${fileName} uploaded successfully to Azure Blob Storage`);

      return {
        fileName,
        url: blockBlobClient.url,
        etag: uploadResponse.etag
      };
    }
  } catch (err) {
    logger.error(`Error uploading file ${fileName}:`, err);
    throw err;
  }
};

/**
 * Download a file from storage (Azure Blob Storage or local file system)
 */
const downloadFile = async (fileName) => {
  try {
    if (useMockStorage) {
      // Read from local file system in development mode
      const filePath = path.join(localStoragePath, fileName);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File ${fileName} not found in local storage`);
      }

      // Read file
      const fileBuffer = await fs.promises.readFile(filePath);
      logger.info(`File ${fileName} read from local storage at ${filePath}`);

      return fileBuffer;
    } else {
      // Create blob client
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      // Check if blob exists
      const exists = await blockBlobClient.exists();
      if (!exists) {
        throw new Error(`File ${fileName} not found in Azure Blob Storage`);
      }

      // Download file
      const downloadResponse = await blockBlobClient.download(0);

      // Convert stream to buffer
      const chunks = [];
      for await (const chunk of downloadResponse.readableStreamBody) {
        chunks.push(chunk);
      }

      logger.info(`File ${fileName} downloaded successfully from Azure Blob Storage`);
      return Buffer.concat(chunks);
    }
  } catch (err) {
    logger.error(`Error downloading file ${fileName}:`, err);
    throw err;
  }
};

/**
 * Generate a SAS token for direct client uploads
 */
const generateSasToken = async (fileName, permissions, expiryMinutes = 60) => {
  try {
    if (useMockStorage) {
      // In development mode with local storage, return a mock URL
      const filePath = path.join(localStoragePath, fileName);
      const mockSasUrl = `file://${filePath}?mockSas=true&expiryMinutes=${expiryMinutes}`;

      logger.info(`Generated mock SAS URL for ${fileName} in local storage`);
      return mockSasUrl;
    } else {
      // Create blob client
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      // Generate SAS token
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);

      const sasToken = await blockBlobClient.generateSasUrl({
        permissions,
        expiresOn: expiryTime
      });

      logger.info(`Generated SAS token for ${fileName} in Azure Blob Storage`);
      return sasToken;
    }
  } catch (err) {
    logger.error(`Error generating SAS token for ${fileName}:`, err);
    throw err;
  }
};

module.exports = {
  uploadFile,
  downloadFile,
  generateSasToken
};