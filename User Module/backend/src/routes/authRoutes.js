const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // For testing purposes, we'll use a mock user
    // In production, you should verify against the database
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User'
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: mockUser.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      user: mockUser,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // For testing purposes, we'll just return success
    // In production, you should hash the password and store in database
    res.json({
      message: 'Registration successful',
      user: {
        id: 1,
        name,
        email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router; 