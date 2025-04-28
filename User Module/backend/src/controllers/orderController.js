const pool = require('../config/db');

const placeOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { userId, items, addressId, paymentMethod, total } = req.body;
    
    console.log('Received order data:', { userId, items, addressId, paymentMethod, total });
    
    // Validate required fields
    if (!userId || !items || !addressId || !paymentMethod || total === undefined) {
      console.error('Missing required fields:', { userId, items, addressId, paymentMethod, total });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { userId, items, addressId, paymentMethod, total }
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      console.error('Invalid items array:', items);
      return res.status(400).json({
        success: false,
        message: 'Invalid items array',
        received: items
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        console.error('Invalid item:', item);
        return res.status(400).json({
          success: false,
          message: 'Invalid item data',
          received: item
        });
      }
    }
    
    const now = new Date();

    // 1. Create the order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, address_id, total, status, payment_method, created_at) 
       VALUES (?, ?, ?, 'new', ?, ?)`,
      [userId, addressId, total, paymentMethod, now]
    );
    const orderId = orderResult.insertId;
    console.log('Created order with ID:', orderId);

    // 2. Insert order items and update stock
    for (const item of items) {
      console.log('Processing order item:', item);
      
      // Get current stock and seller info
      const [productResult] = await connection.query(
        'SELECT p.stock, p.price, p.seller_id FROM products p WHERE p.product_id = ?',
        [item.productId]
      );
      
      if (productResult.length === 0) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      const product = productResult[0];
      
      // Check if enough stock
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${item.productId}`);
      }
      
      // Insert order item
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES (?, ?, ?, ?)`,
        [orderId, item.productId, item.quantity, item.price]
      );

      // Update product stock
      await connection.query(
        `UPDATE products SET stock = stock - ? WHERE product_id = ?`,
        [item.quantity, item.productId]
      );

      // Calculate seller earnings based on item price and quantity
      const earnings = item.price * item.quantity;
      console.log('Calculated earnings:', { itemPrice: item.price, quantity: item.quantity, earnings });
      
      // Update seller earnings in the database
      await connection.query(
        `INSERT INTO seller_earnings (seller_id, order_id, amount)
         VALUES (?, ?, ?)`,
        [product.seller_id, orderId, earnings]
      );
    }

    // 3. Create payment record
    const razorpayId = `rzp_${Math.random().toString(36).substr(2, 9)}`;
    await connection.query(
      `INSERT INTO payments (order_id, razorpay_id, amount, status) 
       VALUES (?, ?, ?, ?)`,
      [orderId, razorpayId, total, paymentMethod === 'cod' ? '' : 'success']
    );

    // 4. Add order status history
    await connection.query(
      `INSERT INTO order_status_history (order_id, old_status, new_status, changed_by) 
       VALUES (?, NULL, 'new', 'system')`,
      [orderId]
    );

    // 5. Clear cart items - First get the cart_id
    const [cartResult] = await connection.query(
      'SELECT cart_id FROM cart WHERE user_id = ?',
      [userId]
    );

    if (cartResult.length > 0) {
      const cartId = cartResult[0].cart_id;
      // Delete cart items
      await connection.query(
        'DELETE FROM cart_items WHERE cart_id = ?',
        [cartId]
      );
    }

    await connection.commit();
    console.log('Order placed successfully:', orderId);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

module.exports = {
  placeOrder
}; 