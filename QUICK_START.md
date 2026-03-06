# Quick Start Guide - Indian Real Estate Analytics Platform

## 🚀 Get Started in 3 Steps

### Prerequisites
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)

### Step 1: Install Dependencies

**Windows:**
```bash
# Run the installation script
install.bat
```

**Linux/Mac:**
```bash
# Make script executable and run
chmod +x install.sh
./install.sh
```

**Manual Installation:**
```bash
# Install all dependencies
npm run install-all
```

### Step 2: Start the Application

```bash
# Start both frontend and backend servers
npm run dev
```

### Step 3: Access the Platform

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **API Health Check:** http://localhost:4000/api/health

## 📊 Platform Features

### 🏠 Homepage
- Market overview with key KPIs
- Interactive city heatmap
- Policy tracker updates
- Quick market insights

### 📈 Market Trends
- Residential, Commercial, Affordable Housing analytics
- Interactive charts and graphs
- Emerging micro-markets
- Policy watch section

### ⚖️ Comparative Analysis
- Side-by-side city comparisons
- Price index trends
- Rental yield analysis
- Infrastructure comparison

### 📰 News & Research
- Latest market updates
- Policy changes
- Developer news
- Search and filter functionality

### 🏢 Project Details
- Comprehensive project analytics
- ROI projections
- Rental yield history
- Comparative analysis

### ℹ️ About & Methodology
- Data sources explanation
- Team information
- Key metrics guide
- Important disclaimers

## 🎨 Design Features

- **Dark Mode Toggle:** Switch between light and dark themes
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Interactive Charts:** Hover effects and data tooltips
- **Professional UI:** Bloomberg-inspired financial dashboard design
- **Indian Branding:** Royal Blue, Saffron, and Teal color scheme

## 🔧 Development

### Available Scripts

```bash
# Start development servers
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build
```

### Project Structure

```
indian-real-estate-analytics/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── styles/        # CSS and styling
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   └── package.json      # Server dependencies
└── package.json          # Root package.json
```

## 📱 Sample Data

The platform includes realistic sample data for:
- 7 major Indian cities (Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata)
- 3 sample projects with detailed analytics
- 8 news articles across different categories
- Market trends and policy updates

## 🌐 API Endpoints

- `GET /api/health` - Health check
- `GET /api/market-overview` - Market overview data
- `GET /api/market-trends` - Market trends and analytics
- `GET /api/projects` - List of projects
- `GET /api/projects/:id` - Specific project details
- `GET /api/news` - News and articles
- `GET /api/compare/:city1/:city2` - City comparison data

## 🎯 Key Metrics Explained

- **ROI (Return on Investment):** Percentage return on investment over time
- **Rental Yield:** Annual rental income as percentage of property value
- **Price Trends:** Historical and projected price movements
- **Absorption Rate:** Rate at which properties are sold/rented
- **Occupancy Rate:** Percentage of occupied properties

## ⚠️ Important Notes

- This is a **demonstration platform** with sample data
- All data is for **educational purposes** only
- **Not a brokerage or listing portal**
- Always consult professionals for actual investment decisions
- Follow RERA guidelines and local regulations

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill processes on ports 3000 and 4000
   npx kill-port 3000 4000
   ```

2. **Node modules issues:**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **API connection issues:**
   - Ensure backend is running on port 4000
   - Check CORS settings in server/index.js
   - Verify proxy setting in client/package.json

## 📞 Support

For technical support or questions:
- Check the About page for methodology details
- Review the API documentation
- Ensure all dependencies are properly installed

---

**Built with ❤️ for the Indian Real Estate Market** 