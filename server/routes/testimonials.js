
const express = require("express");
const Testimonials = require("../models/Testimonials");
const router = express.Router();

// Get Testimonials content
router.get("/", async (req, res) => {
  try {
    let content = await Testimonials.findOne();
    
    if (!content) {
      content = new Testimonials({
        title: "Client Testimonials",
        subtitle: "What our clients say about us",
        testimonials: [
          {
            name: "John Smith",
            role: "CEO",
            company: "Tech Corp",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
            rating: 5,
            text: "Outstanding service and support. They transformed our business operations completely.",
            order: 1
          },
          {
            name: "Sarah Johnson",
            role: "CTO",
            company: "Innovation Labs",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
            rating: 5,
            text: "Their expertise in SAP implementation is unmatched. Highly recommended!",
            order: 2
          },
          {
            name: "Michael Brown",
            role: "Director",
            company: "Global Solutions",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
            rating: 5,
            text: "Professional team with deep technical knowledge. Great partner for digital transformation.",
            order: 3
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

// Update Testimonials content
router.put("/", async (req, res) => {
  try {
    const content = await Testimonials.findOneAndUpdate(
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
