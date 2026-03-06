const express = require('express');
const router = express.Router();

// Sample comparative data for two cities
const cityData = {
  Mumbai: {
    avgPrice: 68000,
    appreciation: 15.2,
    rentalYield: 3.2,
    priceTrends: "Steady growth, strong demand in suburbs and IT corridors."
  },
  Delhi: {
    avgPrice: 54000,
    appreciation: 12.8,
    rentalYield: 4.1,
    priceTrends: "Growth in Dwarka Expressway and affordable housing segments."
  },
  Bangalore: {
    avgPrice: 52000,
    appreciation: 18.5,
    rentalYield: 5.8,
    priceTrends: "Tech hubs and Whitefield driving price increases."
  },
  Pune: {
    avgPrice: 42000,
    appreciation: 22.1,
    rentalYield: 6.2,
    priceTrends: "Hinjewadi and Kharadi are top growth micro-markets."
  },
  Hyderabad: {
    avgPrice: 39000,
    appreciation: 19.3,
    rentalYield: 5.5,
    priceTrends: "Gachibowli and Financial District are booming."
  }
};

router.get('/:city1/:city2', (req, res) => {
  const { city1, city2 } = req.params;
  const data = {
    city1: cityData[city1] || {},
    city2: cityData[city2] || {},
    priceTrends: `${city1} and ${city2} have shown positive price trends in the last 5 years.`
  };
  res.json(data);
});

module.exports = router;
