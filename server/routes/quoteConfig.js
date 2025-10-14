
const express = require("express");
const QuoteFormConfig = require("../models/QuoteFormConfig");

const router = express.Router();

// Get quote form configuration
router.get("/config", async (req, res) => {
  try {
    let config = await QuoteFormConfig.findOne();
    
    // If no config exists, create default
    if (!config) {
      config = new QuoteFormConfig({
        services: [
          "SAP Business One",
          "SAP Implementation",
          "SAP Support",
          "Cloud Hosting",
          "AI Solutions",
          "IT Staffing",
          "ERP Solutions",
          "Digital Marketing",
          "Other"
        ],
        countryCodes: [
          { code: "US", name: "United States", dialCode: "+1" },
          { code: "IN", name: "India", dialCode: "+91" },
          { code: "GB", name: "United Kingdom", dialCode: "+44" },
          { code: "AU", name: "Australia", dialCode: "+61" },
          { code: "CA", name: "Canada", dialCode: "+1" },
          { code: "SG", name: "Singapore", dialCode: "+65" },
          { code: "AE", name: "UAE", dialCode: "+971" },
          { code: "DE", name: "Germany", dialCode: "+49" }
        ]
      });
      await config.save();
    }
    
    res.json({ success: true, config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Update quote form configuration (admin only)
router.put("/config", async (req, res) => {
  try {
    const { services, countryCodes } = req.body;
    
    let config = await QuoteFormConfig.findOne();
    if (!config) {
      config = new QuoteFormConfig({ services, countryCodes });
    } else {
      config.services = services;
      config.countryCodes = countryCodes;
      config.updatedAt = Date.now();
    }
    
    await config.save();
    res.json({ success: true, config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
