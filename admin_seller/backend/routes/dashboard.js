const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require("multer");
const path = require("path");
const { broadcastUpdate, broadcastNewOrder } = require('../websocket');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Store files in "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Ensure "uploads" folder exists (run this once manually)
const fs = require("fs");
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

// Get Categories
router.get("/categories", (req, res) => {
  const query = "SELECT * FROM product_categories";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
    res.status(200).json(results);
  });
});

  // Update the "Add Product" route to handle images
  router.post("/products", upload.single("image"), (req, res) => {
    const { productName, unit, category, price, description, mrp, stock, shelflife } = req.body;
    const imageFile = req.file ? req.file.filename : null;
    const seller_id = 1; // For development, hardcoded seller_id

    if (!productName || !unit || !category || !price || !description || !mrp || !stock || !shelflife || !seller_id) {
      return res.status(400).json({ error: "All required fields are required" });
    }

    const getCategoryIdQuery = "SELECT category_id FROM product_categories WHERE name = ?";
    db.query(getCategoryIdQuery, [category], (err, results) => {
      if (err) {
        console.error("Error fetching category ID:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid category" });
      }

      const categoryId = results[0].category_id;

      const insertProductQuery = `
        INSERT INTO products (seller_id, name, product_detail, unit, price, mrp, stock, shelflife, category_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertProductQuery,
        [seller_id, productName, description, unit, price, mrp, stock, shelflife, categoryId],
        (err, result) => {
          if (err) {
            console.error("Error inserting product:", err);
            return res.status(500).json({ error: "Database error: " + err.message });
          }

          const productId = result.insertId;
          const imagePath = imageFile ? `/images/${imageFile}` : null;

          if (imagePath) {
            const insertImageQuery = `
              INSERT INTO product_images (product_id, image_url)
              VALUES (?, ?)
            `;
            db.query(insertImageQuery, [productId, imagePath], (err) => {
              if (err) {
                console.error("Error inserting image:", err);
                return res.status(500).json({ error: "Database error: " + err.message });
              }
              
              // Broadcast the update to all connected clients
              broadcastUpdate({
                type: 'PRODUCT_ADDED',
                data: {
                  id: productId,
                  name: productName,
                  price,
                  category,
                  image: imagePath,
                  unit,
                  description,
                  mrp,
                  stock,
                  shelflife
                }
              });
              
              res.status(201).json({ message: "Product added successfully", productId });
            });
          } else {
            // Broadcast the update to all connected clients
            broadcastUpdate({
              type: 'PRODUCT_ADDED',
              data: {
                id: productId,
                name: productName,
                price,
                category,
                image: null,
                unit,
                description,
                mrp,
                stock,
                shelflife
              }
            });
            
            res.status(201).json({ message: "Product added successfully", productId });
          }
        }
      );
    });
  });

// Function to emit notifications for new orders
const emitNewOrderNotification = (req, order) => {
  const io = req.app.get('io');
  if (!io) {
    console.error('Socket.io instance not found');
    return;
  }
  
  // Get the seller's socket ID from the connectedSellers map
  const sellerId = order.seller_id;
  const socketId = req.app.get('connectedSellers')?.get(sellerId);
  
  if (socketId) {
    console.log(`Emitting new order notification to seller ${sellerId} with socket ID ${socketId}`);
    io.to(socketId).emit('newOrder', {
      orderId: order.order_id,
      customer: order.customer_name,
      address: order.area,
      createdAt: order.created_at
    });
  } else {
    console.log(`Seller ${sellerId} not connected`);
  }
};

// Get all orders for a seller with product details
router.get("/seller-orders", (req, res) => {
  const { seller_id, address_id } = req.query;
  
  const query = `SELECT 
  o.order_id,
  o.user_id,
  o.address_id,
  o.status,
  o.payment_method,
  o.created_at,
  u.full_name AS customer_name,
  ua.area,
  GROUP_CONCAT(
    DISTINCT CONCAT(
      p.name, '|',
      oi.quantity, '|',
      oi.price, '|',
      (oi.quantity * oi.price)
    ) SEPARATOR ';;'
  ) AS product_details,
  GROUP_CONCAT(
    DISTINCT CONCAT(
      osh.new_status, '|',
      COALESCE(osh.changed_by, 'system'), '|',
      osh.timestamp
    ) ORDER BY osh.timestamp DESC SEPARATOR ';;'
  ) AS status_history,
  SUM(oi.quantity * oi.price) AS order_total
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN users u ON o.user_id = u.user_id
JOIN user_addresses ua ON o.address_id = ua.address_id
LEFT JOIN order_status_history osh ON o.order_id = osh.order_id
${address_id ? 'WHERE o.address_id = ?' : ''}
GROUP BY 
  o.order_id,
  o.user_id,
  o.address_id,
  o.status,
  o.payment_method,
  o.created_at,
  u.full_name,
  ua.area
HAVING SUM(CASE WHEN p.seller_id <> ? THEN 1 ELSE 0 END) = 0
ORDER BY o.created_at DESC;
  `;
  
  const params = address_id ? [seller_id, seller_id, address_id] : [seller_id, seller_id];
  
  console.log('Executing query:', query);
  console.log('With parameters:', params);
  
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }
    
    console.log('Query results:', results);
    
    // Process the results to format the product details and status history
    const ordersWithDetails = results.map(order => {
      // Process product details
      const products = order.product_details ? order.product_details.split(';;').map(product => {
        const [name, quantity, price, total] = product.split('|');
        return {
          name,
          quantity: parseInt(quantity),
          price: parseFloat(price),
          total: parseFloat(total)
        };
      }) : [];

      // Process status history
      const statusHistory = order.status_history ? order.status_history.split(';;').map(status => {
        const [newStatus, changedBy, timestamp] = status.split('|');
        return {
          status: newStatus,
          changed_by: changedBy,
          timestamp: new Date(timestamp)
        };
      }) : [];

      return {
        ...order,
        products,
        status_history: statusHistory,
        order_total: parseFloat(order.order_total).toFixed(2)
      };
    });
    
    // Emit notifications for new orders
    ordersWithDetails.forEach(order => {
      if (new Date(order.created_at) > new Date(Date.now() - 60000)) {
        broadcastNewOrder(order);
      }
    });
    
    res.json(ordersWithDetails);
  });
});

// Get all orders for a seller
router.get("/orders", (req, res) => {
  const { seller_id, address_id } = req.query;
  
  const query = `
    SELECT DISTINCT 
      o.*,
      u.full_name as customer_name,
      ua.area,
      GROUP_CONCAT(
        DISTINCT CONCAT(
          p.name, ' x ', oi.quantity, ' @ ₹', oi.price
        ) SEPARATOR ', '
      ) as product_details,
      GROUP_CONCAT(
        DISTINCT CONCAT(
          osh.new_status, '|',
          COALESCE(osh.changed_by, 'system'), '|',
          osh.timestamp
        ) ORDER BY osh.timestamp DESC
      ) as status_history,
      SUM(oi.quantity * oi.price) as order_total
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id AND p.seller_id = ?
    JOIN users u ON o.user_id = u.user_id
    JOIN user_addresses ua ON o.address_id = ua.address_id
    LEFT JOIN order_status_history osh ON o.order_id = osh.order_id
    WHERE o.status IN ('pending', 'ready')
    ${address_id ? 'AND o.address_id = ?' : ''}
    GROUP BY 
      o.order_id, 
      o.user_id, 
      o.address_id, 
      o.total, 
      o.status, 
      o.payment_method, 
      o.created_at, 
      u.full_name, 
      ua.area
    ORDER BY o.created_at DESC
  `;
  
  const params = [seller_id];
  if (address_id) {
    params.push(address_id);
  }
  
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.json(results);
  });
});

// Check for new orders since last check
router.get("/check-new-orders", (req, res) => {
  const { seller_id, last_check } = req.query;
  const lastCheckDate = new Date(last_check);
  
  const query = `
    SELECT DISTINCT o.*, u.full_name as customer_name, ua.area
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN users u ON o.user_id = u.user_id
    JOIN user_addresses ua ON o.address_id = ua.address_id
    WHERE p.seller_id = ?
    AND o.created_at > ?
    ORDER BY o.created_at DESC
  `;
  
  db.query(query, [seller_id, lastCheckDate], (err, results) => {
    if (err) {
      console.error("Error checking for new orders:", err);
      return res.status(500).json({ error: "Failed to check for new orders" });
    }
    
    // Emit notifications for new orders
    results.forEach(order => {
      emitNewOrderNotification(req, order);
    });
    
    res.json({ 
      newOrders: results.length > 0,
      orders: results
    });
  });
});

// Existing routes (unchanged)
router.get('/new-orders', (req, res) => {
  const { seller_id, address_id } = req.query;
    const query = `
      SELECT o.order_id AS id, u.full_name AS customer, ua.area AS address, 
          GROUP_CONCAT(p.name) AS details, o.created_at, o.total
      FROM (
        SELECT DISTINCT o.order_id, o.user_id, o.created_at, o.address_id, o.total
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.status = 'new' AND p.seller_id = ?
        ${address_id ? 'AND o.address_id = ?' : ''}
      ) o
      JOIN users u ON o.user_id = u.user_id
      JOIN user_addresses ua ON o.address_id = ua.address_id
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      GROUP BY o.order_id, u.full_name, ua.area, o.created_at, o.total;
    `;
  
  // Prepare query parameters
  const queryParams = [seller_id];
  if (address_id) {
    queryParams.push(address_id);
  }
  
  db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Error fetching new orders:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

  router.get('/pending-deliveries', (req, res) => {
  const { seller_id } = req.query;
    const query = `
      SELECT o.order_id AS id, u.full_name AS customer, ua.area AS address, 
          GROUP_CONCAT(p.name) AS details, o.status, o.created_at
      FROM (
        SELECT DISTINCT o.order_id, o.user_id, o.status, o.created_at, o.address_id
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.status IN ('pending', 'ready') AND p.seller_id = ?
      ) o
      JOIN users u ON o.user_id = u.user_id
      JOIN user_addresses ua ON o.address_id = ua.address_id
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      GROUP BY o.order_id, u.full_name, ua.area, o.status, o.created_at
      ORDER BY o.created_at DESC;
    `;
  db.query(query, [seller_id], (err, results) => {
      if (err) {
        console.error('Error fetching pending deliveries:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results.map(row => ({
        id: row.id,
        customer: row.customer,
        address: row.address,
        details: row.details,
        status: row.status,
      created_at: row.created_at
      })));
    });
  });

  router.get('/out-of-deliveries', (req, res) => {
  const { seller_id } = req.query;
    const query = `
    SELECT o.order_id AS id, u.full_name AS customer, ua.area AS address, 
          o.status, o.created_at
      FROM (
        SELECT DISTINCT o.order_id, o.user_id, o.status, o.created_at, o.address_id
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.status = 'Out For Delivery' AND p.seller_id = ?
      ) o
      JOIN users u ON o.user_id = u.user_id 
      JOIN user_addresses ua ON o.address_id = ua.address_id;
    `;
  db.query(query, [seller_id], (err, results) => {
      if (err) {
        console.error('Error fetching out of deliveries:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results.map(row => ({
        id: row.id,
        customer: row.customer,
        address: row.address,
        status: row.status,
      created_at: row.created_at
      })));
    });
  });

  router.get('/completed-deliveries', (req, res) => {
  const { seller_id } = req.query;
    const query = `
    SELECT o.order_id AS id, u.full_name AS customer, ua.area AS address, 
          o.status, o.created_at, o.total
      FROM (
        SELECT DISTINCT o.order_id, o.user_id, o.status, o.created_at, o.address_id, o.total
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.status = 'delivered' AND p.seller_id = ?
      ) o
      JOIN users u ON o.user_id = u.user_id
      JOIN user_addresses ua ON o.address_id = ua.address_id;
    `;
  db.query(query, [seller_id], (err, results) => {
      if (err) {
        console.error('Error fetching completed deliveries:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results.map(row => ({
        id: row.id,
        customer: row.customer,
        address: row.address,
        status: row.status,
        created_at: row.created_at,
        total: row.total
      })));
    });
  });

  router.get('/canceled-orders', (req, res) => {
    const { seller_id } = req.query;
    const query = `
      SELECT o.order_id AS id, u.full_name AS customer, ua.area AS address, 
            GROUP_CONCAT(p.name) AS details, o.status, o.created_at
      FROM (
        SELECT DISTINCT o.order_id, o.user_id, o.status, o.created_at, o.address_id
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.status = 'cancelled' AND p.seller_id = ?
      ) o
      JOIN users u ON o.user_id = u.user_id
      JOIN user_addresses ua ON o.address_id = ua.address_id
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      GROUP BY o.order_id, u.full_name, ua.area, o.status, o.created_at;
    `;
    db.query(query, [seller_id], (err, results) => {
      if (err) {
        console.error('Error fetching canceled orders:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results.map(row => ({
        id: row.id,
        customer: row.customer,
        address: row.address,
        details: row.details,
        status: row.status,
        created_at: row.created_at
      })));
    });
  });

  router.put('/complete-delivery/:orderId', (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const query = `
      UPDATE orders
      SET status = ?
      WHERE order_id = ?;
    `;
    db.query(query, [status, orderId], (err, result) => {
      if (err) {
        console.error('Error updating order status:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const historyQuery = `
        INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, timestamp)
        SELECT order_id, status, ?, 'seller', NOW()
        FROM orders
        WHERE order_id = ?;
      `;
      db.query(historyQuery, [status, orderId], (err) => {
        if (err) {
          console.error('Error logging status change:', err);
        }
        res.json({ message: 'Order status updated successfully' });
      });
    });
  });

  router.get('/order-details/:orderId', (req, res) => {
    const { orderId } = req.params;
    const { seller_id } = req.query;

    if (!seller_id) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    const query = `
      SELECT 
        o.order_id,
        o.status AS order_status,
        o.payment_method,
        o.total AS order_total,
        DATE_FORMAT(o.created_at, '%Y-%m-%d %H:%i:%s') AS order_date,
        u.full_name AS customer_name,
        ua.phone AS phone_number,
        CONCAT(
          COALESCE(ua.house_no, ''), 
          CASE WHEN ua.house_no IS NOT NULL THEN ', ' ELSE '' END,
          COALESCE(ua.building_name, ''),
          CASE WHEN ua.building_name IS NOT NULL THEN ', ' ELSE '' END,
          COALESCE(ua.area, ''),
          CASE WHEN ua.area IS NOT NULL THEN ', ' ELSE '' END,
          COALESCE(ua.landmark, '')
        ) AS delivery_address,
        GROUP_CONCAT(
          DISTINCT CONCAT(
            p.name, '|',
            p.product_detail, '|',
            pc.name, '|',
            COALESCE(psc.name, 'N/A'), '|',
            oi.quantity, '|',
            oi.price, '|',
            (oi.quantity * oi.price)
          ) SEPARATOR ';;'
        ) as product_details,
        GROUP_CONCAT(
          DISTINCT CONCAT(
            osh.new_status, '|',
            COALESCE(osh.changed_by, 'system'), '|',
            osh.timestamp
          ) ORDER BY osh.timestamp DESC SEPARATOR ';;'
        ) as status_history
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id AND p.seller_id = ?
      JOIN product_categories pc ON p.category_id = pc.category_id
      LEFT JOIN product_subcategories psc ON p.subcategory_id = psc.subcategory_id
      JOIN users u ON o.user_id = u.user_id
      LEFT JOIN user_addresses ua ON o.address_id = ua.address_id
      LEFT JOIN order_status_history osh ON o.order_id = osh.order_id
      WHERE o.order_id = ?
      GROUP BY 
        o.order_id,
        o.status,
        o.payment_method,
        o.total,
        o.created_at,
        u.full_name,
        ua.phone,
        ua.house_no,
        ua.building_name,
        ua.area,
        ua.landmark;
    `;

    console.log('Executing order details query:', query);
    console.log('With parameters:', [seller_id, orderId]);

    db.query(query, [seller_id, orderId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Order not found or does not belong to this seller' });
      }

      const order = results[0];
      
      try {
        // Process product details
        const products = order.product_details ? order.product_details.split(';;').map(product => {
          const [name, detail, category, subcategory, quantity, price, total] = product.split('|');
          return {
            name,
            description: detail,
            category,
            subcategory,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            total: parseFloat(total)
          };
        }) : [];

        // Process status history
        const statusHistory = order.status_history ? order.status_history.split(';;').map(status => {
          const [newStatus, changedBy, timestamp] = status.split('|');
          return {
            status: newStatus,
            changed_by: changedBy,
            timestamp: new Date(timestamp)
          };
        }) : [];

        // Format the response
        const formattedOrder = {
          order_id: order.order_id,
          order_date: order.order_date,
          order_status: order.order_status,
          payment_method: order.payment_method,
          order_total: parseFloat(order.order_total),
          customer_name: order.customer_name,
          phone_number: order.phone_number,
          delivery_address: order.delivery_address,
          products: products,
          status_history: statusHistory
        };

        console.log('Formatted order:', formattedOrder);
        res.json(formattedOrder);
      } catch (error) {
        console.error('Error processing order data:', error);
        res.status(500).json({ error: 'Error processing order data', details: error.message });
      }
    });
  });

  router.put('/update-order-status/:orderId', (req, res) => {
    const { orderId } = req.params;
    const { status, seller_id, delivery_person_id } = req.body;

    if (!seller_id) {
      return res.status(400).json({ error: 'Seller ID is required' });
    }

    const validStatuses = ['new', 'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled', 'Out For delivery'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // First, check if the order exists and belongs to the seller
    const checkQuery = `
      SELECT o.order_id, o.status
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      WHERE o.order_id = ? AND p.seller_id = ?
      LIMIT 1;
    `;

    db.query(checkQuery, [orderId, seller_id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Order not found or does not belong to this seller' });
      }

      // If status is 'Out For delivery', require delivery_person_id
      if (status === 'Out For delivery' && !delivery_person_id) {
        return res.status(400).json({ error: 'Delivery person ID is required for out for delivery status' });
      }

      // Update order status
      const updateOrderQuery = `
        UPDATE orders
        SET status = ?
        WHERE order_id = ?;
      `;

      db.query(updateOrderQuery, [status, orderId], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Log the status change
        const historyQuery = `
          INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, timestamp)
          VALUES (?, ?, ?, 'seller', NOW());
        `;

        db.query(historyQuery, [orderId, results[0].status, status], (err) => {
          if (err) {
            console.error('Error logging status change:', err);
          }

          // If delivery person is assigned, update the order_delivery table
          if (delivery_person_id) {
            // Check if a record already exists in order_delivery
            const checkDeliveryQuery = `
              SELECT delivery_id FROM order_delivery WHERE order_id = ?
            `;
            
            db.query(checkDeliveryQuery, [orderId], (err, deliveryResults) => {
              if (err) {
                console.error('Error checking delivery record:', err);
                return res.status(500).json({ error: 'Internal server error' });
              }
              
              if (deliveryResults.length > 0) {
                // Update existing record
                const updateDeliveryQuery = `
                  UPDATE order_delivery 
                  SET agent_id = ?, pickup_time = NOW()
                  WHERE order_id = ?;
                `;
                
                db.query(updateDeliveryQuery, [delivery_person_id, orderId], (err) => {
                  if (err) {
                    console.error('Error updating delivery record:', err);
                  }
                  
                  // Update delivery person status to busy
                  const updateAgentStatusQuery = `
                    UPDATE delivery_agents 
                    SET status = 'busy'
                    WHERE agent_id = ?;
                  `;
                  
                  db.query(updateAgentStatusQuery, [delivery_person_id], (err) => {
                    if (err) {
                      console.error('Error updating delivery agent status:', err);
                    }
                    res.json({ message: 'Order status updated successfully' });
                  });
                });
              } else {
                // Insert new record
                const insertDeliveryQuery = `
                  INSERT INTO order_delivery (order_id, agent_id, pickup_time)
                  VALUES (?, ?, NOW());
                `;
                
                db.query(insertDeliveryQuery, [orderId, delivery_person_id], (err) => {
                  if (err) {
                    console.error('Error inserting delivery record:', err);
                  }
                  
                  // Update delivery person status to busy
                  const updateAgentStatusQuery = `
                    UPDATE delivery_agents 
                    SET status = 'busy'
                    WHERE agent_id = ?;
                  `;
                  
                  db.query(updateAgentStatusQuery, [delivery_person_id], (err) => {
                    if (err) {
                      console.error('Error updating delivery agent status:', err);
                    }
                    res.json({ message: 'Order status updated successfully' });
                  });
                });
              }
            });
          } else {
            res.json({ message: 'Order status updated successfully' });
          }
        });
      });
    });
  });

  // New Product Management Routes

  // Get all products
  router.get('/products', (req, res) => {
    const { seller_id } = req.query;
    if (!seller_id) {
      return res.status(400).json({ error: 'Seller ID is required' });
    }

    const query = `
      SELECT 
        p.product_id AS id,
        p.name,
        p.price,
        p.product_detail AS description,
        pc.name AS category,
        psc.name AS subcategory,
        p.stock,
        p.mrp,
        p.unit,
        p.shelflife,
        pi.image_url AS image
      FROM products p
      JOIN product_categories pc ON p.category_id = pc.category_id
      LEFT JOIN product_subcategories psc ON p.subcategory_id = psc.subcategory_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id
      WHERE p.seller_id = ?
      ORDER BY p.product_id DESC;
    `;
    
    db.query(query, [seller_id], (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

  router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
  
    const query = `
      SELECT 
        p.product_id AS id,
        p.name,
        p.unit,
        p.price,
        p.mrp,
        p.stock,
        p.shelflife,
        p.product_detail AS description,
        p.seller_id,
        pi.image_url,
        pc.name AS category,
        psc.name AS subcategory
      FROM products p
      JOIN product_categories pc ON p.category_id = pc.category_id
      LEFT JOIN product_subcategories psc ON p.subcategory_id = psc.subcategory_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id
      WHERE p.product_id = ?;
    `;
    db.query(query, [productId], (err, results) => {
      if (err) {
        console.error('Error fetching product details:', err);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(results[0]);
    });
  });

  // Add a new product
  router.post('/products', (req, res) => {
    const { name, price, product_detail, category_id, subcategory_id } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ error: 'Name, price, and category_id are required' });
    }

    const query = `
      INSERT INTO products (name, price, product_detail, category_id, subcategory_id)
      VALUES (?, ?, ?, ?, ?);
    `;
    db.query(query, [name, price, product_detail || '', category_id, subcategory_id || null], (err, result) => {
      if (err) {
        console.error('Error adding product:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Product added successfully', id: result.insertId });
    });
  });

  router.put("/products/:productId", upload.single("image"), (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, unit, category, price, description, mrp, stock, shelflife, seller_id } = req.body;

        console.log("Received Data:", req.body);  // Debugging log

        // Check if all required fields are present
        if (!productName || !unit || !category || !price || !description || !mrp || !stock || !shelflife || !seller_id) {
            return res.status(400).json({ error: "All required fields are required" });
        }

        // Fetch category_id based on category name
        const getCategoryIdQuery = "SELECT category_id FROM product_categories WHERE name = ?";
        db.query(getCategoryIdQuery, [category], (err, results) => {
            if (err) {
                console.error("Error fetching category ID:", err);
                return res.status(500).json({ error: "Database error fetching category ID", details: err.message });
            }
            if (results.length === 0) {
                return res.status(400).json({ error: "Invalid category" });
            }

            const categoryId = results[0].category_id;

            // Update the product
            const updateProductQuery = `
                UPDATE products
                SET name = ?, product_detail = ?, unit = ?, price = ?, mrp = ?, stock = ?, shelflife = ?, category_id = ?, seller_id = ?
                WHERE product_id = ?;
            `;

            db.query(updateProductQuery, [productName, description, unit, price, mrp, stock, shelflife, categoryId, seller_id, productId], (err, result) => {
                if (err) {
                    console.error("Error updating product:", err);
                    return res.status(500).json({ error: "Database error updating product", details: err.message });
                }

                // Update product image if a new one is uploaded
                if (req.file) {
                    const imagePath = `/images/${req.file.filename}`;
                    const updateImageQuery = `
                        UPDATE product_images
                        SET image_url = ?
                        WHERE product_id = ?;
                    `;

                    db.query(updateImageQuery, [imagePath, productId], (err) => {
                        if (err) {
                            console.error("Error updating image:", err);
                            return res.status(500).json({ error: "Database error updating image", details: err.message });
                        }
                        // Broadcast the update to all connected clients
                        broadcastUpdate({
                          type: 'PRODUCT_UPDATED',
                          data: {
                            productId,
                            productName,
                            price,
                            category,
                            image: imagePath
                          }
                        });
                    });
                } else {
                    // Broadcast the update to all connected clients
                    broadcastUpdate({
                      type: 'PRODUCT_UPDATED',
                      data: {
                        productId,
                        productName,
                        price,
                        category,
                        image: null
                      }
                    });
                }
                res.status(200).json({ message: "Product updated successfully" });
            });
        });
    } catch (error) {
        console.error("Error in update product route:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

  router.delete("/products/:productId", (req, res) => {
    const { productId } = req.params;
    const deleteQuery = "DELETE FROM products WHERE product_id = ?";
    
    db.query(deleteQuery, [productId], (err, result) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: "Database error deleting product" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        // Broadcast the update to all connected clients
        broadcastUpdate({
          type: 'PRODUCT_DELETED',
          data: { productId }
        });
        res.status(200).json({ message: "Product deleted successfully" });
    });
});

// Get all users
router.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Update user status
router.put("/users/:id/status", (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;
  
  const query = "UPDATE users SET status = ? WHERE user_id = ?";
  db.query(query, [status, userId], (err, result) => {
    if (err) {
      console.error("Error updating user status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ message: "User status updated successfully" });
  });
});

// Get all shopkeepers
router.get("/shopkeepers", (req, res) => {
  const query = "SELECT * FROM sellers";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to fetch shopkeepers" });
    }
    res.status(200).json(results);
  });
});

// Update shopkeeper status
router.put("/shopkeepers/:id", (req, res) => {
  const { id } = req.params;
  const { is_approved } = req.body;
  
  console.log(`Updating shopkeeper ${id} status. is_approved: ${is_approved}`);
  
  // If approving, set is_approved=1 and is_rejected=0
  // If rejecting, set is_approved=0 and is_rejected=1
  const query = is_approved 
    ? "UPDATE sellers SET is_approved = 1, is_rejected = 0 WHERE seller_id = ?"
    : "UPDATE sellers SET is_approved = 0, is_rejected = 1 WHERE seller_id = ?";
    
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error updating shopkeeper status:", err);
      return res.status(500).json({ error: "Failed to update shopkeeper status" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Shopkeeper not found" });
    }
    
    // Log the admin action
    const action = is_approved ? "approved" : "rejected";
    const logQuery = "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'seller', ?)";
    db.query(logQuery, [1, `Shopkeeper ${action}: ID ${id}`, id], (err) => {
      if (err) {
        console.error("Error logging admin action:", err);
      }
      res.json({ message: `Shopkeeper ${action} successfully` });
    });
  });
});

// Get shopkeeper details
router.get("/shopkeepers/:id", (req, res) => {
  const sellerId = req.params.id;
  
  const query = `
    SELECT 
      s.seller_id,
      s.store_name,
      s.email,
      s.phone,
      s.store_category,
      s.store_address,
      s.fssai_license,
      s.is_approved,
      s.is_rejected,
      sd.gst_certificate,
      sd.bank_proof,
      sd.business_address,
      sb.account_holder,
      sb.account_number,
      sb.ifsc_code,
      sb.bank_name,
      se.amount as total_earnings,
      se.settlement_date,
      COUNT(DISTINCT p.product_id) as total_products,
      COUNT(DISTINCT o.order_id) as total_orders
    FROM sellers s
    LEFT JOIN seller_documents sd ON s.seller_id = sd.seller_id
    LEFT JOIN seller_bank_details sb ON s.seller_id = sb.seller_id
    LEFT JOIN seller_earnings se ON s.seller_id = se.seller_id
    LEFT JOIN products p ON s.seller_id = p.seller_id
    LEFT JOIN order_items oi ON p.product_id = oi.product_id
    LEFT JOIN orders o ON oi.order_id = o.order_id
    WHERE s.seller_id = ?
    GROUP BY 
      s.seller_id,
      s.store_name,
      s.email,
      s.phone,
      s.store_category,
      s.store_address,
      s.fssai_license,
      s.is_approved,
      s.is_rejected,
      sd.gst_certificate,
      sd.bank_proof,
      sd.business_address,
      sb.account_holder,
      sb.account_number,
      sb.ifsc_code,
      sb.bank_name,
      se.amount,
      se.settlement_date
  `;
  
  db.query(query, [sellerId], (err, results) => {
    if (err) {
      console.error("Error fetching seller details:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }
    
    res.json(results[0]);
  });
});

// Get shopkeeper requests
router.get("/shopkeeper-requests", (req, res) => {
  console.log("Fetching shopkeeper requests...");
  const query = `
    SELECT 
      s.seller_id as id,
      s.store_name as store,
      s.phone,
      s.is_approved as status,
      s.email,
      s.store_category,
      s.store_address
    FROM sellers s
    WHERE s.is_approved = 0 AND s.is_rejected = 0
    ORDER BY s.seller_id DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error in shopkeeper requests:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.message,
        code: err.code,
        sqlState: err.sqlState
      });
    }
    console.log(`Found ${results.length} pending shopkeeper requests`);
    res.json(results);
  });
});

