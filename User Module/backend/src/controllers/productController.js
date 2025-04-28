const pool = require('../config/db');

const productController = {
  // Get featured products
  getFeaturedProducts: async (req, res) => {
    try {
      const [products] = await pool.query(`
        SELECT 
          p.product_id as id,
          p.name,
          p.product_detail as description,
          p.price,
          p.mrp as oldPrice,
          p.stock,
          pc.name as category,
          COALESCE(AVG(r.stars), 4.5) as rating,
          CASE 
            WHEN p.name LIKE '%organic%' OR p.name LIKE '%Organic%' THEN 1 
            ELSE 0 
          END as isOrganic,
          p.unit,
          pi.image_url as image
        FROM products p
        LEFT JOIN product_categories pc ON p.category_id = pc.category_id
        LEFT JOIN order_ratings r ON p.product_id = r.order_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
        WHERE p.stock > 10
        GROUP BY p.product_id
        ORDER BY rating DESC, p.stock DESC
        LIMIT 8
      `);

      // Format the response
      const formattedProducts = products.map(product => ({
        id: parseInt(product.id),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        oldPrice: parseFloat(product.oldPrice),
        image: product.image || `/images/placeholder.jpg`,
        category: product.category,
        rating: parseFloat(product.rating),
        isOrganic: Boolean(product.isOrganic),
        unit: product.unit
      }));

      res.json(formattedProducts);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const [products] = await pool.query(`
        SELECT 
          p.product_id as id,
          p.name,
          p.product_detail as description,
          p.price,
          p.mrp as oldPrice,
          p.stock,
          pc.name as category,
          COALESCE(AVG(r.stars), 4.5) as rating,
          p.unit,
          pi.image_url as image
        FROM products p
        LEFT JOIN product_categories pc ON p.category_id = pc.category_id
        LEFT JOIN order_ratings r ON p.product_id = r.order_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
        WHERE p.stock > 0
        GROUP BY p.product_id
        ORDER BY p.name
      `);

      // Format the response
      const formattedProducts = products.map(product => ({
        id: parseInt(product.id),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        oldPrice: parseFloat(product.oldPrice),
        image: product.image || `/images/placeholder.jpg`,
        category: product.category,
        rating: parseFloat(product.rating),
        unit: product.unit,
        stock: parseInt(product.stock)
      }));

      res.json(formattedProducts);
    } catch (error) {
      console.error('Error fetching all products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get products by category
  getProductsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      console.log('Requested category:', categoryId);
      
      // Handle "all" category case
      if (categoryId === 'all') {
        return productController.getAllProducts(req, res);
      }
      
      // First, try to get category by ID
      const [categories] = await pool.query(
        'SELECT category_id, name FROM product_categories WHERE category_id = ? OR LOWER(name) = LOWER(?)',
        [categoryId, categoryId.replace(/-/g, ' ')]
      );
      
      console.log('Found categories:', categories);

      if (categories.length === 0) {
        console.log('No category found for:', categoryId);
        return res.status(404).json({ error: 'Category not found' });
      }

      const finalCategoryId = categories[0].category_id;
      console.log('Using category ID:', finalCategoryId);

      const [products] = await pool.query(`
        SELECT 
          p.product_id as id,
          p.name,
          p.product_detail as description,
          p.price,
          p.mrp as oldPrice,
          p.stock,
          pc.name as category,
          COALESCE(AVG(r.stars), 4.5) as rating,
          p.unit,
          pi.image_url as image,
          CASE 
            WHEN p.name LIKE '%organic%' OR p.name LIKE '%Organic%' THEN 1 
            ELSE 0 
          END as isOrganic
        FROM products p
        LEFT JOIN product_categories pc ON p.category_id = pc.category_id
        LEFT JOIN order_ratings r ON p.product_id = r.order_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
        WHERE p.category_id = ? AND p.stock > 0
        GROUP BY p.product_id
        ORDER BY p.name
      `, [finalCategoryId]);

      console.log('Found products:', products.length);

      // Format the response
      const formattedProducts = products.map(product => ({
        id: parseInt(product.id),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        oldPrice: parseFloat(product.oldPrice),
        image: product.image || `/images/placeholder.jpg`,
        category: product.category,
        rating: parseFloat(product.rating),
        isOrganic: Boolean(product.isOrganic),
        unit: product.unit,
        stock: parseInt(product.stock)
      }));

      console.log('Sending formatted products:', formattedProducts.length);
      res.json(formattedProducts);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get best sellers
  getBestSellers: async (req, res) => {
    try {
      const [products] = await pool.query(`
        SELECT 
          p.product_id as id,
          p.name,
          p.product_detail as description,
          p.price,
          p.mrp as oldPrice,
          p.stock,
          pc.name as category,
          COALESCE(AVG(r.stars), 4.5) as rating,
          COUNT(oi.order_item_id) as total_sold,
          p.unit,
          pi.image_url as image
        FROM products p
        LEFT JOIN product_categories pc ON p.category_id = pc.category_id
        LEFT JOIN order_ratings r ON p.product_id = r.order_id
        LEFT JOIN order_items oi ON p.product_id = oi.product_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
        WHERE p.stock > 0
        GROUP BY p.product_id
        ORDER BY total_sold DESC, rating DESC
        LIMIT 8
      `);

      // Format the response
      const formattedProducts = products.map(product => ({
        id: parseInt(product.id),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        oldPrice: parseFloat(product.oldPrice),
        image: product.image || `/images/placeholder.jpg`,
        category: product.category,
        rating: parseFloat(product.rating),
        unit: product.unit,
        stock: parseInt(product.stock)
      }));

      res.json(formattedProducts);
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Search products
  searchProducts: async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.json([]);
      }
      
      const searchTerm = q.toLowerCase();
      const wildcardTerm = `%${searchTerm}%`;
      const exactTerm = searchTerm;
      
      const [products] = await pool.query(`
        SELECT 
          p.product_id as id,
          p.name,
          p.product_detail as description,
          p.price,
          p.mrp as oldPrice,
          p.stock,
          pc.name as category,
          COALESCE(AVG(r.stars), 4.5) as rating,
          p.unit,
          pi.image_url as image,
          CASE 
            WHEN LOWER(p.name) = ? THEN 10
            WHEN LOWER(p.name) LIKE CONCAT('% ', ?, ' %') THEN 8
            WHEN LOWER(p.name) LIKE CONCAT(?, ' %') THEN 7
            WHEN LOWER(p.name) LIKE CONCAT('% ', ?) THEN 7
            WHEN LOWER(p.name) LIKE ? THEN 5
            WHEN LOWER(p.product_detail) LIKE ? THEN 3
            WHEN LOWER(pc.name) LIKE ? THEN 1
            ELSE 0
          END as relevance
        FROM products p
        LEFT JOIN product_categories pc ON p.category_id = pc.category_id
        LEFT JOIN order_ratings r ON p.product_id = r.order_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
        WHERE (
          LOWER(p.name) LIKE ? OR 
          LOWER(p.product_detail) LIKE ? OR 
          LOWER(pc.name) LIKE ?
        ) AND p.stock > 0
        GROUP BY p.product_id
        HAVING relevance > 0
        ORDER BY relevance DESC, rating DESC, p.name
        LIMIT 20
      `, [
        exactTerm,
        exactTerm,
        exactTerm,
        exactTerm,
        wildcardTerm,
        wildcardTerm,
        wildcardTerm,
        wildcardTerm,
        wildcardTerm,
        wildcardTerm
      ]);

      // Format the response
      const formattedProducts = products.map(product => ({
        id: parseInt(product.id),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        oldPrice: parseFloat(product.oldPrice),
        image: product.image || `/images/placeholder.jpg`,
        category: product.category,
        rating: parseFloat(product.rating),
        unit: product.unit,
        stock: parseInt(product.stock)
      }));

      console.log(`Found ${formattedProducts.length} products matching "${q}"`);
      res.json(formattedProducts);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get single product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Fetching product with ID:', id);

      const [products] = await pool.query(`
        SELECT 
          p.product_id as id,
          p.name,
          p.product_detail as description,
          p.price,
          p.mrp as oldPrice,
          p.stock,
          pc.name as category,
          COALESCE(AVG(r.stars), 4.5) as rating,
          p.unit,
          pi.image_url as image,
          CASE 
            WHEN p.name LIKE '%organic%' OR p.name LIKE '%Organic%' THEN 1 
            ELSE 0 
          END as isOrganic
        FROM products p
        LEFT JOIN product_categories pc ON p.category_id = pc.category_id
        LEFT JOIN order_ratings r ON p.product_id = r.order_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id
        WHERE p.product_id = ?
        GROUP BY p.product_id
      `, [id]);

      if (products.length === 0) {
        console.log('No product found with ID:', id);
        return res.status(404).json({ error: 'Product not found' });
      }

      const product = products[0];

      // Format the response
      const formattedProduct = {
        id: parseInt(product.id),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        oldPrice: parseFloat(product.oldPrice),
        image: product.image || `/images/placeholder.jpg`,
        category: product.category,
        rating: parseFloat(product.rating),
        isOrganic: Boolean(product.isOrganic),
        unit: product.unit,
        stock: parseInt(product.stock)
      };

      console.log('Sending formatted product:', formattedProduct);
      res.json(formattedProduct);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = productController; 