const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require('./routes/auth');
const dashboardRoutes = require("./routes/dashboard");
const adminRoutes = require("./routes/admin");
const app = express();

// Middleware
app.use(cors({
  origin: "*",  // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;  // Changed to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

