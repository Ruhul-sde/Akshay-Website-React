
const express = require("express");
const ChatbotConfig = require("../models/ChatbotConfig");
const router = express.Router();

// Get chatbot configuration
router.get("/config", async (req, res) => {
  try {
    let config = await ChatbotConfig.findOne();
    
    if (!config) {
      config = new ChatbotConfig({
        header: {
          title: "Akshay Software",
          subtitle: "AI Assistant",
          logo: ""
        },
        quickReplies: ["SAP", "Cloud Solutions", "Staffing", "AI Solutions"],
        contactForm: {
          enabled: true,
          title: "Contact Us",
          description: "Fill out the form and we'll get back to you soon"
        }
      });
      await config.save();
    }
    
    res.json({ success: true, data: config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Update chatbot configuration
router.put("/config", async (req, res) => {
  try {
    const config = await ChatbotConfig.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, data: config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Failed to update config" });
  }
});

module.exports = router;
