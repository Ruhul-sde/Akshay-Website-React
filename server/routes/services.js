
const express = require("express");
const Services = require("../models/Services");
const router = express.Router();

// Get Services content
router.get("/", async (req, res) => {
  try {
    let content = await Services.findOne();
    
    if (!content) {
      content = new Services({
        title: "Our Services",
        subtitle: "Comprehensive solutions for your business needs",
        services: [
          {
            title: "SAP Solutions",
            description: "End-to-end SAP implementation and support services",
            icon: "sap",
            link: "/sap-business-one",
            gradient: "from-blue-600 to-blue-800",
            order: 1
          },
          {
            title: "IT Staffing",
            description: "Expert IT professionals for your projects",
            icon: "staffing",
            link: "/it-staffing",
            gradient: "from-purple-600 to-purple-800",
            order: 2
          },
          {
            title: "Cloud Hosting",
            description: "Secure and scalable cloud infrastructure",
            icon: "cloud",
            link: "/cloud-hosting",
            gradient: "from-green-600 to-green-800",
            order: 3
          },
          {
            title: "AI Solutions",
            description: "Intelligent automation and analytics",
            icon: "ai",
            link: "/akshay-intelligence",
            gradient: "from-red-600 to-red-800",
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

// Update Services content
router.put("/", async (req, res) => {
  try {
    const content = await Services.findOneAndUpdate(
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
