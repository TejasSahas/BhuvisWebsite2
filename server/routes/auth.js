
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Firebase Admin - only initialize if available and configured
let admin = null;
try {
  admin = require('firebase-admin');
  if (!admin.apps.length) {
    console.warn('⚠️ Firebase Admin not configured — Google OAuth will be disabled.');
  }
} catch (e) {
  console.warn('⚠️ Firebase Admin not available — Google OAuth disabled.');
}


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign(
      { id: user._id, email, role: user.role, name: user.name || '' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
  res.json({ token, role: user.role });
});


// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone, city } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: passwordHash, role, phone, city });
  await user.save();
  res.json({ message: 'User registered successfully.' });
});

// Google OAuth route
router.post('/google', async (req, res) => {
  if (!admin || !admin.apps.length) {
    return res.status(503).json({ message: 'Google OAuth is not configured on this server.' });
  }
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'No Google token provided' });
  try {
    // Verify Google token
    const decoded = await admin.auth().verifyIdToken(token);
    const { email, name, uid } = decoded;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: name || '',
        email,
        googleId: uid,
      });
      await user.save();
    }
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || 'User',
        name: user.name || '',
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token: jwtToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid Google token', error: err.message });
  }
});

module.exports = router;
