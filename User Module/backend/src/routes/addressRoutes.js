const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// Get all addresses for the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [addresses] = await pool.query(
      'SELECT * FROM user_addresses WHERE user_id = ?',
      [req.user.id]
    );
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

// Add a new address
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      address_type,
      name,
      phone,
      house_no,
      building_name,
      street,
      area,
      city,
      state,
      pincode,
      landmark
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO user_addresses (
        user_id, address_type, name, phone, house_no, building_name,
        street, area, city, state, pincode, landmark
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        address_type,
        name,
        phone,
        house_no,
        building_name,
        street,
        area,
        city,
        state,
        pincode,
        landmark
      ]
    );

    const [newAddress] = await pool.query(
      'SELECT * FROM user_addresses WHERE address_id = ?',
      [result.insertId]
    );

    res.status(201).json(newAddress[0]);
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Failed to add address' });
  }
});

// Update an address
router.put('/:addressId', authenticateToken, async (req, res) => {
  try {
    const { addressId } = req.params;
    const {
      address_type,
      name,
      phone,
      house_no,
      building_name,
      street,
      area,
      city,
      state,
      pincode,
      landmark
    } = req.body;

    // First check if the address belongs to the user
    const [addresses] = await pool.query(
      'SELECT * FROM user_addresses WHERE address_id = ? AND user_id = ?',
      [addressId, req.user.id]
    );

    if (addresses.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await pool.query(
      `UPDATE user_addresses SET
        address_type = ?,
        name = ?,
        phone = ?,
        house_no = ?,
        building_name = ?,
        street = ?,
        area = ?,
        city = ?,
        state = ?,
        pincode = ?,
        landmark = ?
      WHERE address_id = ? AND user_id = ?`,
      [
        address_type,
        name,
        phone,
        house_no,
        building_name,
        street,
        area,
        city,
        state,
        pincode,
        landmark,
        addressId,
        req.user.id
      ]
    );

    const [updatedAddress] = await pool.query(
      'SELECT * FROM user_addresses WHERE address_id = ?',
      [addressId]
    );

    res.json(updatedAddress[0]);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
});

// Delete an address
router.delete('/:addressId', authenticateToken, async (req, res) => {
  try {
    const { addressId } = req.params;

    // First check if the address belongs to the user
    const [addresses] = await pool.query(
      'SELECT * FROM user_addresses WHERE address_id = ? AND user_id = ?',
      [addressId, req.user.id]
    );

    if (addresses.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await pool.query(
      'DELETE FROM user_addresses WHERE address_id = ? AND user_id = ?',
      [addressId, req.user.id]
    );

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

module.exports = router; 