router.get('/new-orders', async (req, res) => {
  try {
    const { seller_id } = req.query;
    console.log('Fetching orders for seller_id:', seller_id);
    
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
        AND o.status = 'new'
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
    console.log('Number of orders found:', orders.length);
    console.log('Raw order data:', orders[0]);

    if (!orders || orders.length === 0) {
      console.log('No orders found for seller_id:', seller_id);
      return res.json([]);
    }

    // Format the orders with proper nesting
    const formattedOrders = orders.map(order => ({
      order_id: order.order_id,
      total: order.total,
      status: order.status,
      customer: {
        name: order.full_name || 'N/A',
        email: order.email || 'N/A'
      },
      delivery: {
        name: order.delivery_name || order.full_name || 'N/A',
        phone: order.delivery_phone || 'N/A',
        address: {
          house_no: order.house_no || '',
          building_name: order.building_name || '',
          street: order.street || '',
          area: order.area || '',
          city: order.city || '',
          state: order.state || '',
          pincode: order.pincode || '',
          landmark: order.landmark || '',
          type: order.address_type || ''
        }
      },
      created_at: order.created_at,
      products: order.product_names ? order.product_names.split(',') : []
    }));

    // Log the formatted data for debugging
    console.log('First formatted order:', JSON.stringify(formattedOrders[0], null, 2));
    
    res.json(formattedOrders);
    
  } catch (error) {
    console.error('Error fetching new orders:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch new orders', 
      details: error.message 
    });
  }
}); 