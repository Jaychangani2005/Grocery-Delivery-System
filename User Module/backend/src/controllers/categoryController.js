const pool = require('../config/db');
const path = require('path');
const fs = require('fs');

const getAllCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(`
      SELECT 
        pc.category_id as id,
        pc.name,
        pc.admin_id as adminId,
        pc.image_url as image
      FROM product_categories pc
    `);

    console.log('Raw categories from DB:', JSON.stringify(categories, null, 2));

    // Format the response
    const formattedCategories = categories.map(category => {
      // Get the image filename from the database
      const imageFilename = category.image || '';
      
      // Remove leading slash if present and get the filename
      const cleanImagePath = imageFilename.startsWith('/') ? imageFilename.substring(1) : imageFilename;
      const imageName = cleanImagePath.split('/').pop() || '';
      
      // Convert filename to match the actual file in the filesystem
      // Replace underscores with spaces and capitalize first letters
      const formattedImageName = imageName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('_');
      
      // Construct the full image path using admin-seller backend URL
      const imageUrl = imageName 
        ? `http://localhost:5000/images/category/${formattedImageName}`
        : `http://localhost:3000/images/placeholder.svg`;
      
      console.log('Processing category:', {
        name: category.name,
        originalImage: category.image,
        finalImagePath: imageUrl
      });
      
      return {
        id: category.id,
        name: category.name,
        adminId: category.adminId,
        image: imageUrl
      };
    });

    res.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [categories] = await pool.query(`
      SELECT 
        pc.category_id as id,
        pc.name,
        pc.admin_id as adminId,
        pc.image_url as image
      FROM product_categories pc
      WHERE pc.category_id = ?
    `, [id]);
    
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Get the image filename from the database
    const imageFilename = categories[0].image || '';
    
    // Remove leading slash if present and get the filename
    const cleanImagePath = imageFilename.startsWith('/') ? imageFilename.substring(1) : imageFilename;
    const imageName = cleanImagePath.split('/').pop() || '';
    
    // Convert filename to match the actual file in the filesystem
    // Replace underscores with spaces and capitalize first letters
    const formattedImageName = imageName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('_');
    
    // Construct the full image path using admin-seller backend URL
    const imageUrl = imageName 
      ? `http://localhost:5000/images/category/${formattedImageName}`
      : `http://localhost:3000/images/placeholder.svg`;
    
    console.log('Processing category:', {
      name: categories[0].name,
      originalImage: categories[0].image,
      finalImagePath: imageUrl
    });
    
    // Format the response
    const category = {
      id: categories[0].id,
      name: categories[0].name,
      adminId: categories[0].adminId,
      image: imageUrl
    };
    
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById
}; 