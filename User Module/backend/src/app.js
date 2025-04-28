const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug static files directory
const staticDir = path.join(__dirname, '../public/images');
console.log('Static files directory:', staticDir);
if (!fs.existsSync(staticDir)) {
  console.log('Creating static files directory...');
  fs.mkdirSync(staticDir, { recursive: true });
}

// Static files
app.use('/images', express.static(staticDir));

// Debug middleware for image requests
app.use('/images', (req, res, next) => {
  console.log('Image request:', req.path);
  const imagePath = path.join(staticDir, req.path);
  console.log('Looking for image at:', imagePath);
  if (fs.existsSync(imagePath)) {
    console.log('Image found');
  } else {
    console.log('Image not found');
  }
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 