
const express = require("express");
const WhyChooseUs = require("../models/WhyChooseUs");
const router = express.Router();

// Get WhyChooseUs content
router.get("/", async (req, res) => {
  try {
    let content = await WhyChooseUs.findOne();
    
    if (!content) {
      content = new WhyChooseUs({
        title: "Why Choose Us",
        subtitle: "What makes us different from others",
        reasons: [
          {
            title: "38+ Years Experience",
            description: "Decades of industry expertise and innovation",
            icon: "experience",
            color: "blue",
            order: 1
          },
          {
            title: "Expert Team",
            description: "Certified professionals dedicated to your success",
            icon: "team",
            color: "purple",
            order: 2
          },
          {
            title: "24/7 Support",
            description: "Round-the-clock assistance whenever you need",
            icon: "support",
            color: "green",
            order: 3
          },
          {
            title: "Proven Results",
            description: "1000+ successful projects delivered worldwide",
            icon: "results",
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

// Update WhyChooseUs content
router.put("/", async (req, res) => {
  try {
    const content = await WhyChooseUs.findOneAndUpdate(
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
