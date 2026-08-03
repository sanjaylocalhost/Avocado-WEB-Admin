const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const { protect } = require("../middleware/auth");

// Get all leads with filters
router.get("/", protect, async (req, res) => {
  try {
    const { status, source, search, sort = "-createdAt" } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(filter)
      .sort(sort)
      .populate("productsInterested", "name price")
      .limit(100);

    const stats = {
      total: await Lead.countDocuments(),
      new: await Lead.countDocuments({ status: "new" }),
      contacted: await Lead.countDocuments({ status: "contacted" }),
      qualified: await Lead.countDocuments({ status: "qualified" }),
      closed: await Lead.countDocuments({ status: "closed" }),
      lost: await Lead.countDocuments({ status: "lost" }),
    };

    res.json({ leads, stats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error: error.message });
  }
});

// Get single lead
router.get("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("productsInterested", "name price");
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lead", error: error.message });
  }
});

// Create new lead
router.post("/", protect, async (req, res) => {
  try {
    const leadData = req.body;
    const lead = new Lead(leadData);
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error creating lead", error: error.message });
  }
});

// Update lead
router.put("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastContact: Date.now() },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error updating lead", error: error.message });
  }
});

// Delete lead
router.delete("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lead", error: error.message });
  }
});

// Bulk update leads
router.patch("/bulk", protect, async (req, res) => {
  try {
    const { leadIds, updates } = req.body;
    const result = await Lead.updateMany(
      { _id: { $in: leadIds } },
      updates,
      { new: true }
    );
    res.json({ 
      message: `Updated ${result.modifiedCount} leads`,
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating leads", error: error.message });
  }
});

// Get lead stats
router.get("/stats/overview", protect, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const statusCounts = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const sourceCounts = await Lead.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } }
    ]);

    const statusMap = {};
    statusCounts.forEach(item => statusMap[item._id] = item.count);
    
    const sourceMap = {};
    sourceCounts.forEach(item => sourceMap[item._id] = item.count);

    res.json({
      total: totalLeads,
      byStatus: statusMap,
      bySource: sourceMap,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
});

module.exports = router;