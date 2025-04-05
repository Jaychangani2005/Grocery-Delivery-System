const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById } = require('../controllers/categoryController');

// Get all categories
router.get('/', getAllCategories);

// Get category by ID
router.get('/:id', getCategoryById);

module.exports = router; 