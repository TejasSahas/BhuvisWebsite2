# Data Files Required for Dashboard Functionality

This directory should contain the following Excel/CSV files for the dashboard APIs to work:

## Required Files:

1. **Pune_Coordinates_pincodes.xlsx** - Contains area coordinates and pincode data
   - Columns: Area, Latitude, Longitude, Pincode
   - Used by: `/api/coordinates` endpoint

2. **Pune_RentalYield.xlsx** - Contains rental yield data by area and property type
   - Columns: Area, Commercial RY, Commercial RY_1, Residential RY, Residential RY_1
   - Used by: `/api/rental-yield` endpoint

3. **avg_price_groups.csv** - Contains average price data by area and property type
   - Columns: Area, PropertyType, AvgPricePerSqft
   - Used by: `/api/avg-price`, `/api/filter-results`, `/api/filters` endpoints

## Sample Data Structure:

### Pune_Coordinates_pincodes.xlsx
```
Area          | Latitude | Longitude | Pincode
Hinjewadi     | 18.5912  | 73.7389   | 411057
Koregaon Park | 18.5362  | 73.8907   | 411001
Baner         | 18.5596  | 73.7804   | 411045
```

### Pune_RentalYield.xlsx
```
Area          | Commercial RY | Commercial RY_1 | Residential RY | Residential RY_1
Hinjewadi     | 8.5          | 9.2             | 4.2            | 4.8
Koregaon Park | 7.8          | 8.5             | 3.8            | 4.2
Baner         | 8.2          | 9.0             | 4.0            | 4.5
```

### avg_price_groups.csv
```
Area          | PropertyType | AvgPricePerSqft
Hinjewadi     | commercial   | 4500
Hinjewadi     | residential  | 6800
Koregaon Park | commercial   | 5200
Koregaon Park | residential  | 8500
Baner         | commercial   | 4800
Baner         | residential  | 7200
```

## Note:
- The server will gracefully handle missing files and log appropriate error messages
- All APIs will work with sample data even if these files are not present
- File loading happens at server startup
