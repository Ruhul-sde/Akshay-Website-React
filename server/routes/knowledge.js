
const express = require("express");
const router = express.Router();
const CompanyKnowledge = require("../models/CompanyKnowledge");
const { apiLimiter } = require("../middleware/rateLimiter");

// Get all knowledge entries
router.get("/all", apiLimiter, async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const knowledge = await CompanyKnowledge.find(query).sort({ category: 1, createdAt: -1 });
    res.json({ success: true, data: knowledge });
  } catch (error) {
    console.error("Error fetching knowledge:", error);
    res.status(500).json({ success: false, error: "Failed to fetch knowledge" });
  }
});

// Get knowledge by category
router.get("/category/:category", apiLimiter, async (req, res) => {
  try {
    const knowledge = await CompanyKnowledge.find({ 
      category: req.params.category,
      isActive: true 
    });
    res.json({ success: true, data: knowledge });
  } catch (error) {
    console.error("Error fetching knowledge:", error);
    res.status(500).json({ success: false, error: "Failed to fetch knowledge" });
  }
});

// Search knowledge
router.get("/search", apiLimiter, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ success: false, error: "Search query required" });
    }
    
    const keywords = q.toLowerCase().split(' ').filter(word => word.length > 3);
    
    const knowledge = await CompanyKnowledge.find({
      isActive: true,
      $or: [
        { keywords: { $in: keywords } },
        { $text: { $search: q } }
      ]
    }).limit(10);
    
    res.json({ success: true, data: knowledge });
  } catch (error) {
    console.error("Error searching knowledge:", error);
    res.status(500).json({ success: false, error: "Failed to search knowledge" });
  }
});

module.exports = router;