// Handle shopkeeper request actions
router.post("/shopkeeper-requests/:id/:action", (req, res) => {
  const { id, action } = req.params;
  console.log(`Processing shopkeeper ${action} request for ID: ${id}`);
  
  if (!['approve', 'reject'].includes(action)) {
    console.log(`Invalid action: ${action}`);
    return res.status(400).json({ error: "Invalid action" });
  }

  // First, check if the seller exists and is pending
  const checkQuery = "SELECT * FROM sellers WHERE seller_id = ? AND is_approved = 0 AND is_rejected = 0";
  console.log(`Checking seller with query: ${checkQuery}`);
  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length === 0) {
      console.log(`No pending seller found with ID: ${id}`);
      return res.status(404).json({ error: "Seller not found or already processed" });
    }

    console.log(`Found seller: ${JSON.stringify(results[0])}`);

    // Update the seller status
    let updateQuery;
    if (action === 'approve') {
      updateQuery = "UPDATE sellers SET is_approved = 1, is_rejected = 0 WHERE seller_id = ?";
    } else {
      // For reject, we'll update the status and delete related data
      updateQuery = "UPDATE sellers SET is_rejected = 1, is_approved = 0 WHERE seller_id = ?";
      console.log(`Executing reject action for seller ${id}`);
      
      // Delete related data
      const deleteQueries = [
        "DELETE FROM seller_earnings WHERE seller_id = ?",
        "DELETE FROM seller_documents WHERE seller_id = ?",
        "DELETE FROM seller_bank_details WHERE seller_id = ?",
        "DELETE FROM seller_schedule WHERE seller_id = ?",
        "DELETE FROM seller_notifications WHERE seller_id = ?",
        "DELETE FROM product_images WHERE product_id IN (SELECT product_id FROM products WHERE seller_id = ?)",
        "DELETE FROM products WHERE seller_id = ?"
      ];

      // Execute delete queries
      deleteQueries.forEach(query => {
        console.log(`Executing delete query: ${query}`);
        db.query(query, [id], (err) => {
          if (err) {
            console.error(`Error executing query ${query}:`, err);
          } else {
            console.log(`Successfully executed query: ${query}`);
          }
        });
      });
    }

    console.log(`Executing update query: ${updateQuery}`);
    db.query(updateQuery, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (result.affectedRows === 0) {
        console.log(`No rows affected by update query for seller ${id}`);
        return res.status(404).json({ error: "Failed to update seller status" });
      }

      console.log(`Successfully updated seller ${id} status`);

      // Log the admin action
      const logQuery = "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'seller', ?)";
      db.query(logQuery, [1, `Seller ${action}ed: ${results[0].store_name}`, id], (err) => {
        if (err) {
          console.error("Error logging admin action:", err);
        } else {
          console.log(`Successfully logged admin action for seller ${id}`);
        }
    res.json({ message: `Seller ${action}ed successfully` });
      });
    });
  });
});

