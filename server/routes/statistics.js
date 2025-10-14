
const express = require("express");
const Statistics = require("../models/Statistics");
const router = express.Router();

// Get Statistics content
router.get("/", async (req, res) => {
  try {
    let content = await Statistics.findOne();
    
    if (!content) {
      content = new Statistics({
        title: "Our Impact in Numbers",
        subtitle: "Trusted by businesses worldwide",
        stats: [
          {
            number: "38+",
            label: "Years of Excellence",
            icon: "calendar",
            color: "blue",
            order: 1
          },
          {
            number: "500+",
            label: "Happy Clients",
            icon: "users",
            color: "purple",
            order: 2
          },
          {
            number: "1000+",
            label: "Projects Delivered",
            icon: "briefcase",
            color: "green",
            order: 3
          },
          {
            number: "100%",
            label: "Client Satisfaction",
            icon: "heart",
            color: "red",
            order: 4
          }
        ]
      });
      await content.save();
    }
    
    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Update Statistics content
router.put("/", async (req, res) => {
  try {
    const content = await Statistics.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Failed to update content" });
  }
});

module.exports = router;
