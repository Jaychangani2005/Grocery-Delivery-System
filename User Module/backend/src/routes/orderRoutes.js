const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/db');

// Place order (both routes will work)
router.post('/', authenticateToken, placeOrder);
router.post('/place', authenticateToken, placeOrder);

// Get user orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching orders for user:', userId);

    // Get orders with their items and product details
    const query = `
      SELECT 
        o.order_id,
        o.user_id,
        o.total,
        o.status,
        o.payment_method,
        o.created_at,
        oi.order_item_id,
        oi.quantity,
        oi.price as item_price,
        p.product_id,
        p.name as product_name,
        p.product_detail,
        p.unit,
        p.price as product_price,
        p.mrp,
        p.stock,
        p.shelflife,
        pc.name as category,
        pi.image_url
      FROM orders o
      LEFT JOIN order_items oi ON o.order_id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.product_id
      LEFT JOIN product_categories pc ON p.category_id = pc.category_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `;

    const [rows] = await db.query(query, [userId]);
    console.log('Found orders:', rows.length);

    // Group items by order
    const ordersMap = new Map();
    
    rows.forEach(row => {
      if (!ordersMap.has(row.order_id)) {
        // Create new order entry
        ordersMap.set(row.order_id, {
          id: row.order_id,
          userId: row.user_id,
          total: parseFloat(row.total) || 0,
          status: row.status,
          paymentMethod: row.payment_method,
          createdAt: row.created_at,
          items: []
        });
      }

      // Add item to order if it exists
      if (row.order_item_id) {
        const order = ordersMap.get(row.order_id);
        order.items.push({
          id: row.order_item_id,
          productId: row.product_id,
          quantity: parseInt(row.quantity) || 0,
          price: parseFloat(row.item_price) || 0,
          product: {
            id: row.product_id,
            name: row.product_name,
            description: row.product_detail,
            price: parseFloat(row.product_price) || 0,
            oldPrice: parseFloat(row.mrp) || 0,
            unit: row.unit,
            stock: parseInt(row.stock) || 0,
            category: row.category,
            image_url: row.image_url
          }
        });
      }
    });

    // Convert map to array and ensure all numeric values
    const orders = Array.from(ordersMap.values()).map(order => ({
      ...order,
      total: parseFloat(order.total) || 0,
      items: order.items.map(item => ({
        ...item,
        quantity: parseInt(item.quantity) || 0,
        price: parseFloat(item.price) || 0,
        product: {
          ...item.product,
          price: parseFloat(item.product.price) || 0,
          oldPrice: parseFloat(item.product.oldPrice) || 0,
          stock: parseInt(item.product.stock) || 0
        }
      }))
    }));

    console.log('Processed orders:', orders.length);
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router; 