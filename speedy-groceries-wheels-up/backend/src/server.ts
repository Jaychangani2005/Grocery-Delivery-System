import express from 'express';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './types/database';

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool instead of single connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'grocerydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
});

// Create users table if it doesn't exist
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    aadhar_number VARCHAR(20) NOT NULL UNIQUE,
    pan_card VARCHAR(20) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

pool.query(createUsersTable, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created or already exists');
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    mobilenumber,
    Aadharnumber,
    pancard,
    Address,
    city,
    state,
    pincode,
    vehicle_type,
    license_number
  } = req.body;

  // Log the received data
  console.log('Received registration data:', req.body);

  // Validate required fields
  const requiredFields = {
    name: 'Full Name',
    email: 'Email',
    password: 'Password',
    mobilenumber: 'Mobile Number',
    Aadharnumber: 'Aadhar Number',
    pancard: 'PAN Card',
    Address: 'Address',
    city: 'City',
    state: 'State',
    pincode: 'Pincode',
    vehicle_type: 'Vehicle Type',
    license_number: 'License Number'
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([key]) => !req.body[key])
    .map(([_, label]) => label);

  if (missingFields.length > 0) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      details: `The following fields are required: ${missingFields.join(', ')}`
    });
  }

  try {
    // First check if user already exists
    const checkQuery = 'SELECT * FROM delivery_agents WHERE email = ? OR license_number = ? OR mobilenumber = ? OR Aadharnumber = ? OR pancard = ?';
    pool.query<(User & RowDataPacket)[]>(checkQuery, [email, license_number, mobilenumber, Aadharnumber, pancard], async (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking existing user:', checkErr);
        return res.status(500).json({ 
          error: 'Error checking existing user',
          details: checkErr.message
        });
      }

      if (checkResults.length > 0) {
        const existingFields = [];
        if (checkResults[0].email === email) existingFields.push('email');
        if (checkResults[0].license_number === license_number) existingFields.push('license number');
        if (checkResults[0].mobilenumber === mobilenumber) existingFields.push('mobile number');
        if (checkResults[0].Aadharnumber === Aadharnumber) existingFields.push('Aadhar number');
        if (checkResults[0].pancard === pancard) existingFields.push('PAN card');

        return res.status(400).json({ 
          error: 'User already exists',
          details: `A user with the following details already exists: ${existingFields.join(', ')}`
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // If user doesn't exist, proceed with registration
      const insertQuery = `
        INSERT INTO delivery_agents (
          name, 
          email, 
          password, 
          mobilenumber,
          Aadharnumber,
          pancard,
          Address,
          city,
          state,
          pincode,
          vehicle_type,
          license_number,
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      pool.query(insertQuery, [
        name,
        email,
        hashedPassword,
        mobilenumber,
        Aadharnumber,
        pancard,
        Address,
        city,
        state,
        pincode,
        vehicle_type,
        license_number,
        'available'
      ], (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Registration error details:', {
            code: insertErr.code,
            message: insertErr.message
          });
          
          return res.status(500).json({ 
            error: 'Error registering user',
            details: insertErr.message
          });
        }

        const result = insertResults as mysql.ResultSetHeader;
        console.log('User registered successfully:', { name, email });
        res.status(201).json({ 
          message: 'User registered successfully',
          user: {
            id: result.insertId,
            name,
            email,
            license_number,
            status: 'available'
          }
        });
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Error registering user',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email in delivery_agents table
    const query = 'SELECT * FROM delivery_agents WHERE email = ?';
    pool.query<(User & RowDataPacket)[]>(query, [email], async (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Error logging in' });
      }

      if (!results || results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = results[0];

      // Compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token with all necessary user data
      const tokenPayload = {
        userId: user.agent_id,
        email: user.email,
        name: user.name,
        license_number: user.license_number,
        status: user.status,
        is_approved: user.is_approved,
        is_rejected: user.is_rejected,
        mobilenumber: user.mobilenumber,
        Aadharnumber: user.Aadharnumber,
        pancard: user.pancard,
        Address: user.Address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        vehicle_type: user.vehicle_type
      };

      const token = jwt.sign(
        tokenPayload,
        'd4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625',
        { expiresIn: '24h' }
      );

      // Send complete user data in response
      const userResponse = {
        id: user.agent_id,
        name: user.name,
        email: user.email,
        license_number: user.license_number,
        status: user.status,
        is_approved: user.is_approved,
        is_rejected: user.is_rejected,
        mobilenumber: user.mobilenumber,
        Aadharnumber: user.Aadharnumber,
        pancard: user.pancard,
        Address: user.Address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        vehicle_type: user.vehicle_type
      };

      console.log('Login successful for user:', userResponse);

      res.json({
        token,
        user: userResponse
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Define interfaces for our database results
interface OrderRow extends RowDataPacket {
  delivery_id: number;
  order_id: number;
  pickup_time: string | null;
  delivery_time: string | null;
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  house_no: string;
  building_name: string | null;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string | null;
}

interface DeliverySummaryRow extends RowDataPacket {
  total: number;
  earnings: number;
  rating: number;
  hours: number;
}

interface AgentProfileRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  joinedDate: string;
  vehicle_type: string;
  license_number: string;
  Address: string;
  city: string;
  state: string;
  pincode: string;
  is_approved: number;
  is_rejected: number;
  totalDeliveries?: number;
  rating?: number;
}

// Get assigned orders for delivery agent
app.get('/api/delivery/assigned-orders', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'd4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625') as any;
    const agentId = decoded.userId;

    console.log('Fetching orders for agent:', agentId);

    // Get assigned orders with order details
    const query = `
      SELECT 
        od.delivery_id,
        od.order_id,
        od.pickup_time,
        od.delivery_time,
        o.total,
        o.status,
        o.payment_method,
        o.created_at,
        ua.name as customer_name,
        ua.phone as customer_phone,
        ua.house_no,
        ua.building_name,
        ua.street,
        ua.area,
        ua.city,
        ua.state,
        ua.pincode,
        ua.landmark
      FROM order_delivery od
      JOIN orders o ON od.order_id = o.order_id
      JOIN user_addresses ua ON o.address_id = ua.address_id
      WHERE od.agent_id = ? AND o.status IN ('confirmed', 'preparing', 'ready', 'Out For delivery', 'delivered', 'cancelled')
      ORDER BY o.created_at DESC
    `;

    pool.query<OrderRow[]>(query, [agentId], (err, results) => {
      if (err) {
        console.error('Error fetching assigned orders:', {
          code: err.code,
          message: err.message
        });
        return res.status(500).json({ 
          error: 'Error fetching assigned orders',
          details: err.message
        });
      }

      // Convert results to array if it's not already
      const orders = Array.isArray(results) ? results : [results];
      
      console.log('Found orders:', orders);
      console.log('Number of orders:', orders.length);

      // Format the response
      const formattedOrders = orders.map(order => ({
        delivery_id: order.delivery_id,
        order_id: order.order_id,
        pickup_time: order.pickup_time,
        delivery_time: order.delivery_time,
        total: parseFloat(order.total.toString()),
        status: order.status,
        payment_method: order.payment_method,
        created_at: order.created_at,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        house_no: order.house_no,
        building_name: order.building_name,
        street: order.street,
        area: order.area,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        landmark: order.landmark
      }));

      console.log('Formatted orders:', formattedOrders);
      
      res.json({ 
        orders: formattedOrders,
        count: formattedOrders.length
      });
    });
  } catch (error) {
    console.error('Error in assigned-orders endpoint:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get delivery summary for agent
app.get('/api/delivery/summary', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'd4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625') as any;
    const agentId = decoded.userId;

    // Get total deliveries
    const totalDeliveriesQuery = `
      SELECT COUNT(*) as total
      FROM order_delivery od
      JOIN orders o ON od.order_id = o.order_id
      WHERE od.agent_id = ?
    `;

    // Get today's earnings
    const todayEarningsQuery = `
      SELECT COALESCE(SUM(de.amount), 0) as earnings
      FROM delivery_earnings de
      WHERE de.agent_id = ?
      AND DATE(de.paid_date) = CURDATE()
    `;

    // Get weekly earnings
    const weeklyEarningsQuery = `
      SELECT COALESCE(SUM(de.amount), 0) as earnings
      FROM delivery_earnings de
      WHERE de.agent_id = ?
      AND de.paid_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    `;

    // Get total earnings
    const totalEarningsQuery = `
      SELECT COALESCE(SUM(de.amount), 0) as earnings
      FROM delivery_earnings de
      WHERE de.agent_id = ?
    `;

    // Get average rating
    const ratingQuery = `
      SELECT COALESCE(AVG(r.stars), 0) as rating
      FROM order_ratings r
      JOIN order_delivery od ON r.order_id = od.order_id
      WHERE od.agent_id = ?
    `;

    // Get active hours today
    const activeHoursQuery = `
      SELECT TIMESTAMPDIFF(HOUR, MIN(pickup_time), MAX(delivery_time)) as hours
      FROM order_delivery
      WHERE agent_id = ?
      AND DATE(pickup_time) = CURDATE()
    `;

    // Execute all queries
    pool.query<DeliverySummaryRow[]>(totalDeliveriesQuery, [agentId], (err, results) => {
      if (err) {
        console.error('Error fetching total deliveries:', err);
        return res.status(500).json({ error: 'Error fetching delivery summary' });
      }

      const totalDeliveries = results[0].total;

      pool.query<DeliverySummaryRow[]>(todayEarningsQuery, [agentId], (err, results) => {
        if (err) {
          console.error('Error fetching today earnings:', err);
          return res.status(500).json({ error: 'Error fetching delivery summary' });
        }

        const todayEarnings = results[0].earnings;

        pool.query<DeliverySummaryRow[]>(weeklyEarningsQuery, [agentId], (err, results) => {
          if (err) {
            console.error('Error fetching weekly earnings:', err);
            return res.status(500).json({ error: 'Error fetching delivery summary' });
          }

          const weeklyEarnings = results[0].earnings;

          pool.query<DeliverySummaryRow[]>(totalEarningsQuery, [agentId], (err, results) => {
            if (err) {
              console.error('Error fetching total earnings:', err);
              return res.status(500).json({ error: 'Error fetching delivery summary' });
            }

            const totalEarnings = results[0].earnings;

            pool.query<DeliverySummaryRow[]>(ratingQuery, [agentId], (err, results) => {
              if (err) {
                console.error('Error fetching rating:', err);
                return res.status(500).json({ error: 'Error fetching delivery summary' });
              }

              const rating = results[0].rating;

              pool.query<DeliverySummaryRow[]>(activeHoursQuery, [agentId], (err, results) => {
                if (err) {
                  console.error('Error fetching active hours:', err);
                  return res.status(500).json({ error: 'Error fetching delivery summary' });
                }

                const activeHours = results[0].hours || 0;

                res.json({
                  totalDeliveries,
                  totalEarnings,
                  todayEarnings,
                  weeklyEarnings,
                  ratings: rating,
                  activeHours
                });
              });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error in delivery summary endpoint:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get delivery agent profile
app.get('/api/delivery/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'd4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625') as any;
    const agentId = decoded.userId;

    const query = `
      SELECT 
        agent_id as id,
        name,
        email,
        mobilenumber as phone,
        status,
        CURRENT_TIMESTAMP as joinedDate,
        vehicle_type,
        license_number,
        Address,
        city,
        state,
        pincode,
        is_approved,
        is_rejected
      FROM delivery_agents
      WHERE agent_id = ?
    `;

    pool.query<AgentProfileRow[]>(query, [agentId], (err, results) => {
      if (err) {
        console.error('Error fetching agent profile:', err);
        return res.status(500).json({ error: 'Error fetching agent profile' });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      const agent = results[0];

      // Get total deliveries
      const deliveriesQuery = `
        SELECT COUNT(*) as total
        FROM order_delivery
        WHERE agent_id = ? AND delivery_time IS NOT NULL
      `;

      pool.query<DeliverySummaryRow[]>(deliveriesQuery, [agentId], (err, results) => {
        if (err) {
          console.error('Error fetching total deliveries:', err);
          return res.status(500).json({ error: 'Error fetching agent profile' });
        }

        const totalDeliveries = results[0].total;

        // Get average rating
        const ratingQuery = `
          SELECT COALESCE(AVG(r.stars), 0) as rating
          FROM order_ratings r
          JOIN order_delivery od ON r.order_id = od.order_id
          WHERE od.agent_id = ?
        `;

        pool.query<DeliverySummaryRow[]>(ratingQuery, [agentId], (err, results) => {
          if (err) {
            console.error('Error fetching rating:', err);
            return res.status(500).json({ error: 'Error fetching agent profile' });
          }

          const rating = results[0].rating;

          res.json({
            ...agent,
            totalDeliveries,
            rating
          });
        });
      });
    });
  } catch (error) {
    console.error('Error in agent profile endpoint:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update delivery agent profile
app.put('/api/delivery/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'd4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625') as any;
    const agentId = decoded.userId;
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    // Check if email is already taken by another agent
    const checkEmailQuery = 'SELECT agent_id FROM delivery_agents WHERE email = ? AND agent_id != ?';
    pool.query<RowDataPacket[]>(checkEmailQuery, [email, agentId], (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ error: 'Error updating profile' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Email is already taken' });
      }

      // Update the agent's profile
      const updateQuery = `
        UPDATE delivery_agents 
        SET name = ?, 
            email = ?, 
            mobilenumber = ?
        WHERE agent_id = ?
      `;

      pool.query(updateQuery, [name, email, phone, agentId], (err, result) => {
        if (err) {
          console.error('Error updating profile:', err);
          return res.status(500).json({ error: 'Error updating profile' });
        }

        // Return updated profile data
        const profileQuery = `
          SELECT 
            agent_id as id,
            name,
            email,
            mobilenumber as phone,
            status,
            CURRENT_TIMESTAMP as joinedDate,
            vehicle_type,
            license_number,
            Address,
            city,
            state,
            pincode,
            is_approved,
            is_rejected
          FROM delivery_agents
          WHERE agent_id = ?
        `;

        pool.query<AgentProfileRow[]>(profileQuery, [agentId], (err, results) => {
          if (err) {
            console.error('Error fetching updated profile:', err);
            return res.status(500).json({ error: 'Profile updated but failed to fetch updated data' });
          }

          if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
          }

          const agent = results[0];
          res.json(agent);
        });
      });
    });
  } catch (error) {
    console.error('Error in update profile endpoint:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update delivery order status
app.put('/api/delivery/orders/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token and get the delivery agent ID
    const decoded = jwt.verify(token, 'd4ae8da002459dc55d685c894b8df54c3e6ddaab0b8969c104b9ee089e589625') as any;
    const deliveryAgentId = decoded.userId;

    console.log('Updating order status:', {
      orderId,
      status,
      deliveryAgentId
    });

    // First verify that this order is assigned to the delivery agent
    const checkQuery = `
      SELECT od.delivery_id 
      FROM order_delivery od
      WHERE od.order_id = ? AND od.agent_id = ?
    `;

    console.log('Checking order assignment:', {
      query: checkQuery,
      params: [orderId, deliveryAgentId]
    });

    const [checkResult] = await pool.promise().execute(checkQuery, [orderId, deliveryAgentId]);

    console.log('Check result:', checkResult);

    if (!(checkResult as any[]).length) {
      return res.status(404).json({ error: 'Order not found or not assigned to this delivery agent' });
    }

    // Update the order status in the database
    const updateQuery = `
      UPDATE orders 
      SET status = ?
      WHERE order_id = ?
    `;

    console.log('Updating order status:', {
      query: updateQuery,
      params: [status, orderId]
    });

    const [result] = await pool.promise().execute(updateQuery, [status, orderId]);

    console.log('Update result:', result);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If status is delivered, update the delivery time
    if (status === 'delivered') {
      const updateDeliveryTimeQuery = `
        UPDATE order_delivery 
        SET delivery_time = CURRENT_TIMESTAMP 
        WHERE order_id = ? AND agent_id = ?
      `;

      console.log('Updating delivery time:', {
        query: updateDeliveryTimeQuery,
        params: [orderId, deliveryAgentId]
      });

      await pool.promise().execute(updateDeliveryTimeQuery, [orderId, deliveryAgentId]);
    }

    // Add entry to order_status_history
    const historyQuery = `
      INSERT INTO order_status_history 
      (order_id, old_status, new_status, changed_by) 
      SELECT ?, o.status, ?, 'delivery_agent' 
      FROM orders o 
      WHERE o.order_id = ?
    `;

    console.log('Adding to status history:', {
      query: historyQuery,
      params: [orderId, status, orderId]
    });

    await pool.promise().execute(historyQuery, [orderId, status, orderId]);

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    // Send more detailed error information
    res.status(500).json({ 
      error: 'Failed to update order status',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 