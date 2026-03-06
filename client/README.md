# BhuvisX Client

This is the frontend for the BhuvisX real estate analytics platform.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the client directory:
   ```
   cd BhuvisWebsite/client
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Development Server

Start the development server:
```
npm start
```

The application will be available at http://localhost:3000

## Dashboard Features

The BhuvisX Dashboard provides comprehensive real estate analytics for the Pune region, including:

- Interactive area and property type selection
- Real-time property price data
- Rental yield analysis
- Location intelligence with map visualization
- Property listing data with sorting capabilities

### How to Test the Dashboard Locally

1. Start both the frontend and backend servers:
   ```
   # Start the backend server (from the server directory)
   cd ../server
   npm start

   # In a separate terminal, start the frontend server
   cd ../client
   npm start
   ```

2. Navigate to http://localhost:3000/dashboard in your browser

3. The dashboard requires backend API access. Make sure the server is running on port 4000 (or the port specified in your .env file).

4. Test different area and property type combinations to see the data change dynamically.

5. The dashboard includes:
   - Area selector dropdown
   - Property type selector (Residential/Commercial)
   - Interactive map showing the selected area
   - Average price per square foot widget
   - Rental yield range widget
   - Property listings table with sorting functionality
   - Diagnostics panel showing raw API responses

### Accessing the Early Access Page

You can also test the Early Access registration page at http://localhost:3000/early-access

## Routes

- `/` - Home page
- `/dashboard` - Main dashboard with real estate analytics
- `/early-access` - Registration page for early access to premium features
- `/bhuvisaipage` - AI assistant for real estate insights
- `/market-trends` - Market trends analysis
- `/comparative-analysis` - Comparative analysis of properties
- `/news` - News and research
- `/about` - About BhuvisX
- `/login` - User login
- `/register` - User registration

## Technologies Used

- React
- React Router
- Axios for API requests
- Leaflet for maps
- Tailwind CSS for styling
- Lucide React for icons
