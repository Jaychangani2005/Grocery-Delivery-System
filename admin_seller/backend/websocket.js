const WebSocket = require('ws');

// Store connected clients with their seller_id
const clients = new Map();

// Function to broadcast updates to specific seller
const broadcastToSeller = (seller_id, data) => {
  const message = JSON.stringify(data);
  const client = clients.get(seller_id);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(message);
  }
};

// Function to broadcast updates to all connected clients
const broadcastUpdate = (data) => {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// Function to broadcast new order notifications
const broadcastNewOrder = (order) => {
  const seller_id = order.seller_id;
  broadcastToSeller(seller_id, {
    type: 'NEW_ORDER',
    data: {
      orderId: order.order_id,
      customer: order.customer_name,
      address: order.area,
      createdAt: order.created_at
    }
  });
};

// Function to add a new client
const addClient = (ws, seller_id) => {
  clients.set(seller_id, ws);
  console.log(`Added client for seller ${seller_id}`);
};

// Function to remove a client
const removeClient = (ws) => {
  for (const [seller_id, client] of clients.entries()) {
    if (client === ws) {
      clients.delete(seller_id);
      console.log(`Removed client for seller ${seller_id}`);
      break;
    }
  }
};

module.exports = {
  broadcastUpdate,
  broadcastNewOrder,
  addClient,
  removeClient,
  clients
}; 