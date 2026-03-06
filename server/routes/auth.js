
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const admin = require('firebase-admin');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Initialize Firebase Admin with service account if not already
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(require('/Users/Kanha/Downloads/bhuvisx-firebase-adminsdk-fbsvc-24b34dec1c.json')),
    });
  } catch (e) {
    // Ignore if already initialized
  }
}


// Login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const user = await User.findOne({ email, role });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign({ id: user._id, email, role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});


// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const existing = await User.findOne({ email, role });
  if (existing) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: passwordHash, role });
  await user.save();
  res.json({ message: 'User registered successfully.' });
});

// Google OAuth route
router.post('/google', async (req, res) => {
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
    const jwtToken = jwt.sign({ id: user._id, email: user.email, role: user.role || 'User' }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token: jwtToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid Google token', error: err.message });
  }
});

module.exports = router;