// Reject shopkeeper request and delete data
router.post('/dashboard/shopkeeper-requests/:id/reject', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Start a transaction
    await db.beginTransaction();

    // Get seller details before deletion
    const getSellerQuery = "SELECT * FROM sellers WHERE seller_id = ?";
    const [seller] = await db.query(getSellerQuery, [id]);
    
    if (!seller) {
      await db.rollback();
      return res.status(404).json({ error: "Seller not found" });
    }

    // Delete related data in the correct order
    await db.query("DELETE FROM seller_earnings WHERE seller_id = ?", [id]);
    await db.query("DELETE FROM seller_documents WHERE seller_id = ?", [id]);
    await db.query("DELETE FROM seller_bank_details WHERE seller_id = ?", [id]);
    await db.query("DELETE FROM seller_schedule WHERE seller_id = ?", [id]);
    await db.query("DELETE FROM seller_notifications WHERE seller_id = ?", [id]);
    
    // Delete products and related data
    await db.query("DELETE FROM product_images WHERE product_id IN (SELECT product_id FROM products WHERE seller_id = ?)", [id]);
    await db.query("DELETE FROM products WHERE seller_id = ?", [id]);
    
    // Finally delete the seller
    await db.query("DELETE FROM sellers WHERE seller_id = ?", [id]);

    // Log the admin action
    await db.query(
      "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'seller', ?)",
      [req.user.admin_id, `Rejected and deleted seller data for ${seller.store_name}`, id]
    );

    await db.commit();
    res.json({ message: "Seller data deleted successfully" });
  } catch (err) {
    await db.rollback();
    console.error("Error deleting seller data:", err);
    res.status(500).json({ error: "Failed to delete seller data" });
  }
});

