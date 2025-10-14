
const express = require("express");
const AboutCompany = require("../models/AboutCompany");
const router = express.Router();

// Get AboutCompany content
router.get("/", async (req, res) => {
  try {
    let content = await AboutCompany.findOne();
    
    if (!content) {
      content = new AboutCompany({
        title: "Powering Growth with Our People",
        subtitle: "Your trusted partner in digital transformation",
        description: "With over 38 years of experience, we deliver innovative solutions that drive business growth and efficiency.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        features: [
          {
            title: "Expert Team",
            description: "Certified professionals with deep industry knowledge",
            icon: "users"
          },
          {
            title: "Proven Track Record",
            description: "1000+ successful implementations worldwide",
            icon: "award"
          },
          {
            title: "24/7 Support",
            description: "Round-the-clock assistance for your business needs",
            icon: "support"
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

// Update AboutCompany content
router.put("/", async (req, res) => {
  try {
    const content = await AboutCompany.findOneAndUpdate(
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
