# DXC Pathfinder Server

Backend server for the DXC Pathfinder platform - an AI-powered sales enablement system designed to enhance DXC's sales process.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
npm run setup-env
```

This will create a `.env` file from the `.env.example` template if it doesn't already exist.

3. Edit the `.env` file with your specific configuration values.

### Environment Variables

The server uses environment variables for configuration. These can be set in a `.env` file in the root directory or as system environment variables.

#### Required Environment Variables (Production)

In production mode, the following environment variables are required:

- `AZURE_AD_TENANT_ID`: Azure AD tenant ID
- `AZURE_AD_CLIENT_ID`: Azure AD client ID
- `AZURE_AD_CLIENT_SECRET`: Azure AD client secret
- `SQL_SERVER`: Azure SQL server hostname
- `SQL_DATABASE`: Azure SQL database name
- `SQL_USER`: Azure SQL username
- `SQL_PASSWORD`: Azure SQL password
- `STORAGE_ACCOUNT_NAME`: Azure Storage account name
- `STORAGE_ACCOUNT_KEY`: Azure Storage account key
- `STORAGE_CONTAINER_NAME`: Azure Storage container name
- `KEY_VAULT_NAME`: Azure Key Vault name
- `APPINSIGHTS_INSTRUMENTATIONKEY`: Application Insights instrumentation key

#### Optional Environment Variables

- `PORT`: Server port (default: 3000)
- `HOST`: Server host (default: localhost)
- `NODE_ENV`: Environment mode (development, production, test) (default: development)
- `SQL_ENCRYPT`: Whether to encrypt SQL connections (default: true)

#### Development Mode Settings

- `USE_MOCK_DB`: Set to `true` to use a mock database implementation (default: false)
- `USE_MOCK_STORAGE`: Set to `true` to use local file storage instead of Azure Blob Storage (default: false)

In development mode, default values are provided for all required environment variables. Additionally, you can use mock implementations for the database and storage to develop without actual Azure services.

When `USE_MOCK_STORAGE` is set to `true`, files will be stored in a `local-storage` directory in the server root. This directory is automatically created if it doesn't exist. Each file's metadata is stored in a corresponding `.metadata.json` file.

### Running the Server

#### Development Mode

```bash
npm run dev
```

This will start the server with nodemon, which will automatically restart the server when changes are detected.

#### Production Mode

```bash
npm start
```

## API Documentation

The server includes comprehensive API documentation using Swagger. When the server is running, you can access the documentation through the following endpoints:

- **Swagger UI**: `http://localhost:3000/documentation` or `http://localhost:3000/swagger`
  - Interactive documentation interface for exploring and testing API endpoints
  - Includes request/response schemas, authentication requirements, and example values

- **Swagger JSON**: `http://localhost:3000/swagger.json`
  - Raw Swagger specification in JSON format
  - Useful for generating client libraries or importing into API tools

### Key API Endpoints

The server provides the following key API endpoints:

#### Health Check

- `GET /health` - Check the health status of the server and its dependencies

#### Meeting Intelligence

- `GET /api/meetings` - Get a list of all meetings
- `GET /api/meetings/{id}` - Get details of a specific meeting
- `POST /api/meetings/upload` - Upload a meeting recording for processing
- `GET /api/meetings/{id}/transcript` - Get the transcript for a meeting
- `GET /api/meetings/{id}/insights` - Get AI-generated insights for a meeting

#### Solution Mapping

- `GET /api/solutions` - Get a list of all DXC solutions
- `GET /api/solutions/{id}` - Get details of a specific solution
- `GET /api/clients/{clientId}/challenges` - Get challenges identified for a client
- `POST /api/clients/{clientId}/solution-matches` - Match solutions to client challenges

#### Portfolio Management

- `GET /api/portfolio/analytics` - Get portfolio analytics data
- `GET /api/portfolio/challenge-trends` - Get trend data for challenges over time
- `GET /api/portfolio/solution-performance` - Get performance metrics for solutions

All API endpoints are documented in detail in the Swagger UI, including request parameters, response schemas, and authentication requirements.

## Features

- Meeting Intelligence: Upload and analyze meeting recordings
- Solution Mapping: Match client challenges to DXC solutions
- Portfolio Management: Analyze trends and performance across the portfolio

## Authentication

The server uses JWT-based authentication with Azure AD. In development mode, a simplified authentication mechanism is used.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
