
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
  try {
    const { email, password, role } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    // Find user by email (role is optional for login, but will be checked if provided)
    const query = role ? { email, role } : { email };
    const user = await User.findOne(query);
    
    if (!user) {
      // Check if user exists with different role
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(401).json({ 
          message: 'Invalid credentials. Please check your email, password, and role.' 
        });
      }
      return res.status(401).json({ 
        message: 'No account found with this email. Please register first.' 
      });
    }
    
    // Check if user has a password (for Google OAuth users)
    if (!user.password) {
      return res.status(401).json({ 
        message: 'This account was created with Google. Please use Google sign-in.' 
      });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    
    // Generate token
    const userRole = user.role || role || 'Investor';
    const token = jwt.sign({ id: user._id, email: user.email, role: userRole }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { email: user.email, name: user.name, role: userRole } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    
    // Check if user already exists with same email and role
    const userRole = role || 'Investor';
    const existing = await User.findOne({ email, role: userRole });
    if (existing) {
      return res.status(409).json({ 
        message: `An account with this email and role already exists. Please login instead.` 
      });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({ 
      name: name || '', 
      email, 
      password: passwordHash, 
      role: userRole 
    });
    
    await user.save();
    res.json({ message: 'User registered successfully. You can now login.' });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'An account with this email and role already exists.' });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
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