// Get all delivery agents (for ManageDelivery component)
router.get("/delivery-agents", (req, res) => {
  console.log("Fetching all delivery agents...");
  const query = `
    SELECT 
      agent_id as id,
      name,
      vehicle_type as vehicle,
      license_number as license,
      is_approved,
      is_rejected,
      status
    FROM delivery_agents
    ORDER BY agent_id DESC;
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error in delivery agents:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.message,
        code: err.code,
        sqlState: err.sqlState
      });
    }
    console.log(`Found ${results.length} delivery agents`);
    res.json(results);
  });
});

// Get pending delivery agents (for dashboard)
router.get("/delivery-requests", (req, res) => {
  console.log("Fetching pending delivery agents...");
  const query = `
    SELECT 
      agent_id as id,
      name,
      vehicle_type as vehicle,
      license_number as license,
      is_approved,
      is_rejected,
      status
    FROM delivery_agents
    WHERE is_approved = 0 AND is_rejected = 0
    ORDER BY agent_id DESC;
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error in delivery agents:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.message,
        code: err.code,
        sqlState: err.sqlState
      });
    }
    console.log(`Found ${results.length} pending delivery agents`);
    res.json(results);
  });
});

// Get delivery agent details
router.get("/delivery-requests/:id", (req, res) => {
  const agentId = req.params.id;
  
  const query = `
    SELECT 
      -- Basic Information from delivery_agents
      d.agent_id,
      d.name,
      d.vehicle_type,
      d.license_number,
      d.status,
      d.is_approved,
      d.is_rejected,

      -- Earnings Information
      de.earning_id,
      de.amount as total_earnings,
      de.paid_date,
      COUNT(DISTINCT de.order_id) as total_earnings_orders,

      -- Delivery Statistics
      COUNT(DISTINCT od.order_id) as total_deliveries,
      COUNT(DISTINCT CASE WHEN o.status = 'delivered' THEN o.order_id END) as completed_deliveries,
      COUNT(DISTINCT CASE WHEN o.status = 'Out For delivery' THEN o.order_id END) as active_deliveries,
      MIN(od.pickup_time) as first_delivery_date,
      MAX(od.delivery_time) as last_delivery_date,
      AVG(TIMESTAMPDIFF(MINUTE, od.pickup_time, od.delivery_time)) as avg_delivery_time_minutes,

      -- Order Details
      COUNT(DISTINCT o.order_id) as total_orders,
      SUM(o.total) as total_order_value,
      AVG(o.total) as avg_order_value,
      COUNT(DISTINCT CASE WHEN o.payment_method = 'online' THEN o.order_id END) as online_payments,
      COUNT(DISTINCT CASE WHEN o.payment_method = 'cod' THEN o.order_id END) as cod_payments,

      -- Location Data
      COUNT(DISTINCT dl.location_id) as total_locations_tracked,
      AVG(dl.accuracy) as avg_location_accuracy,

      -- Recent Activity
      MAX(o.created_at) as last_order_date,
      MAX(od.delivery_time) as last_delivery_time,

      -- Performance Metrics
      COUNT(DISTINCT CASE WHEN o.status = 'cancelled' THEN o.order_id END) as cancelled_deliveries,
      COUNT(DISTINCT CASE WHEN o.status = 'delivered' THEN o.order_id END) / 
        NULLIF(COUNT(DISTINCT o.order_id), 0) * 100 as delivery_success_rate
    FROM delivery_agents d
    LEFT JOIN delivery_earnings de ON d.agent_id = de.agent_id
    LEFT JOIN order_delivery od ON d.agent_id = od.agent_id
    LEFT JOIN orders o ON od.order_id = o.order_id
    LEFT JOIN delivery_locations dl ON o.order_id = dl.order_id
    WHERE d.agent_id = ?
    GROUP BY 
      d.agent_id,
      d.name,
      d.vehicle_type,
      d.license_number,
      d.status,
      d.is_approved,
      d.is_rejected,
      de.earning_id,
      de.amount,
      de.paid_date
  `;
  
  db.query(query, [agentId], (err, results) => {
    if (err) {
      console.error("Error fetching delivery agent details:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Delivery agent not found" });
    }
    
    res.json(results[0]);
  });
});

