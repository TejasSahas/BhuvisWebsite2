/**
 * Business Routes
 * Handles business category API endpoints
 */
const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService');

// Get top 4 business categories for an area
router.get('/business-area', (req, res) => {
  const businessAreaQuery = req.query.business_area;

  if (!businessAreaQuery) {
    return res
      .status(400)
      .json({ error: "Please provide a business_area query parameter" });
  }

  console.log("Searching for business area:", businessAreaQuery);

  const data = dataService.getData();
  
  // Filter rows matching the business area
  const filteredRows = data.yellowPages.filter(
    (row) =>
      row["Area"] &&
      row["Area"].trim().toLowerCase() ===
        businessAreaQuery.trim().toLowerCase()
  );

  if (filteredRows.length === 0) {
    return res
      .status(404)
      .json({ message: `Business area '${businessAreaQuery}' not found` });
  }

  // Count categories
  const categoriesMap = new Map();

  filteredRows.forEach((row) => {
    const category = row["Category"]?.trim();
    if (category) {
      categoriesMap.set(category, (categoriesMap.get(category) || 0) + 1);
    }
  });

  // Top 4 categories and percentages
  const categories = Array.from(categoriesMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: ((count / filteredRows.length) * 100).toFixed(2) + "%",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  // return categories + total rows for reference
  res.json({ categories, totalRows: filteredRows.length });
});

module.exports = router;
