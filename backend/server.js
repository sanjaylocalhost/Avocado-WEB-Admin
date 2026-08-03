// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Import database connection
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes"); // ✅ Make sure this is imported
const productRoutes = require("./routes/productRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const uploadRoutes = require("./routes/upload");
const leadRoutes = require("./routes/leadRoutes");

// Load environment variables
dotenv.config();

const app = express();

// ============ CORS CONFIGURATION ============
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map(origin => origin.trim());

console.log("CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============ MIDDLEWARE ============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log('📁 Uploads folder path:', path.join(__dirname, 'uploads'));

// ============ DATABASE CONNECTION ============
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Add it to your .env file.");
  process.exit(1);
}

// ============ REQUEST LOGGING MIDDLEWARE ============
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// ============ ROUTES - MOUNT ALL ROUTES HERE ============
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Avocado farm API is running",
    timestamp: new Date().toISOString(),
  });
});

// ✅ IMPORTANT: Mount routes before 404 handler
app.use("/api/auth", authRoutes);           // User auth
app.use("/api/auth", adminAuthRoutes);      // Admin auth - THIS IS THE KEY FIX
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/leads", leadRoutes);

// ============ 404 HANDLER - MUST BE AFTER ALL ROUTES ============
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// ============ GLOBAL ERROR HANDLER ============
app.use((err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  // Handle CORS errors
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS policy blocked this request",
      error: err.message,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value entered",
      field: Object.keys(err.keyPattern)[0],
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong on the server",
  });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔗 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📊 CORS enabled for: ${allowedOrigins.join(", ")}`);
      console.log(`🔐 Admin login: http://localhost:${PORT}/api/auth/admin/login`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  });

// ============ PROCESS HANDLERS ============
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing server...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Closing server...");
  process.exit(0);
});