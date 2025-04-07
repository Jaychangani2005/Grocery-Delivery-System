const pool = require('../config/db');

const placeOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { userId, items, addressId, paymentMethod, total } = req.body;
    
    // Validate required fields
    if (!userId || !items || !addressId || !paymentMethod || total === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { userId, items, addressId, paymentMethod, total }
      });
    }
    
    const now = new Date();

    // 1. Create the order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, address_id, total, status, payment_method, created_at) 
       VALUES (?, ?, ?, 'new', ?, ?)`,
      [userId, addressId, total, paymentMethod, now]
    );
    const orderId = orderResult.insertId;

    // 2. Insert order items
    for (const item of items) {
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
    }

    // 3. Create payment record
    const razorpayId = `rzp_${Math.random().toString(36).substr(2, 9)}`;
    await connection.query(
      `INSERT INTO payments (order_id, razorpay_id, amount, status, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [orderId, razorpayId, total, paymentMethod === 'cod' ? '' : 'success', now]
    );

    // 4. Add order status history
    await connection.query(
      `INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, timestamp) 
       VALUES (?, NULL, 'new', 'system', ?)`,
      [orderId, now]
    );

    // 5. Clear cart items
    await connection.query(
      `DELETE FROM cart_items WHERE cart_id IN (SELECT cart_id FROM cart WHERE user_id = ?)`,
      [userId]
    );

    await connection.commit();

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