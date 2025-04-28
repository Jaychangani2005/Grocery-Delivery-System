const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the database for the user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Compare password (assuming passwords are hashed in the database)
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data and token
    res.json({
      user: {
        id: user.user_id,
        name: user.full_name,
        email: user.email
      },
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

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const [result] = await pool.query(
      'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Generate JWT token for the new user
    const token = jwt.sign(
      { userId: result.insertId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create default cart for the user
    await pool.query(
      'INSERT INTO cart (user_id) VALUES (?)',
      [result.insertId]
    );

    res.json({
      message: 'Registration successful',
      user: {
        id: result.insertId,
        name,
        email
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router; 