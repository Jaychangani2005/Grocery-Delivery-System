// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "d4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625";

router.post('/login', async (req, res) => {
  console.log("Login route hit with data:", { email: req.body.email });
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing email or password");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // First check if it's a seller
    const sellerQuery = "SELECT * FROM sellers WHERE email = ? AND is_approved = '1'";
    console.log("Checking seller first:", sellerQuery, "with email:", email);
    
    db.query(sellerQuery, [email], async (err, sellerResults) => {
      if (err) {
        console.error("Database error fetching seller:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (sellerResults.length > 0) {
        const seller = sellerResults[0];
        console.log("Seller found:", { id: seller.seller_id, name: seller.store_name });
        
        // Direct password comparison since it's not encrypted
        if (password === seller.password) {
          const token = jwt.sign({ id: seller.seller_id, role: "seller" }, JWT_SECRET, { expiresIn: "1h" });
          console.log("Generated token for seller");
          return res.json({ 
            success: true, 
            role: "seller", 
            name: seller.store_name, 
            seller_id: seller.seller_id, 
            token 
          });
        }
      }

      // If not a seller or seller login failed, check users table
      const userQuery = "SELECT * FROM users WHERE email = ?";
      console.log("Checking users table:", userQuery, "with email:", email);
      
      db.query(userQuery, [email], async (err, userResults) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (userResults.length === 0) {
          console.log("No user found with email:", email);
          return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = userResults[0];
        console.log("User found:", { id: user.user_id, role: user.role });

        // Direct password comparison since it's not encrypted
        if (password === user.password) {
          const token = jwt.sign({ id: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
          console.log("Generated token for user");
          return res.json({ 
            success: true, 
            role: user.role, 
            name: user.full_name, 
            user_id: user.user_id, 
            token 
          });
        } else {
          console.log("Password mismatch for user:", email);
          return res.status(401).json({ error: "Invalid email or password" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error during login:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;
