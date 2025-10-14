
const express = require("express");
const TrustedCompanies = require("../models/TrustedCompanies");
const router = express.Router();

// Get TrustedCompanies content
router.get("/", async (req, res) => {
  try {
    let content = await TrustedCompanies.findOne();
    
    if (!content) {
      content = new TrustedCompanies({
        title: "Trusted by Industry Leaders",
        subtitle: "Join 500+ companies transforming their business with us",
        companies: [
          { name: "SAP", logo: "https://logo.clearbit.com/sap.com", order: 1 },
          { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", order: 2 },
          { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", order: 3 },
          { name: "IBM", logo: "https://logo.clearbit.com/ibm.com", order: 4 },
          { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", order: 5 }
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

// Update TrustedCompanies content
router.put("/", async (req, res) => {
  try {
    const content = await TrustedCompanies.findOneAndUpdate(
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
