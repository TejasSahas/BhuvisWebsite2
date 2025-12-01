const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String, default: 'Investor' },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Compound index for email and role to allow same email with different roles
UserSchema.index({ email: 1, role: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
