// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const authRouter = require('./routes/auth');
const marketTrendsRouter = require('./routes/marketTrends');
const comparativeRouter = require('./routes/comparative');
const projectsRouter = require('./routes/projects');
const newsRouter = require('./routes/news');
const perplexityRouter = require('./routes/perplexity');

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', authRouter);
app.use('/api/market-trends', marketTrendsRouter);
app.use('/api/compare', comparativeRouter);
app.use('/api/projects', projectsRouter);

app.use('/api/news', newsRouter);
app.use('/api/perplexity', perplexityRouter);


// Comparative Analysis
app.get('/api/compare/:city1/:city2', (req, res) => {
  const { city1, city2 } = req.params;
  const comparison = {
    city1: {
      name: city1,
      avgPrice: sampleData.marketOverview.heatmapData.find(c => c.city.toLowerCase() === city1.toLowerCase())?.price || 0,
      appreciation: sampleData.marketOverview.heatmapData.find(c => c.city.toLowerCase() === city1.toLowerCase())?.appreciation || 0
    },
    city2: {
      name: city2,
      avgPrice: sampleData.marketOverview.heatmapData.find(c => c.city.toLowerCase() === city2.toLowerCase())?.price || 0,
      appreciation: sampleData.marketOverview.heatmapData.find(c => c.city.toLowerCase() === city2.toLowerCase())?.appreciation || 0
    }
  };
  res.json(comparison);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Bhuvis Analytics API running on port ${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api/health`);
}); 