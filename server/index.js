const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const xlsx = require('xlsx');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Sample data for market overview and heatmap
const sampleData = {
  marketOverview: {
    heatmapData: [
      { city: "Mumbai", price: 45000, appreciation: 12.5, volume: 1250 },
      { city: "Delhi", price: 32000, appreciation: 8.3, volume: 980 },
      { city: "Bangalore", price: 28000, appreciation: 15.2, volume: 1100 },
      { city: "Pune", price: 22000, appreciation: 18.7, volume: 850 },
      { city: "Hyderabad", price: 19000, appreciation: 14.1, volume: 720 },
      { city: "Chennai", price: 18000, appreciation: 9.8, volume: 650 },
      { city: "Kolkata", price: 15000, appreciation: 6.5, volume: 580 }
    ]
  }
};
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

// Load Excel/CSV data for dashboard functionality
const excelPath2 = path.join(__dirname, "data", "Pune_Coordinates_pincodes.xlsx");
let data2 = [];
try {
  const workbook2 = xlsx.readFile(excelPath2);
  const sheetName2 = workbook2.SheetNames[0];
  const worksheet2 = workbook2.Sheets[sheetName2];
  data2 = xlsx.utils.sheet_to_json(worksheet2);
  console.log("Pune_Coordinates_pincodes.xlsx loaded successfully.");
} catch (err) {
  console.error("Error loading Pune_Coordinates_pincodes.xlsx:", err.message);
}

const excelPath3 = path.join(__dirname, "data", "Pune_RentalYield.xlsx");
let data3 = [];
try {
  const workbook3 = xlsx.readFile(excelPath3);
  const sheetName3 = workbook3.SheetNames[0];
  const worksheet3 = workbook3.Sheets[sheetName3];
  data3 = xlsx.utils.sheet_to_json(worksheet3);
  console.log("Pune_RentalYield.xlsx loaded successfully.");
} catch (err) {
  console.error("Error loading Pune_RentalYield.xlsx:", err.message);
}

const excelPath4 = path.join(__dirname, "data", "avg_price_groups.csv");
let data4 = [];
try {
  const workbook4 = xlsx.readFile(excelPath4);
  const sheetName4 = workbook4.SheetNames[0];
  const worksheet4 = workbook4.Sheets[sheetName4];
  data4 = xlsx.utils.sheet_to_json(worksheet4);
  console.log("avg_price_groups.csv loaded successfully.");
} catch (err) {
  console.error("Error loading avg_price_groups.csv:", err.message);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Bhuvis Analytics API is running',
    timestamp: new Date().toISOString()
  });
});

// Market overview endpoint
app.get('/api/market-overview', (req, res) => {
  const marketOverview = {
    ...sampleData.marketOverview,
    quickKPIs: {
      avgResidentialPrice: 68000,
      avgCommercialYield: "8.2%",
      topGainers: ["Pune", "Bangalore", "Hyderabad"],
      policyTracker: {
        rera: "Active",
        smartCities: "In Progress", 
        affordableHousing: "New Incentives"
      }
    },
    heroTagline: "Intelligence-Driven Real Estate Investment Platform"
  };
  res.json(marketOverview);
});

// Dashboard API Routes
// API-1: Check connection
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running!' });
});

// API-2: Extract coordinates and pincode using area/type from POST body
app.post('/api/coordinates', (req, res) => {
  try {
    const { area } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    if (!normalizedArea) {
      return res.status(400).json({ error: "Please provide an area in the request body" });
    }
    const found = data2.find(
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

// API-3: Rental yield using area/type from POST body
app.post('/api/rental-yield', (req, res) => {
  try {
    const { area, type } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';
    if (!normalizedArea || !normalizedType) {
      return res.status(400).json({ error: "Please provide both area and type in the request body" });
    }
    const found = data3.find(
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

// API-4: Average price per sqft using area/type from POST body
app.post('/api/avg-price', (req, res) => {
  try {
    const { area, type } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';
    if (!normalizedArea || !normalizedType) {
      return res.status(400).json({ error: "Please provide both area and type in the request body" });
    }
    const found = data4.find(
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

// API-5: POST filter-results: apply area/type filters in-memory against avg_price_groups.csv
app.post('/api/filter-results', (req, res) => {
  try {
    const { area, type } = req.body || {};
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : '';
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';

    let rows = Array.isArray(data4) ? [...data4] : [];

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

// API to get list of areas from avg_price_groups.csv
app.get('/api/filters', (req, res) => {
  try {
    const areas = Array.from(
      new Set(
        (data4 || [])
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