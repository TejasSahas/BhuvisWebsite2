const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory user store for demo (replace with DB in production)
const users = [
  // Example: { email: 'test@example.com', passwordHash: '...', role: 'Investor' }
];

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const user = users.find(u => u.email === email && u.role === role);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Register route (for demo/testing)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (users.find(u => u.email === email && u.role === role)) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ email, passwordHash, role });
  res.json({ message: 'User registered successfully.' });
});

module.exports = router;
