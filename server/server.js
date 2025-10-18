/**
 * Main Server Entry Point
 * Configures and starts the Express server
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Import configuration
const config = require('./config/config');

// Import routes
const dashboardRoutes = require('./routes/dashboard');
const propertyRoutes = require('./routes/property');
const businessRoutes = require('./routes/business');
const authRouter = require('./routes/auth');
const marketTrendsRouter = require('./routes/marketTrends');
const comparativeRouter = require('./routes/comparative');
const projectsRouter = require('./routes/projects');
const newsRouter = require('./routes/news');
const perplexityRouter = require('./routes/perplexity');

// Import error handling middleware
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Import data service
const dataService = require('./services/dataService');

// Initialize Express app
const app = express();
const PORT = config.server.port;

// Apply middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize data before setting up routes
const initializeServer = async () => {
  try {
    // Load all data
    await dataService.initializeData();
    
    // Set up API routes
    app.use('/api', dashboardRoutes);
    app.use('/api', propertyRoutes);
    app.use('/api', businessRoutes);
    app.use('/api', authRouter);
    app.use('/api/market-trends', marketTrendsRouter);
    app.use('/api/compare', comparativeRouter);
    app.use('/api/projects', projectsRouter);
    app.use('/api/news', newsRouter);
    app.use('/api/perplexity', perplexityRouter);
    
    // Apply error handling middleware
    app.use(notFoundHandler);
    app.use(errorHandler);
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Bhuvis Analytics API running on port ${PORT}`);
      console.log(`📊 API Documentation: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

// Start the server
initializeServer();
