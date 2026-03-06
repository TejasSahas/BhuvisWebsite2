/**
 * Data Service Module
 * Centralizes data loading from CSV and Excel files
 */
const path = require('path');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');

// Data storage
const data = {
  yellowPages: [],
  coordinates: [],
  rentalYield: [],
  avgPriceGroups: [],
  commercialRentalHistory: [],
  residentialRentalHistory: [],
  avgRentPerSqft: [],
  airportDistances: {}
};

// Helper function to clean CSV keys (remove BOM, trim spaces)
const cleanKeys = (row) => {
  const cleaned = {};
  for (const key in row) {
    cleaned[key.trim().replace(/^\uFEFF/, "")] = row[key];
  }
  return cleaned;
};

// Load Pune Yellow Pages data
const loadYellowPages = () => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, "..", "data", "pune_yellowpages_with_area.csv");
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => data.yellowPages.push(row))
      .on("end", () => {
        console.log("Yellow pages data loaded successfully.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error loading yellow pages data:", err.message);
        reject(err);
      });
  });
};

// Load Pune Coordinates data
const loadCoordinates = () => {
  try {
    const excelPath = path.join(__dirname, "..", "data", "Pune_Coordinates_pincodes.xlsx");
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    data.coordinates = xlsx.utils.sheet_to_json(worksheet);
    console.log("Pune coordinates data loaded successfully.");
    return Promise.resolve();
  } catch (err) {
    console.error("Error loading coordinates data:", err.message);
    return Promise.reject(err);
  }
};

// Load Rental Yield data
const loadRentalYield = () => {
  try {
    const excelPath = path.join(__dirname, "..", "data", "Pune_RentalYield.xlsx");
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    data.rentalYield = xlsx.utils.sheet_to_json(worksheet);
    console.log("Rental yield data loaded successfully.");
    return Promise.resolve();
  } catch (err) {
    console.error("Error loading rental yield data:", err.message);
    return Promise.reject(err);
  }
};

// Load Average Price Groups data
const loadAvgPriceGroups = () => {
  try {
    const excelPath = path.join(__dirname, "..", "data", "avg_price_groups.csv");
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    data.avgPriceGroups = xlsx.utils.sheet_to_json(worksheet);
    console.log("Average price groups data loaded successfully.");
    return Promise.resolve();
  } catch (err) {
    console.error("Error loading average price groups data:", err.message);
    return Promise.reject(err);
  }
};

// Load Commercial Rental History data
const loadCommercialRentalHistory = () => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, "..", "data", "Pune_rental_commercial_history.csv");
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => data.commercialRentalHistory.push(cleanKeys(row)))
      .on("end", () => {
        console.log("Commercial rental history data loaded successfully.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error loading commercial rental history data:", err.message);
        reject(err);
      });
  });
};

// Load Residential Rental History data
const loadResidentialRentalHistory = () => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, "..", "data", "Pune_rental_residential_history.csv");
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => data.residentialRentalHistory.push(cleanKeys(row)))
      .on("end", () => {
        console.log("Residential rental history data loaded successfully.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error loading residential rental history data:", err.message);
        reject(err);
      });
  });
};

// Load Average Rent Per Sqft data
const loadAvgRentPerSqft = () => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, "..", "data", "average_rent_per_sqft_pune.csv");
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => data.avgRentPerSqft.push(row))
      .on("end", () => {
        console.log("Average rent per sqft data loaded successfully.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error loading average rent per sqft data:", err.message);
        reject(err);
      });
  });
};

// Load Airport Distances data
const loadAirportDistances = () => {
  try {
    const excelPath = path.join(__dirname, "..", "data", "Pune_Airport_Distances.xlsx");
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    rows.forEach((row) => {
      if (row.Area && row["Driving Distance from Pune Airport (km)"]) {
        data.airportDistances[row.Area.trim().toLowerCase()] = parseFloat(
          row["Driving Distance from Pune Airport (km)"]
        );
      }
    });
    
    console.log("Airport distances data loaded successfully.");
    return Promise.resolve();
  } catch (err) {
    console.error("Error loading airport distances data:", err.message);
    return Promise.reject(err);
  }
};

// Initialize all data
const initializeData = async () => {
  try {
    await Promise.all([
      loadYellowPages(),
      loadCoordinates(),
      loadRentalYield(),
      loadAvgPriceGroups(),
      loadCommercialRentalHistory(),
      loadResidentialRentalHistory(),
      loadAvgRentPerSqft(),
      loadAirportDistances()
    ]);
    console.log("All data loaded successfully.");
    return true;
  } catch (err) {
    console.error("Error initializing data:", err);
    return false;
  }
};

module.exports = {
  initializeData,
  getData: () => data
};
