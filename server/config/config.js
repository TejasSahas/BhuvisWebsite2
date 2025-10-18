/**
 * Configuration Module
 * Centralizes environment variable management
 */
require('dotenv').config();

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 4000,
    env: process.env.NODE_ENV || 'development',
  },
  
  // API configuration
  api: {
    prefix: '/api',
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  
  // Database configuration (for future use)
  db: {
    url: process.env.DATABASE_URL || '',
  },
  
  // Authentication configuration (for future use)
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'bhuvis-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  }
};
