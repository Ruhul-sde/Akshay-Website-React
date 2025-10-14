
const express = require("express");
const Quote = require("../models/Quote");

const router = express.Router();

// Create quote request
router.post("/create", async (req, res) => {
  try {
    const { name, email, countryCode, phone, company, service, message } = req.body;
    
    const quote = new Quote({
      name,
      email,
      countryCode,
      phone,
      company,
      service,
      message
    });

    await quote.save();
    res.status(201).json({ 
      success: true, 
      message: "Quote request submitted successfully!",
      quote 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      error: "Failed to submit quote request. Please try again." 
    });
  }
});

// Get all quotes (for admin)
router.get("/all", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