// Handle delivery request actions
router.post("/delivery-requests/:id/:action", (req, res) => {
  const { id, action } = req.params;
  console.log(`Processing delivery agent ${action} request for ID: ${id}`);
  
  if (!['approve', 'reject'].includes(action)) {
    console.log(`Invalid action: ${action}`);
    return res.status(400).json({ error: "Invalid action" });
  }

  // First, check if the delivery agent exists
  const checkQuery = "SELECT * FROM delivery_agents WHERE agent_id = ?";
  console.log(`Checking delivery agent with query: ${checkQuery}`);
  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length === 0) {
      console.log(`No delivery agent found with ID: ${id}`);
      return res.status(404).json({ error: "Delivery agent not found" });
    }

    console.log(`Found delivery agent: ${JSON.stringify(results[0])}`);

    // Update the delivery agent status
    let updateQuery;
    if (action === 'approve') {
      updateQuery = "UPDATE delivery_agents SET status = 'available', is_approved = 1, is_rejected = 0 WHERE agent_id = ?";
    } else {
      updateQuery = "UPDATE delivery_agents SET status = 'offline', is_rejected = 1, is_approved = 0 WHERE agent_id = ?";
    }
    
    console.log(`Executing update query: ${updateQuery}`);
    db.query(updateQuery, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to update delivery agent status" });
    }
    
    if (result.affectedRows === 0) {
        console.log(`No rows affected by update query for delivery agent ${id}`);
        return res.status(404).json({ error: "Failed to update delivery agent status" });
      }

      console.log(`Successfully updated delivery agent ${id} status`);

      // Log the admin action
      const logQuery = "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'user', ?)";
      db.query(logQuery, [1, `Delivery agent ${action}ed: ${results[0].name}`, id], (err) => {
        if (err) {
          console.error("Error logging admin action:", err);
        } else {
          console.log(`Successfully logged admin action for delivery agent ${id}`);
        }
    res.status(200).json({ message: `Delivery agent ${action}ed successfully` });
      });
    });
  });
});

