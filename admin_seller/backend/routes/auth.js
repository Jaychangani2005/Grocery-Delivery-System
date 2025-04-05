// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "d4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625";

router.post('/login', async (req, res) => {
  console.log("Login route hit!");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user exists in users table
  let query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    let userId, role, name;
    role = user.role;

    if (role === "seller") {
      const sellerQuery = "SELECT * FROM sellers WHERE email = ?";
      db.query(sellerQuery, [email], (err, sellerResults) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (sellerResults.length === 0) {
          return res.status(404).json({ error: "Seller not found" });
        }

        userId = sellerResults[0].seller_id;
        name = sellerResults[0].store_name;
        const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ success: true, role, name, seller_id: userId, token });
      });
    } else {
      userId = user.user_id;
      name = user.full_name;
      const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ success: true, role, name, user_id: userId, token });
    }
  });
});

module.exports = router;
