// seed/createAdmin.js
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const adminData = {
      name: "Super Admin",
      email: "admin@avocadofarm.com",
      password: "Admin@123", // Change this
      phone: "+919845311238",
      role: "super_admin",
      permissions: [
        "manage_products",
        "manage_inquiries", 
        "view_leads",
        "manage_admins",
        "manage_settings"
      ],
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    const admin = await Admin.create(adminData);
    console.log("Admin created successfully:", admin.email);
    console.log("Admin ID:", admin._id);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();