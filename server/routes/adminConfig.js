
const express = require("express");
const AdminConfig = require("../models/AdminConfig");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get admin configuration
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }

    let config = await AdminConfig.findOne();
    if (!config) {
      config = new AdminConfig({
        adminEmail: "admin@example.com",
        emailNotifications: true,
        smtpConfig: {
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          user: "",
          pass: ""
        }
      });
      await config.save();
    }
    
    // Don't send password to frontend
    const configData = config.toObject();
    configData.smtpConfig.pass = configData.smtpConfig.pass ? '********' : '';
    
    res.json(configData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update admin configuration
router.put("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }

    const { adminEmail, emailNotifications, smtpConfig } = req.body;
    
    let config = await AdminConfig.findOne();
    
    if (!config) {
      config = new AdminConfig();
    }

    config.adminEmail = adminEmail;
    config.emailNotifications = emailNotifications;
    
    if (smtpConfig) {
      config.smtpConfig.host = smtpConfig.host;
      config.smtpConfig.port = smtpConfig.port;
      config.smtpConfig.secure = smtpConfig.secure;
      config.smtpConfig.user = smtpConfig.user;
      // Only update password if it's not the masked value
      if (smtpConfig.pass && smtpConfig.pass !== '********') {
        config.smtpConfig.pass = smtpConfig.pass;
      }
    }
    
    config.updatedAt = Date.now();
    await config.save();

    // Don't send password to frontend
    const configData = config.toObject();
    configData.smtpConfig.pass = '********';
    
    res.json({ message: "Configuration updated successfully", config: configData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
