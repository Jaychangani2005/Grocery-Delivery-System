const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./admin_seller/backend/config/db');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  next();
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received WebSocket message:', data);
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.get('/api/dashboard/seller-products', (req, res, next) => {
  try {
    console.log('Received request for seller products');
    console.log('Query parameters:', req.query);
    console.log('Seller ID:', req.query.seller_id);
    
    // Check if seller_id is provided
    if (!req.query.seller_id) {
      return res.status(400).json({ error: 'Seller ID is required' });
    }
    
    // Query to get products for the specific seller
    const query = `
      SELECT 
        p.product_id,
        p.name,
        p.product_detail as description,
        p.price,
        p.mrp,
        p.stock,
        p.unit,
        p.shelflife,
        pc.name as category,
        psc.name as subcategory,
        pi.image_url as image
      FROM products p
      LEFT JOIN product_categories pc ON p.category_id = pc.category_id
      LEFT JOIN product_subcategories psc ON p.subcategory_id = psc.subcategory_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id
      WHERE p.seller_id = ?
      ORDER BY p.product_id DESC
    `;
    
    db.query(query, [req.query.seller_id], (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error in seller-products route:', error);
    next(error);
  }
});

app.delete('/api/dashboard/delete-product/:id', (req, res, next) => {
  try {
    console.log('Received delete request for product:', req.params.id);
    const productId = parseInt(req.params.id);
    
    // Delete product images first
    const deleteImagesQuery = "DELETE FROM product_images WHERE product_id = ?";
    db.query(deleteImagesQuery, [productId], (err) => {
      if (err) {
        console.error('Error deleting product images:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Then delete the product
      const deleteProductQuery = "DELETE FROM products WHERE product_id = ?";
      db.query(deleteProductQuery, [productId], (err, result) => {
        if (err) {
          console.error('Error deleting product:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
      });
    });
  } catch (error) {
    console.error('Error in delete-product route:', error);
    next(error);
  }
});

// Add a test route to verify the server is running
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  console.error('Error stack:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the server by visiting http://localhost:${PORT}/api/test`);
  console.log('Available routes:');
  console.log('  GET  /api/test');
  console.log('  GET  /api/dashboard/seller-products');
  console.log('  DELETE /api/dashboard/delete-product/:id');
}); 