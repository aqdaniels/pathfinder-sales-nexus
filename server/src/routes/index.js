'use strict';

// Import route modules
const healthRoutes = require('./health');
const meetingRoutes = require('./meeting-intelligence');
const solutionRoutes = require('./solution-mapping');
const portfolioRoutes = require('./portfolio-management');

// Combine all routes
module.exports = [
  ...healthRoutes,
  ...meetingRoutes,
  ...solutionRoutes,
  ...portfolioRoutes
];