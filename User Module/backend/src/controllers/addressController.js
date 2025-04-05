const pool = require('../config/db');

const addressController = {
  // Get all addresses for a user
  getAddresses: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      console.log('Getting addresses for user:', userId);

      const [rows] = await pool.query(
        'SELECT * FROM user_addresses WHERE user_id = ? ORDER BY address_id DESC',
        [userId]
      );

      console.log('Found addresses:', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error getting addresses:', error);
      res.status(500).json({ error: 'Failed to get addresses' });
    }
  },

  // Add a new address
  addAddress: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
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

      console.log('Adding new address for user:', userId);

      const [result] = await pool.query(
        `INSERT INTO user_addresses (
          user_id, address_type, name, phone, house_no, building_name,
          street, area, city, state, pincode, landmark
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, address_type, name, phone, house_no, building_name,
         street, area, city, state, pincode, landmark]
      );

      const [newAddress] = await pool.query(
        'SELECT * FROM user_addresses WHERE address_id = ?',
        [result.insertId]
      );

      console.log('Added new address:', newAddress[0]);
      res.status(201).json(newAddress[0]);
    } catch (error) {
      console.error('Error adding address:', error);
      res.status(500).json({ error: 'Failed to add address' });
    }
  },

  // Update an address
  updateAddress: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      const addressId = req.params.addressId;
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

      console.log('Updating address:', addressId, 'for user:', userId);

      // First verify that the address belongs to the user
      const [addressCheck] = await pool.query(
        'SELECT * FROM user_addresses WHERE address_id = ? AND user_id = ?',
        [addressId, userId]
      );

      if (addressCheck.length === 0) {
        console.log('Address not found or does not belong to user');
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
        [address_type, name, phone, house_no, building_name,
         street, area, city, state, pincode, landmark,
         addressId, userId]
      );

      const [updatedAddress] = await pool.query(
        'SELECT * FROM user_addresses WHERE address_id = ?',
        [addressId]
      );

      console.log('Updated address:', updatedAddress[0]);
      res.json(updatedAddress[0]);
    } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ error: 'Failed to update address' });
    }
  },

  // Delete an address
  deleteAddress: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      const addressId = req.params.addressId;

      console.log('Deleting address:', addressId, 'for user:', userId);

      // First verify that the address belongs to the user
      const [addressCheck] = await pool.query(
        'SELECT * FROM user_addresses WHERE address_id = ? AND user_id = ?',
        [addressId, userId]
      );

      if (addressCheck.length === 0) {
        console.log('Address not found or does not belong to user');
        return res.status(404).json({ error: 'Address not found' });
      }

      await pool.query(
        'DELETE FROM user_addresses WHERE address_id = ? AND user_id = ?',
        [addressId, userId]
      );

      console.log('Deleted address:', addressId);
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error('Error deleting address:', error);
      res.status(500).json({ error: 'Failed to delete address' });
    }
  }
};

module.exports = addressController; 