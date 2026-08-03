// seed.js - Run with: node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Admin = require("./models/Admin");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create test user
    const existingUser = await User.findOne({ email: "user@test.com" });
    if (!existingUser) {
      await User.create({
        name: "Test User",
        email: "user@test.com",
        password: "password123",
        phone: "1234567890",
        location: "Test Location",
        role: "user",
      });
      console.log("✅ Test user created: user@test.com / password123");
    } else {
      console.log("Test user already exists");
    }

    // Create test admin
    const existingAdmin = await Admin.findOne({ email: "admin@test.com" });
    if (!existingAdmin) {
      await Admin.create({
        name: "Admin User",
        email: "admin@test.com",
        password: "admin123",
        phone: "0987654321",
        role: "admin",
      });
      console.log("✅ Test admin created: admin@test.com / admin123");
    } else {
      console.log("Test admin already exists");
    }

    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();