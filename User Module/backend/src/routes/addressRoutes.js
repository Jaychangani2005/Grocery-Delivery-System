const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Get all addresses for the authenticated user
router.get('/', addressController.getAddresses);

// Add a new address
router.post('/', addressController.addAddress);

// Update an address
router.put('/:addressId', addressController.updateAddress);

// Delete an address
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router; 