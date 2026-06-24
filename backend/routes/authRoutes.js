const express = require("express");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { protect } = require("../middleware/auth");

const router = express.Router();

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    role: user.role,
  };
}

// POST /api/auth/signup  - customer registration
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password, phone, location });
    const token = generateToken(user._id);

    res.status(201).json({ token, user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Could not create account", error: err.message });
  }
});

// POST /api/auth/login - customer or admin login (role comes back from the DB)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// GET /api/auth/me - current logged-in user
router.get("/me", protect, async (req, res) => {
  res.json({ user: publicUser(req.user) });
});

module.exports = router;
