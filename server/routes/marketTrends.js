const express = require('express');
const router = express.Router();

// Sample comprehensive market trends data
const marketTrends = {
  residential: {
    avgPrice: 68000,
    priceIndex: [
      { year: 2019, mumbai: 100, delhi: 100, bangalore: 100, pune: 100 },
      { year: 2020, mumbai: 105, delhi: 102, bangalore: 108, pune: 112 },
      { year: 2021, mumbai: 112, delhi: 108, bangalore: 118, pune: 125 },
      { year: 2022, mumbai: 125, delhi: 115, bangalore: 135, pune: 142 },
      { year: 2023, mumbai: 138, delhi: 122, bangalore: 152, pune: 165 }
    ],
    rentalYields: [
      { city: "Mumbai", yield: 3.2, occupancy: 92 },
      { city: "Delhi", yield: 4.1, occupancy: 88 },
      { city: "Bangalore", yield: 5.8, occupancy: 95 },
      { city: "Pune", yield: 6.2, occupancy: 89 },
      { city: "Hyderabad", yield: 5.5, occupancy: 91 }
    ]
  },
  commercial: {
    rentalYields: [
      { city: "Mumbai", cbd: 8.5, suburban: 6.2 },
      { city: "Delhi", cbd: 7.8, suburban: 5.8 },
      { city: "Bangalore", cbd: 9.2, suburban: 7.1 },
      { city: "Pune", cbd: 8.8, suburban: 6.8 },
      { city: "Hyderabad", cbd: 8.1, suburban: 6.5 }
    ]
  },
  affordable: {
    avgPrice: 32000,
    growthRate: 15.3,
    totalProjects: 1247
  },
  coliving: {
    marketSize: [
      { year: 2019, size: 100 },
      { year: 2020, size: 120 },
      { year: 2021, size: 180 },
      { year: 2022, size: 250 },
      { year: 2023, size: 320 }
    ],
    avgRent: [
      { city: "Mumbai", rent: 25000 },
      { city: "Delhi", rent: 18000 },
      { city: "Bangalore", rent: 15000 },
      { city: "Pune", rent: 12000 },
      { city: "Hyderabad", rent: 11000 }
    ]
  },
  emergingMarkets: [
    { name: "Hinjewadi", city: "Pune", growth: 28.5, type: "IT Corridor" },
    { name: "Whitefield", city: "Bangalore", growth: 25.2, type: "Tech Hub" },
    { name: "Gachibowli", city: "Hyderabad", growth: 22.8, type: "Financial District" },
    { name: "Dwarka Expressway", city: "Delhi-NCR", growth: 31.2, type: "Infrastructure" },
    { name: "Guindy", city: "Chennai", growth: 18.7, type: "Industrial" }
  ],
  policyWatch: [
    { title: "RERA Updates", description: "New compliance requirements for developers announced. Enhanced transparency measures implemented." },
    { title: "Smart Cities Mission", description: "15 new cities added to Smart Cities Mission. Infrastructure development projects accelerated." },
    { title: "Infrastructure Projects", description: "Metro rail expansion in 8 cities. Expressway projects worth ₹50,000 crore approved." }
  ]
};

router.get('/', (req, res) => {
  res.json(marketTrends);
});

module.exports = router;