// Reject delivery person request and delete data
router.post('/dashboard/delivery-requests/:id/reject', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Start a transaction
    await db.beginTransaction();

    // Get delivery agent details before deletion
    const getAgentQuery = "SELECT * FROM delivery_agents WHERE agent_id = ?";
    const [agent] = await db.query(getAgentQuery, [id]);
    
    if (!agent) {
      await db.rollback();
      return res.status(404).json({ error: "Delivery agent not found" });
    }

    // Delete related data
    await db.query("DELETE FROM delivery_earnings WHERE agent_id = ?", [id]);
    await db.query("DELETE FROM delivery_locations WHERE order_id IN (SELECT order_id FROM order_delivery WHERE agent_id = ?)", [id]);
    await db.query("DELETE FROM order_delivery WHERE agent_id = ?", [id]);
    
    // Finally delete the delivery agent
    await db.query("DELETE FROM delivery_agents WHERE agent_id = ?", [id]);

    // Log the admin action
    await db.query(
      "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'user', ?)",
      [req.user.admin_id, `Rejected and deleted delivery agent data for ${agent.name}`, id]
    );

    await db.commit();
    res.json({ message: "Delivery agent data deleted successfully" });
  } catch (err) {
    await db.rollback();
    console.error("Error deleting delivery agent data:", err);
    res.status(500).json({ error: "Failed to delete delivery agent data" });
  }
});

