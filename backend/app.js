/**
 * Main application file
 * @author Bshara Krakaby
 */

// Import External packages
const express = require("express"); // Import Express framework
const cors = require("cors"); // Middleware for enabling CORS
const path = require("path"); // Node.js path module
const fs = require("fs"); // Import the built-in (File System) module

// Import routes and configurations
const sessionConfig = require("./auth/sessionConfig"); // User Session configuration
const userRoutes = require("./routes/userRoutes"); // User routes
const authRoutes = require("./routes/authRoutes"); // Auth routes
const productRoutes = require("./routes/productRoutes"); // Product routes
const supplierRoutes = require("./routes/supplierRoutes"); // Supplier routes
const categoryRoutes = require("./routes/categoryRoutes"); // Category routes
const uploadRoutes = require("./routes/uploadRoutes"); // Upload routes

// App setup
const app = express(); // Create Express app instance
const port = process.env.PORT || 3000; // Set server port

// Create uploads directory if not exist, for storing uploaded images
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(sessionConfig); // Enable session with custom configuration

// Static file
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve frontend files
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// API routes
app.use("/api/users", userRoutes); // User endpoints
app.use("/api/auth", authRoutes); // Auth endpoints
app.use("/api/products", productRoutes); // Product endpoints
app.use("/api/suppliers", supplierRoutes); // Supplier endpoints
app.use("/api/categories", categoryRoutes); // Category endpoints
app.use("/api/upload", uploadRoutes); // Upload endpoints

// Serve React app for all other requests (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log error details
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`✅ 🚀 Server is running on http://localhost:${port}`);
  console.log("📦 🛒 TechStock Inventory Management System");
  console.log("💻 🤝 Developed by: Bshara Karkaby");
});
