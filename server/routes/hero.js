
const express = require("express");
const Hero = require("../models/Hero");
const router = express.Router();

// Get Hero content
router.get("/", async (req, res) => {
  try {
    let content = await Hero.findOne();
    
    if (!content) {
      content = new Hero({
        title: "Transforming Businesses with Innovation",
        subtitle: "Leading SAP Solutions Provider",
        description: "Empowering organizations with cutting-edge ERP solutions, IT staffing, and AI-driven digital transformation for over 38 years.",
        primaryButton: {
          text: "Get Started",
          link: "/contact"
        },
        secondaryButton: {
          text: "Learn More",
          link: "/about"
        },
        backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920",
        stats: [
          { number: "38+", label: "Years of Excellence" },
          { number: "500+", label: "Happy Clients" },
          { number: "1000+", label: "Projects Delivered" }
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

// Update Hero content
router.put("/", async (req, res) => {
  try {
    const content = await Hero.findOneAndUpdate(
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
