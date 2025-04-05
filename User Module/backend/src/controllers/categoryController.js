const pool = require('../config/db');

const getAllCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(`
      SELECT 
        pc.*,
        (
          SELECT pi.image_url
          FROM products p
          JOIN product_images pi ON p.product_id = pi.product_id
          WHERE p.category_id = pc.category_id
          LIMIT 1
        ) as image_url
      FROM product_categories pc
    `);

    // Format the response
    const formattedCategories = categories.map(category => ({
      id: category.category_id,
      name: category.name,
      adminId: category.admin_id,
      image: category.image_url || `/images/${category.name.toLowerCase().replace(/\s+/g, '-')}.jpg`
    }));

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
        pc.*,
        (
          SELECT pi.image_url
          FROM products p
          JOIN product_images pi ON p.product_id = pi.product_id
          WHERE p.category_id = pc.category_id
          LIMIT 1
        ) as image_url
      FROM product_categories pc
      WHERE pc.category_id = ?
    `, [id]);
    
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Format the response
    const category = {
      id: categories[0].category_id,
      name: categories[0].name,
      adminId: categories[0].admin_id,
      image: categories[0].image_url || `/images/${categories[0].name.toLowerCase().replace(/\s+/g, '-')}.jpg`
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