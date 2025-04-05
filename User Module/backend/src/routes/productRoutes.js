const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get featured products
router.get('/featured', productController.getFeaturedProducts);

// Get best sellers
router.get('/best-sellers', productController.getBestSellers);

// Get products by category
router.get('/category/:categoryId', productController.getProductsByCategory);

// Search products
router.get('/search', productController.searchProducts);

module.exports = router; 