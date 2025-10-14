
const express = require("express");
const ContactFormConfig = require("../models/ContactFormConfig");
const ContactSubmission = require("../models/ContactSubmission");

const router = express.Router();

// Get contact form configuration
router.get("/config", async (req, res) => {
  try {
    let config = await ContactFormConfig.findOne();
    
    if (!config) {
      config = new ContactFormConfig({
        contactInfo: {
          email: "info@akshay.com",
          phone: "+91-22-6712 6060",
          address: "Unit 214, Building 2, Sector-I, Millennium Business Park, Mahape, Navi Mumbai - 400710",
          workingHours: "Mon - Fri: 9:00 AM - 6:00 PM"
        },
        socialLinks: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          facebook: "https://facebook.com",
          instagram: "https://instagram.com"
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8447!2d73.0297!3d19.1136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzQ5LjAiTiA3M8KwMDEnNDcuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
      });
      await config.save();
    }
    
    res.json({ success: true, config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Create contact submission
router.post("/submit", async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;
    
    const submission = new ContactSubmission({
      name,
      email,
      phone,
      company,
      subject,
      message
    });

    await submission.save();
    res.status(201).json({ 
      success: true, 
      message: "Thank you for contacting us! We'll get back to you soon.",
      submission 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      error: "Failed to submit contact form. Please try again." 
    });
  }
});

// Get all submissions (admin)
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json({ success: true, submissions });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
