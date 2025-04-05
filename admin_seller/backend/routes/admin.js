const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Get all admins
router.get("/", (req, res) => {
  const query = "SELECT admin_id, email, role FROM admins";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching admins:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Create new admin
router.post("/", async (req, res) => {
  const { email, password, role } = req.body;
  
  if (!["Super Admin", "Manager", "Support", "Finance"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const query = "INSERT INTO admins (email, password, role) VALUES (?, ?, ?)";
  db.query(query, [email, hashedPassword, role], (err, result) => {
    if (err) {
      console.error("Error creating admin:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    // Log admin action
    const actionQuery = "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'admin', ?)";
    db.query(actionQuery, [1, `Created new admin: ${email}`, result.insertId]);
    
    res.json({ message: "Admin created successfully", id: result.insertId });
  });
});

// Update admin
router.put("/:id", async (req, res) => {
  const { email, role } = req.body;
  const adminId = req.params.id;
  
  if (!["Super Admin", "Manager", "Support", "Finance"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }
  
  const query = "UPDATE admins SET email = ?, role = ? WHERE admin_id = ?";
  db.query(query, [email, role, adminId], (err, result) => {
    if (err) {
      console.error("Error updating admin:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }
    
    // Log admin action
    const actionQuery = "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'admin', ?)";
    db.query(actionQuery, [1, `Updated admin: ${email}`, adminId]);
    
    res.json({ message: "Admin updated successfully" });
  });
});

// Delete admin
router.delete("/:id", (req, res) => {
  const adminId = req.params.id;
  
  const query = "DELETE FROM admins WHERE admin_id = ?";
  db.query(query, [adminId], (err, result) => {
    if (err) {
      console.error("Error deleting admin:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }
    
    // Log admin action
    const actionQuery = "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'admin', ?)";
    db.query(actionQuery, [1, `Deleted admin with ID: ${adminId}`, adminId]);
    
    res.json({ message: "Admin deleted successfully" });
  });
});

// Get admin actions log
router.get("/actions", (req, res) => {
  const query = `
    SELECT aa.*, a.email as admin_email 
    FROM admin_actions aa 
    JOIN admins a ON aa.admin_id = a.admin_id 
    ORDER BY aa.timestamp DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching admin actions:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Check admin authentication status
router.get("/check-auth", (req, res) => {
  res.json({ isAuthenticated: true });
});

module.exports = router; 