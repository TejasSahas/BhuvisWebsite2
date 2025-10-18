/**
 * Dashboard Routes
 * Handles dashboard-related API endpoints
 */
const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService');

// Get status of the API
router.get('/status', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Backend is running!'
  });
});

// Get filters (areas)
router.get('/filters', (req, res) => {
  try {
    const data = dataService.getData();
    const areas = Array.from(
      new Set(
        (data.avgPriceGroups || [])
          .map(row => row && row.Area)
          .filter(Boolean)
          .map(a => String(a).trim())
          .filter(a => a.length > 0)
      )
    ).sort((a, b) => a.localeCompare(b));

    res.status(200).json({ areas });
  } catch (err) {
    res.status(500).json({ error: 'Failed to build filters', details: err.message });
  }
});

// Apply filters
router.post('/filter-results', (req, res) => {
  try {
    const { area, type } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';

    const data = dataService.getData();
    let rows = Array.isArray(data.avgPriceGroups) ? [...data.avgPriceGroups] : [];

    if (normalizedArea) {
      rows = rows.filter(r =>
        r && r.Area && String(r.Area).trim().toLowerCase() === normalizedArea
      );
    }

    if (normalizedType) {
      const target = normalizedType === 'commercial' ? 'commercial' : normalizedType === 'residential' ? 'residential' : '';
      if (target) {
        rows = rows.filter(r =>
          r && r.PropertyType && String(r.PropertyType).trim().toLowerCase() === target
        );
      }
    }

    return res.status(200).json({ count: rows.length, results: rows });
  } catch (err) {
    return res.status(500).json({ error: 'Filter processing failed', details: err.message });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Bhuvis Analytics API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
