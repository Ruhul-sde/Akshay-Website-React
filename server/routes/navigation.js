
const express = require("express");
const router = express.Router();
const Navigation = require("../models/Navigation");
const { apiLimiter } = require("../middleware/rateLimiter");

// Get all active navigation items
router.get("/menu", apiLimiter, async (req, res) => {
  try {
    const navItems = await Navigation.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: navItems });
  } catch (error) {
    console.error("Error fetching navigation:", error);
    res.status(500).json({ success: false, error: "Failed to fetch navigation" });
  }
});

// Get single navigation item
router.get("/:id", apiLimiter, async (req, res) => {
  try {
    const navItem = await Navigation.findById(req.params.id);
    if (!navItem) {
      return res.status(404).json({ success: false, error: "Navigation item not found" });
    }
    res.json({ success: true, data: navItem });
  } catch (error) {
    console.error("Error fetching navigation item:", error);
    res.status(500).json({ success: false, error: "Failed to fetch navigation item" });
  }
});

// Create navigation item (admin only - add auth middleware as needed)
router.post("/create", async (req, res) => {
  try {
    const navItem = new Navigation(req.body);
    await navItem.save();
    res.json({ success: true, data: navItem });
  } catch (error) {
    console.error("Error creating navigation:", error);
    res.status(500).json({ success: false, error: "Failed to create navigation" });
  }
});

// Update navigation item (admin only - add auth middleware as needed)
router.put("/:id", async (req, res) => {
  try {
    const navItem = await Navigation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!navItem) {
      return res.status(404).json({ success: false, error: "Navigation item not found" });
    }
    res.json({ success: true, data: navItem });
  } catch (error) {
    console.error("Error updating navigation:", error);
    res.status(500).json({ success: false, error: "Failed to update navigation" });
  }
});

// Delete navigation item (admin only - add auth middleware as needed)
router.delete("/:id", async (req, res) => {
  try {
    const navItem = await Navigation.findByIdAndDelete(req.params.id);
    if (!navItem) {
      return res.status(404).json({ success: false, error: "Navigation item not found" });
    }
    res.json({ success: true, message: "Navigation item deleted" });
  } catch (error) {
    console.error("Error deleting navigation:", error);
    res.status(500).json({ success: false, error: "Failed to delete navigation" });
  }
});

module.exports = router;
