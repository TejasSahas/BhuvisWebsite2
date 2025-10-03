const express = require('express');
const router = express.Router();

// Sample news data
const news = [
  {
    id: 1,
    title: "Office Demand in Bengaluru IT Corridor Up 18%",
    category: "Market Insights",
    date: "2024-01-15",
    summary: "Bengaluru's IT corridor continues to see strong office space demand with 18% year-on-year growth.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"
  },
  {
    id: 2,
    title: "Navi Mumbai Affordable Housing Sees Record Bookings",
    category: "Affordable Housing",
    date: "2024-01-12",
    summary: "Affordable housing projects in Navi Mumbai witness unprecedented demand with 95% booking rate.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
  },
  {
    id: 3,
    title: "Delhi-NCR RERA Tightens Compliance for Builders",
    category: "Policy",
    date: "2024-01-10",
    summary: "RERA authorities in Delhi-NCR announce stricter compliance measures for real estate developers.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
  }
];

router.get('/', (req, res) => {
  res.json(news);
});

module.exports = router;
