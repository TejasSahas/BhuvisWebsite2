/**
 * Property Routes
 * Handles property data API endpoints
 */
const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService');

// Get coordinates for an area
router.post('/coordinates', (req, res) => {
  try {
    const { area } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    
    if (!normalizedArea) {
      return res.status(400).json({ error: "Please provide an area in the request body" });
    }
    
    const data = dataService.getData();
    const found = data.coordinates.find(
      row => row.Area && row.Area.trim().toLowerCase() === normalizedArea
    );
    
    if (!found) {
      return res.status(404).json({ message: "Area not found" });
    }
    
    // Normalize keys to always include Area, Latitude, Longitude, Pincode
    const entries = Object.entries(found || {});
    const latEntry = entries.find(([k]) => /lat/i.test(String(k)));
    const lngEntry = entries.find(([k]) => /(lon|lng|long)/i.test(String(k)));
    const pinEntry = entries.find(([k]) => /pin(code)?/i.test(String(k)));
    const lat = latEntry ? Number(latEntry[1]) : undefined;
    const lng = lngEntry ? Number(lngEntry[1]) : undefined;
    const pincode = pinEntry ? String(pinEntry[1]) : undefined;
    
    const normalized = {
      Area: found.Area,
      Latitude: Number.isFinite(lat) ? lat : undefined,
      Longitude: Number.isFinite(lng) ? lng : undefined,
      Pincode: pincode !== undefined ? pincode : undefined,
      ...found,
    };
    
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get coordinates', details: err.message });
  }
});

// Get rental yield for an area and property type
router.post('/rental-yield', (req, res) => {
  try {
    const { area, type } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';
    
    if (!normalizedArea || !normalizedType) {
      return res.status(400).json({ error: "Please provide both area and type in the request body" });
    }
    
    const data = dataService.getData();
    const found = data.rentalYield.find(
      row => row.Area && row.Area.trim().toLowerCase() === normalizedArea
    );
    
    if (!found) {
      return res.status(404).json({ message: "Area not found" });
    }
    
    let result = {};
    if (normalizedType === "commercial") {
      result = {
        Area: found.Area,
        CommercialRYL: found["Commercial RY"],
        CommercialRYH: found["Commercial RY_1"]
      };
    } else if (normalizedType === "residential") {
      result = {
        Area: found.Area,
        ResidentialRYL: found["Residential RY"],
        ResidentialRYH: found["Residential RY_1"]
      };
    } else {
      return res.status(400).json({ message: "Type must be commercial or residential" });
    }
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get rental yield', details: err.message });
  }
});

// Get average price per sqft for an area and property type
router.post('/avg-price', (req, res) => {
  try {
    const { area, type } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';
    
    if (!normalizedArea || !normalizedType) {
      return res.status(400).json({ error: "Please provide both area and type in the request body" });
    }
    
    const data = dataService.getData();
    const found = data.avgPriceGroups.find(
      row =>
        row.Area &&
        row.Area.trim().toLowerCase() === normalizedArea &&
        row.PropertyType &&
        row.PropertyType.trim().toLowerCase() === normalizedType
    );
    
    if (!found) {
      return res.status(404).json({ message: "Area and property type combination not found" });
    }
    
    res.json({
      Area: found.Area,
      PropertyType: found.PropertyType,
      AvgPricePerSqft: found.AvgPricePerSqft
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get average price', details: err.message });
  }
});

// Get property data (rental history) for an area and property type
router.get('/property-data', (req, res) => {
  const { area, type } = req.query;

  if (!area || !type) {
    return res.status(400).json({
      error: "Please provide both 'area' and 'type' query parameters",
    });
  }

  const typeQuery = type.trim().toLowerCase();
  const data = dataService.getData();
  
  let dataset;
  if (typeQuery === "commercial") dataset = data.commercialRentalHistory;
  else if (typeQuery === "residential") dataset = data.residentialRentalHistory;
  else {
    return res.status(400).json({ error: "Invalid type. Choose 'commercial' or 'residential'" });
  }

  // Case-sensitive area match
  const areaRow = dataset.find((row) => row.Area && row.Area.trim() === area.trim());

  if (!areaRow) {
    return res.status(404).json({
      message: `Area '${area}' not found in the selected dataset`,
    });
  }

  // Build rental history (exclude Area & Region)
  const rentalHistory = {};
  Object.keys(areaRow).forEach((key) => {
    if (key !== "Area" && key !== "Region") {
      const val = parseFloat(areaRow[key]);
      if (!isNaN(val)) rentalHistory[key] = val;
    }
  });

  res.json({
    area: areaRow.Area,
    PropertyType: typeQuery,
    quarters_available: Object.keys(rentalHistory).length,
    rental_history: rentalHistory,
  });
});

// Get average rent per sqft for an area and property type
router.get('/avg-rent', (req, res) => {
  const { area, propertyType } = req.query;

  if (!area || !propertyType) {
    return res
      .status(400)
      .json({ error: "Please provide both 'area' and 'propertyType' parameters" });
  }

  const areaQuery = area.trim().toLowerCase();
  const propertyQuery = propertyType.trim().toLowerCase();
  const data = dataService.getData();

  // Match with correct CSV field names (case-insensitive)
  const match = data.avgRentPerSqft.find((row) => {
    const areaVal = row.Area || row.area;
    const typeVal = row.PropertyType || row.PropertyType || row.propertyType;
    return (
      areaVal?.toLowerCase().includes(areaQuery) &&
      typeVal?.toLowerCase().includes(propertyQuery)
    );
  });

  if (!match) {
    return res.status(404).json({
      message: `No data found for '${area}' (${propertyType})`
    });
  }

  res.json({
    area: match.Area,
    propertyType: match.PropertyType,
    avgRentPerSqft: match.AvgRentPerSqft,
  });
});

// Get distance from Pune airport
router.get('/distance', (req, res) => {
  const areaQuery = req.query.area;

  if (!areaQuery) {
    return res
      .status(400)
      .json({ error: "Please provide 'area' query parameter" });
  }

  const areaKey = areaQuery.trim().toLowerCase();
  const data = dataService.getData();
  const distance = data.airportDistances[areaKey];

  if (distance === undefined) {
    return res
      .status(404)
      .json({ message: `Area '${areaQuery}' not found in Excel data` });
  }

  res.json({
    area: areaQuery,
    distance_from_pune_airport_km: distance
  });
});

module.exports = router;
