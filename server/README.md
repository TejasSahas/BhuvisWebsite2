# Bhuvis Analytics API Server

This is the backend server for the Bhuvis Analytics platform, providing real estate analytics and insights for the Indian market.

## Project Structure

```
server/
├── config/             # Configuration files
│   └── config.js       # Environment variables and app configuration
├── data/               # Data files (CSV, Excel)
├── middleware/         # Express middleware
│   └── errorHandler.js # Error handling middleware
├── routes/             # API routes
│   ├── dashboard.js    # Dashboard-related endpoints
│   ├── property.js     # Property data endpoints
│   ├── business.js     # Business category endpoints
│   └── ...             # Other route modules
├── services/           # Service modules
│   └── dataService.js  # Data loading and management
├── package.json        # Project dependencies
└── server.js           # Main entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the server directory:
   ```
   cd BhuvisWebsite/server
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Server

Development mode with auto-restart:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Dashboard

- `GET /api/status` - Check API status
- `GET /api/filters` - Get available area filters
- `POST /api/filter-results` - Apply area and property type filters
- `GET /api/health` - Health check endpoint

### Property

- `POST /api/coordinates` - Get coordinates for an area
- `POST /api/rental-yield` - Get rental yield for an area and property type
- `POST /api/avg-price` - Get average price per sqft for an area and property type
- `GET /api/property-data` - Get rental history for an area and property type
- `GET /api/avg-rent` - Get average rent per sqft for an area and property type
- `GET /api/distance` - Get distance from Pune airport for an area

### Business

- `GET /api/business-area` - Get top business categories for an area

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=4000
NODE_ENV=development
```

## Data Files

The server uses various CSV and Excel files stored in the `data/` directory:

- `pune_yellowpages_with_area.csv` - Business category data
- `Pune_Coordinates_pincodes.xlsx` - Area coordinates and pincode data
- `Pune_RentalYield.xlsx` - Rental yield data
- `avg_price_groups.csv` - Average price data
- `Pune_rental_commercial_history.csv` - Commercial rental history
- `Pune_rental_residential_history.csv` - Residential rental history
- `average_rent_per_sqft_pune.csv` - Average rent data
- `Pune_Airport_Distances.xlsx` - Airport distance data