// Update delivery agent status
router.put("/delivery-agents/:id", (req, res) => {
  const { id } = req.params;
  const { is_approved } = req.body;
  
  console.log(`Updating delivery agent ${id} status. is_approved: ${is_approved}`);
  
  // If approving, set is_approved=1, is_rejected=0, and status='available'
  // If rejecting, set is_approved=0, is_rejected=1, and status='offline'
  const query = is_approved 
    ? "UPDATE delivery_agents SET is_approved = 1, is_rejected = 0, status = 'available' WHERE agent_id = ?"
    : "UPDATE delivery_agents SET is_approved = 0, is_rejected = 1, status = 'offline' WHERE agent_id = ?";
    
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error updating delivery agent status:", err);
      return res.status(500).json({ error: "Failed to update delivery agent status" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Delivery agent not found" });
    }

    // Log the admin action
    const action = is_approved ? "approved" : "rejected";
    const logQuery = "INSERT INTO admin_actions (admin_id, description, target_type, target_id) VALUES (?, ?, 'user', ?)";
    db.query(logQuery, [1, `Delivery agent ${action}: ID ${id}`, id], (err) => {
      if (err) {
        console.error("Error logging admin action:", err);
      }
      res.json({ message: `Delivery agent ${action} successfully` });
    });
  });
});

// Get delivery agent earnings
router.get("/delivery-requests/:id/earnings", (req, res) => {
  const agentId = req.params.id;
  
  const query = `
    SELECT 
      de.*,
      o.order_id,
      o.created_at as delivery_date
    FROM delivery_earnings de
    JOIN orders o ON de.order_id = o.order_id
    WHERE de.agent_id = ?
    ORDER BY de.settlement_date DESC
  `;
  
  db.query(query, [agentId], (err, results) => {
    if (err) {
      console.error("Error fetching delivery agent earnings:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    res.json(results);
  });
});

// Test database connection
router.get("/test-connection", (req, res) => {
  console.log("Testing database connection...");
  db.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Database connection test failed:", err);
      return res.status(500).json({ 
        error: "Database connection failed",
        details: err.message,
        code: err.code,
        sqlState: err.sqlState
      });
    }
    console.log("Database connection test successful");
    res.json({ message: "Database connection successful", results });
  });
});

// Get addresses for a seller
router.get("/addresses", (req, res) => {
  const { seller_id } = req.query;
  const query = `
    SELECT DISTINCT ua.address_id, ua.area
    FROM (
      SELECT DISTINCT o.address_id
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      WHERE p.seller_id = ?
    ) o
    JOIN user_addresses ua ON o.address_id = ua.address_id
    ORDER BY ua.area
  `;

  db.query(query, [seller_id], (err, results) => {
    if (err) {
      console.error("Error fetching addresses:", err);
      return res.status(500).json({ error: "Failed to fetch addresses" });
    }
    res.json(results);
  });
});

// Test route to manually trigger a notification
router.get("/test-notification", (req, res) => {
  const { seller_id } = req.query;
  
  if (!seller_id) {
    return res.status(400).json({ error: "Seller ID is required" });
  }
  
  const testOrder = {
    order_id: "TEST-" + Date.now(),
    seller_id: seller_id,
    customer_name: "Test Customer",
    area: "Test Area",
    created_at: new Date()
  };
  
  emitNewOrderNotification(req, testOrder);
  
  res.json({ message: "Test notification sent" });
});

// Get seller earnings
router.get("/earnings", (req, res) => {
  const { seller_id, address_id } = req.query;
  
  console.log('Fetching earnings for seller:', seller_id, 'address:', address_id);
  
  // Base query for earnings using seller_earnings table
  const baseQuery = `
    SELECT 
      se.order_id,
      o.created_at,
      COUNT(oi.order_item_id) as items_count,
      COALESCE(SUM(oi.quantity * oi.price), 0) as total_amount,
      COALESCE(SUM(oi.quantity * oi.price * 0.1), 0) as commission,
      se.amount as net_earnings
    FROM seller_earnings se
    JOIN orders o ON se.order_id = o.order_id
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE se.seller_id = ?
    ${address_id ? 'AND o.address_id = ?' : ''}
    GROUP BY se.order_id, o.created_at, se.amount
    ORDER BY o.created_at DESC
  `;
  
  const params = address_id ? [seller_id, address_id] : [seller_id];
  
  console.log('Executing query:', baseQuery);
  console.log('With params:', params);
  
  // First, let's check if the seller exists
  db.query('SELECT seller_id FROM sellers WHERE seller_id = ?', [seller_id], (err, sellerResults) => {
    if (err) {
      console.error("Error checking seller:", err);
      return res.status(500).json({ error: "Failed to check seller" });
    }

    if (sellerResults.length === 0) {
      console.log('No seller found with ID:', seller_id);
      return res.json({ 
        earnings: [], 
        summary: {
          totalEarnings: 0,
          todayEarnings: 0,
          weekEarnings: 0,
          monthEarnings: 0
        }
      });
    }

    // Now fetch the earnings
  db.query(baseQuery, params, (err, earnings) => {
    if (err) {
      console.error("Error fetching earnings:", err);
      return res.status(500).json({ error: "Failed to fetch earnings" });
    }
      
      console.log('Found earnings:', earnings);
    
    // Calculate summary statistics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const summary = {
        totalEarnings: earnings.reduce((sum, earning) => sum + Number(earning.net_earnings || 0), 0),
      todayEarnings: earnings
        .filter(earning => new Date(earning.created_at) >= today)
          .reduce((sum, earning) => sum + Number(earning.net_earnings || 0), 0),
      weekEarnings: earnings
        .filter(earning => new Date(earning.created_at) >= oneWeekAgo)
          .reduce((sum, earning) => sum + Number(earning.net_earnings || 0), 0),
      monthEarnings: earnings
        .filter(earning => new Date(earning.created_at) >= oneMonthAgo)
          .reduce((sum, earning) => sum + Number(earning.net_earnings || 0), 0)
    };
      
      console.log('Calculated summary:', summary);
    
    res.json({ earnings, summary });
    });
  });
});

