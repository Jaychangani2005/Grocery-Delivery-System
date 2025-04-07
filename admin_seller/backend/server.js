const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require("./routes/dashboard");
const adminRoutes = require("./routes/admin");
const { addClient, removeClient } = require('./websocket');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');
  addClient(ws);

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    removeClient(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    removeClient(ws);
  });
});

// CORS configuration
app.use(cors({
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Ensure images directory exists
const imagesDir = path.join(publicDir, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Ensure category directory exists
const categoryDir = path.join(imagesDir, 'category');
if (!fs.existsSync(categoryDir)) {
  fs.mkdirSync(categoryDir);
}

// Serve static files
app.use(express.static(publicDir));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

