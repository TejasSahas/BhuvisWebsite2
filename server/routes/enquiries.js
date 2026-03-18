const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// POST /api/enquiries — submit enquiry (no auth required)
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const { name, phone, email, servicesProducts, company, message } = body;
    if (!name || !phone || !email || !servicesProducts) {
      return res.status(400).json({
        message: 'Name, phone, email and Services & Products are required.',
      });
    }
    // Require MongoDB to be connected (readyState 1 = connected)
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database unavailable. Enquiries cannot be saved right now. Set MONGO_URI (or DATABASE_URL) in the server .env and ensure MongoDB is running.',
      });
    }
    const enquiry = new Enquiry({
      name,
      phone,
      email,
      servicesProducts,
      company: company || '',
      message: message || '',
    });
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully.', id: enquiry._id });
  } catch (err) {
    console.error('Enquiry submit error:', err);
    const isDev = process.env.NODE_ENV !== 'production';
    res.status(500).json({
      message: isDev ? (err.message || 'Failed to submit enquiry.') : 'Failed to submit enquiry. Please try again.',
    });
  }
});

module.exports = router;
