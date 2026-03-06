const express = require('express');
const router = express.Router();

// Sample projects data
const projects = [
  {
    id: 1,
    name: "Lodha World Towers",
    developer: "Lodha Group",
    location: "Mumbai",
    type: "Residential",
    currentPrice: 45000,
    launchPrice: 28000,
    roi: 60.7,
    rentalYield: 3.8,
    absorptionRate: 95,
    reraNumber: "MahaRERA/A51234/2017",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
  },
  {
    id: 2,
    name: "Prestige Tech Park",
    developer: "Prestige Group",
    location: "Bangalore",
    type: "Commercial",
    currentPrice: 18000,
    launchPrice: 12000,
    roi: 50.0,
    rentalYield: 8.5,
    absorptionRate: 98,
    reraNumber: "KarRERA/A78901/2018",
    image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?w=800"
  },
  {
    id: 3,
    name: "DLF Cyber City",
    developer: "DLF Limited",
    location: "Gurgaon",
    type: "Mixed-Use",
    currentPrice: 22000,
    launchPrice: 15000,
    roi: 46.7,
    rentalYield: 7.2,
    absorptionRate: 92,
    reraNumber: "HryRERA/A34567/2019",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800"
  }
];

router.get('/', (req, res) => {
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

module.exports = router;
