const pool = require('../config/db');

const cartController = {
  // Get user's cart
  getCart: async (req, res) => {
    try {
      const userId = req.user.id;
      console.log('Getting cart for user:', userId);

      // Get or create cart
      const [carts] = await pool.query(
        'SELECT cart_id FROM cart WHERE user_id = ?',
        [userId]
      );

      let cartId;
      if (carts.length === 0) {
        // Create new cart
        const [result] = await pool.query(
          'INSERT INTO cart (user_id) VALUES (?)',
          [userId]
        );
        cartId = result.insertId;
        console.log('Created new cart with ID:', cartId);
      } else {
        cartId = carts[0].cart_id;
        console.log('Found existing cart with ID:', cartId);
      }

      // Get cart items with product details
      const [cartItems] = await pool.query(`
        SELECT 
          ci.cart_item_id,
          ci.product_id,
          ci.quantity,
          p.name,
          p.price,
          p.product_detail as description,
          p.unit,
          pi.image_url as image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.product_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
        WHERE ci.cart_id = ?
      `, [cartId]);

      console.log('Found cart items:', cartItems.length);

      // Format cart items
      const formattedItems = cartItems.map(item => ({
        id: item.cart_item_id,
        productId: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product: {
          id: item.product_id,
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          unit: item.unit,
          image: item.image || `/images/placeholder.jpg`
        }
      }));

      res.json(formattedItems);
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ error: 'Failed to get cart' });
    }
  },

  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      
      console.log('Adding to cart:', { userId, productId, quantity });

      // Validate input
      if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ error: 'Invalid product ID or quantity' });
      }

      // Get or create cart
      const [carts] = await pool.query(
        'SELECT cart_id FROM cart WHERE user_id = ?',
        [userId]
      );

      let cartId;
      if (carts.length === 0) {
        // Create new cart
        const [result] = await pool.query(
          'INSERT INTO cart (user_id) VALUES (?)',
          [userId]
        );
        cartId = result.insertId;
        console.log('Created new cart with ID:', cartId);
      } else {
        cartId = carts[0].cart_id;
        console.log('Found existing cart with ID:', cartId);
      }

      // Check if item already exists in cart
      const [existingItems] = await pool.query(
        'SELECT cart_item_id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?',
        [cartId, productId]
      );

      let cartItemId;
      if (existingItems.length > 0) {
        // Update existing item
        const newQuantity = existingItems[0].quantity + quantity;
        await pool.query(
          'UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?',
          [newQuantity, existingItems[0].cart_item_id]
        );
        cartItemId = existingItems[0].cart_item_id;
        console.log('Updated existing cart item:', cartItemId);
      } else {
        // Add new item
        const [result] = await pool.query(
          'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
          [cartId, productId, quantity]
        );
        cartItemId = result.insertId;
        console.log('Added new cart item:', cartItemId);
      }

      // Get the updated cart item with product details
      const [cartItems] = await pool.query(`
        SELECT 
          ci.cart_item_id,
          ci.product_id,
          ci.quantity,
          p.name,
          p.price,
          p.product_detail as description,
          p.unit,
          pi.image_url as image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.product_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
        WHERE ci.cart_item_id = ?
      `, [cartItemId]);

      if (cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      // Format response
      const item = cartItems[0];
      const formattedItem = {
        id: item.cart_item_id,
        productId: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product: {
          id: item.product_id,
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          unit: item.unit,
          image: item.image || `/images/placeholder.jpg`
        }
      };

      console.log('Successfully added item to cart:', formattedItem);
      res.json(formattedItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  },

  // Update cart item quantity
  updateCartItem: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const { quantity } = req.body;
      
      console.log('Updating cart item:', { userId, productId, quantity });

      // Validate input
      if (!quantity || quantity < 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }

      // Get cart
      const [carts] = await pool.query(
        'SELECT cart_id FROM cart WHERE user_id = ?',
        [userId]
      );

      if (carts.length === 0) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      const cartId = carts[0].cart_id;

      if (quantity === 0) {
        // Remove item if quantity is 0
        await pool.query(
          'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
          [cartId, productId]
        );
        console.log('Removed item from cart');
        return res.json({ message: 'Item removed from cart' });
      }

      // Update item quantity
      await pool.query(
        'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
        [quantity, cartId, productId]
      );

      // Get updated cart item
      const [cartItems] = await pool.query(`
        SELECT 
          ci.cart_item_id,
          ci.product_id,
          ci.quantity,
          p.name,
          p.price,
          p.product_detail as description,
          p.unit,
          pi.image_url as image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.product_id
        LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
        WHERE ci.cart_id = ? AND ci.product_id = ?
      `, [cartId, productId]);

      if (cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      // Format response
      const item = cartItems[0];
      const formattedItem = {
        id: item.cart_item_id,
        productId: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product: {
          id: item.product_id,
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          unit: item.unit,
          image: item.image || `/images/placeholder.jpg`
        }
      };

      console.log('Successfully updated cart item:', formattedItem);
      res.json(formattedItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ error: 'Failed to update cart item' });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      
      console.log('Removing from cart:', { userId, productId });

      // Get cart
      const [carts] = await pool.query(
        'SELECT cart_id FROM cart WHERE user_id = ?',
        [userId]
      );

      if (carts.length === 0) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      // Remove item
      await pool.query(
        'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
        [carts[0].cart_id, productId]
      );

      console.log('Successfully removed item from cart');
      res.json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
  }
};

module.exports = cartController;