// Debug route to check order status
router.get('/check-order-status/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { seller_id } = req.query;

  if (!seller_id) {
    return res.status(400).json({ error: 'Seller ID is required' });
  }

  const query = `
    SELECT o.order_id, o.status, p.seller_id
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE o.order_id = ? AND p.seller_id = ?
    LIMIT 1;
  `;

  db.query(query, [orderId, seller_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Order not found or does not belong to this seller' });
    }

    res.json(results[0]);
  });
});

// Get canceled orders
router.get("/canceled-orders", async (req, res) => {
  try {
    const { seller_id } = req.query;
    console.log('Fetching canceled orders for seller_id:', seller_id);
    
    const query = `
      SELECT DISTINCT
        o.order_id,
        o.total,
        o.status,
        o.created_at,
        u.full_name,
        u.email,
        ua.name as delivery_name,
        ua.phone as delivery_phone,
        ua.house_no,
        ua.building_name,
        ua.street,
        ua.area,
        ua.city,
        ua.state,
        ua.pincode,
        ua.landmark,
        ua.address_type,
        p.seller_id,
        GROUP_CONCAT(DISTINCT p.name) as product_names
      FROM 
        orders o
        INNER JOIN users u ON o.user_id = u.user_id
        INNER JOIN user_addresses ua ON o.address_id = ua.address_id
        INNER JOIN order_items oi ON o.order_id = oi.order_id
        INNER JOIN products p ON oi.product_id = p.product_id
      WHERE 
        p.seller_id = ?
        AND o.status = 'cancelled'
      GROUP BY 
        o.order_id, o.total, o.status, o.created_at, u.full_name, u.email,
        ua.name, ua.phone, ua.house_no, ua.building_name, ua.street,
        ua.area, ua.city, ua.state, ua.pincode, ua.landmark, ua.address_type,
        p.seller_id
      ORDER BY 
        o.created_at DESC;
    `;

    const [orders] = await db.query(query, [seller_id]);
    
    console.log('Query executed with seller_id:', seller_id);
    console.log('Number of canceled orders found:', orders.length);

    if (!orders || orders.length === 0) {
      console.log('No canceled orders found for seller_id:', seller_id);
      return res.json([]);
    }

    res.json(orders);
  } catch (error) {
    console.error('Error fetching canceled orders:', error);
    res.status(500).json({ error: 'Failed to fetch canceled orders' });
  }
});

// Get available delivery persons
router.get('/available-delivery-persons', (req, res) => {
  const query = `
    SELECT 
      da.agent_id as id,
      da.name,
      da.vehicle_type as vehicle,
      da.license_number as license,
      da.status,
      da.mobilenumber as phone,
      da.email
    FROM delivery_agents da
    WHERE da.is_approved = 1 
    AND (da.status = 'available' OR da.status IS NULL)
    AND da.is_rejected = 0
    ORDER BY da.name;
  `;
  
  console.log('Executing query for available delivery persons');
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error in fetching available delivery persons:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.message
      });
    }
    console.log("Available delivery persons:", results);
    res.json(results);
  });
});

// 1. Total Revenue for Seller
router.get('/total-revenue', (req, res) => {
  const { seller_id } = req.query;
  if (!seller_id) return res.status(400).json({ error: 'seller_id is required' });
  const query = `
    SELECT COALESCE(SUM(o.total), 0) AS total_revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE p.seller_id = ? AND o.status = 'delivered'
  `;
  db.query(query, [seller_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    res.json({ total_revenue: results[0].total_revenue });
  });
});

// 2. Sales by Category for Seller
router.get('/category-sales', (req, res) => {
  const { seller_id } = req.query;
  if (!seller_id) return res.status(400).json({ error: 'seller_id is required' });
  const query = `
    SELECT pc.name AS category, COALESCE(SUM(oi.quantity * oi.price), 0) AS total_sales
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN product_categories pc ON p.category_id = pc.category_id
    WHERE p.seller_id = ? AND o.status = 'delivered'
    GROUP BY pc.category_id
    ORDER BY total_sales DESC
  `;
  db.query(query, [seller_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    res.json(results);
  });
});

// 3. Recent Orders for Seller
router.get('/recent-orders', (req, res) => {
  const { seller_id, limit = 5 } = req.query;
  if (!seller_id) return res.status(400).json({ error: 'seller_id is required' });
  const query = `
    SELECT o.order_id, o.created_at, o.status, o.total, u.full_name AS customer_name
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN users u ON o.user_id = u.user_id
    WHERE p.seller_id = ?
    GROUP BY o.order_id
    ORDER BY o.created_at DESC
    LIMIT ?
  `;
  db.query(query, [seller_id, parseInt(limit)], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    res.json(results);
  });
});

// 4. Top Selling Products for Seller
router.get('/top-products', (req, res) => {
  const { seller_id, limit = 5 } = req.query;
  if (!seller_id) return res.status(400).json({ error: 'seller_id is required' });
  const query = `
    SELECT p.product_id, p.name, pc.name AS category, pi.image_url AS image, SUM(oi.quantity) AS total_sold, SUM(oi.quantity * oi.price) AS revenue
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
    JOIN product_categories pc ON p.category_id = pc.category_id
    LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
    JOIN orders o ON oi.order_id = o.order_id
    WHERE p.seller_id = ? AND o.status = 'delivered'
    GROUP BY p.product_id
    ORDER BY total_sold DESC, revenue DESC
    LIMIT ?
  `;
  db.query(query, [seller_id, parseInt(limit)], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });
    res.json(results);
  });
});

module.exports = router;