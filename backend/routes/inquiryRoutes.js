const express = require("express");
const Inquiry = require("../models/Inquiry");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/inquiries - logged-in customer submits an inquiry
router.post("/", protect, async (req, res) => {
  try {
    const { product, name, email, phone, quantity, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const inquiry = await Inquiry.create({
      user: req.user._id,
      product: product || undefined,
      name: name || req.user.name,
      email: email || req.user.email,
      phone: phone || req.user.phone,
      quantity,
      message,
    });

    res.status(201).json(inquiry);
  } catch (err) {
    res.status(400).json({ message: "Could not submit inquiry", error: err.message });
  }
});

// GET /api/inquiries/mine - logged-in customer's own inquiries
router.get("/mine", protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ user: req.user._id })
      .populate("product", "name category")
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch inquiries", error: err.message });
  }
});

// GET /api/inquiries - admin: view all inquiries
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const inquiries = await Inquiry.find(filter)
      .populate("product", "name category")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch inquiries", error: err.message });
  }
});

// PUT /api/inquiries/:id - admin: update status / add note
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(adminNote !== undefined && { adminNote }) },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ message: "Could not update inquiry", error: err.message });
  }
});

module.exports = router;
