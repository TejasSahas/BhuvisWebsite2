import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from 'url'
import csv from "csv-parser";
import fs from "fs";
//const csv = require("csv-parser");
//const fs = require("fs");
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Start server
app.listen(port, () => console.log(`API listening on :${port}`))

// --- API ROUTES ---
const csvPath = path.join(__dirname,"data", "pune_yellowpages_with_area.csv");
let data = [];
try {
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (row) => data.push(row))
    .on("end", () => console.log("yellowpages CSV file loaded successfully."))
    .on("error", (err) =>
      console.error("Error loading yellowpages CSV file:", err.message)
    );
} catch (err) {
  console.error("Error yellowpages reading CSV file:", err.message);
}

//airport data
const excelPath = path.join(__dirname, "Pune_Airport_Distances.xlsx");
let areaDistanceMap = {};

try {
  const workbook = xlsx.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  rows.forEach((row) => {
    if (row.Area && row["Driving Distance from Pune Airport (km)"]) {
      areaDistanceMap[row.Area.trim().toLowerCase()] = parseFloat(
        row["Driving Distance from Pune Airport (km)"]
      );
    }
  });

  console.log(" Excel loaded successfully.");
} catch (err) {
  console.error(" Error loading Excel:", err.message);
}

//API-1: Check connection
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running!' });
});

// // ESM-compatible __dirname
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// Load Excel/CSV data
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
//API data for rental commercial and residential history
const commCsvPath = path.join(__dirname,"data", "Pune_rental_commercial_history.csv");
const resiCsvPath = path.join(__dirname, "data","Pune_rental_residential_history.csv");
// Data storage
let commData = [];
let resiData = [];
// clean up CSV keys (remove BOM, trim spaces)
const cleanKeys = (row) => {
  const cleaned = {};
  for (const key in row) {
    cleaned[key.trim().replace(/^\uFEFF/, "")] = row[key];
  }
  return cleaned;
};
// Load commercial CSV
fs.createReadStream(commCsvPath)
  .pipe(csv())
  .on("data", (row) => commData.push(cleanKeys(row)))
  .on("end", () => {})
  .on("error", (err) => console.error("Commercial CSV load error:", err.message));
// Load residential CSV
fs.createReadStream(resiCsvPath)
  .pipe(csv())
  .on("data", (row) => resiData.push(cleanKeys(row)))
  .on("end", () => {})
  .on("error", (err) => console.error("Residential CSV load error:", err.message));

//data for avg rent per sqft
const rentCsvPath = path.join(__dirname,"data", "average_rent_per_sqft_pune.csv");
console.log("Looking for CSV at:", rentCsvPath);
let rentData = [];
// Load CSV data
fs.createReadStream(rentCsvPath)
  .pipe(csv())
  .on("data", (row) => rentData.push(row))
  .on("end", () => {
    console.log(`CSV loaded successfully. Total rows: ${rentData.length}`);
  })
  .on("error", (err) => console.error("CSV load error:", err.message));


// Root endpoint
app.get("/", (req, res) => {
  res.send("Excel API is running. Use /api/filter-results (POST) with {area, type} in body.");
});

// --- API-5: POST filter-results: apply area/type filters in-memory against avg_price_groups.csv (data4)
app.post('/api/filter-results', (req, res) => {
  try {
    const { area, type } = req.body || {}
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : ''
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : ''

    let rows = Array.isArray(data4) ? [...data4] : []

    if (normalizedArea) {
      rows = rows.filter(r =>
        r && r.Area && String(r.Area).trim().toLowerCase() === normalizedArea
      )
    }

    if (normalizedType) {
      const target = normalizedType === 'commercial' ? 'commercial' : normalizedType === 'residential' ? 'residential' : ''
      if (target) {
        rows = rows.filter(r =>
          r && r.PropertyType && String(r.PropertyType).trim().toLowerCase() === target
        )
      }
    }

    return res.status(200).json({ count: rows.length, results: rows })
  } catch (err) {
    return res.status(500).json({ error: 'Filter processing failed', details: err.message })
  }
})

// --- API-2: Extract coordinates and pincode using area/type from POST body (like API-5)
app.post('/api/coordinates', (req, res) => {
  try {
    const { area } = req.body || {}
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : ''
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
    const entries = Object.entries(found || {})
    const latEntry = entries.find(([k]) => /lat/i.test(String(k)))
    const lngEntry = entries.find(([k]) => /(lon|lng|long)/i.test(String(k)))
    const pinEntry = entries.find(([k]) => /pin(code)?/i.test(String(k)))
    const lat = latEntry ? Number(latEntry[1]) : undefined
    const lng = lngEntry ? Number(lngEntry[1]) : undefined
    const pincode = pinEntry ? String(pinEntry[1]) : undefined
    const normalized = {
      Area: found.Area,
      Latitude: Number.isFinite(lat) ? lat : undefined,
      Longitude: Number.isFinite(lng) ? lng : undefined,
      Pincode: pincode !== undefined ? pincode : undefined,
      ...found,
    }
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get coordinates', details: err.message });
  }
});

// --- API-3: Rental yield using area/type from POST body (like API-5)
app.post('/api/rental-yield', (req, res) => {
  try {
    const { area, type } = req.body || {}
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : ''
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : ''
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

// --- API-4: Average price per sqft using area/type from POST body (like API-5)
app.post('/api/avg-price', (req, res) => {
  try {
    const { area, type } = req.body || {}
    const normalizedArea = typeof area === 'string' ? area.trim().toLowerCase() : ''
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : ''
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

// API to get top 4 categories for a business area
app.get("/api/business-area", (req, res) => {
  const businessAreaQuery = req.query.business_area;

  if (!businessAreaQuery) {
    return res
      .status(400)
      .json({ error: "Please provide a business_area query parameter" });
  }

  console.log("Searching for business area:", businessAreaQuery);

  // Filter rows matching the business area
  const filteredRows = data.filter(
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

// API to get rental history for commercial and residential 
app.get("/api/property-data", (req, res) => {
  const { area, type } = req.query;

  if (!area || !type) {
    return res.status(400).json({
      error: "Please provide both 'area' and 'type' query parameters",
    });
  }

  const typeQuery = type.trim().toLowerCase();

  let dataset;
  if (typeQuery === "commercial") dataset = commData;
  else if (typeQuery === "residential") dataset = resiData;
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

// API to get average rent per sqft
app.get("/api/avg-rent", (req, res) => {
  const { area, propertyType } = req.query;

  if (!area || !propertyType) {
    return res
      .status(400)
      .json({ error: "Please provide both 'area' and 'propertyType' parameters" });
  }

  const areaQuery = area.trim().toLowerCase();
  const propertyQuery = propertyType.trim().toLowerCase();

  // Match with correct CSV field names (case-insensitive)
  const match = rentData.find((row) => {
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

// API to get distance from Pune airport
app.get("/api/distance", (req, res) => {
  const areaQuery = req.query.area;

  if (!areaQuery) {
    return res
      .status(400)
      .json({ error: "Please provide 'area' query parameter" });
  }

  const areaKey = areaQuery.trim().toLowerCase();
  const distance = areaDistanceMap[areaKey];

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