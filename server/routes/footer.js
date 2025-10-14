
const express = require("express");
const Footer = require("../models/Footer");
const router = express.Router();

// Get Footer content
router.get("/", async (req, res) => {
  try {
    let content = await Footer.findOne();
    
    if (!content) {
      // Create default content if none exists
      content = new Footer({
        company: {
          name: "AKSHAY",
          tagline: "Software Technologies Pvt. Ltd.",
          description: "Empowering businesses with Innovation & Excellence for over 38 years",
          logo: "A"
        },
        sections: [
          {
            title: "SAP Solutions",
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
            links: [
              { label: "SAP Business One", url: "/sap-business-one", isExternal: false },
              { label: "SAP Support", url: "/sap-support", isExternal: false },
              { label: "SAP Implementation", url: "/sap-implementation", isExternal: false },
              { label: "E-Invoicing", url: "/e-invoicing", isExternal: false }
            ],
            order: 1
          },
          {
            title: "Services",
            icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            links: [
              { label: "IT Staffing", url: "/it-staffing", isExternal: false },
              { label: "Cloud Hosting", url: "/cloud-hosting", isExternal: false },
              { label: "AI Solutions", url: "/akshay-intelligence", isExternal: false },
              { label: "Digital Marketing", url: "/ai-digital-marketing", isExternal: false }
            ],
            order: 2
          },
          {
            title: "Company",
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
            links: [
              { label: "About Us", url: "/about", isExternal: false },
              { label: "Contact", url: "/contact", isExternal: false },
              { label: "Blog", url: "/blog", isExternal: false },
              { label: "Support", url: "/support", isExternal: false }
            ],
            order: 3
          }
        ],
        contact: {
          email: "info@akshay.com",
          phone: "+91-22-6712 6060",
          address: "Mumbai, India"
        },
        social: [
          { name: "LinkedIn", icon: "linkedin", url: "#", color: "from-blue-600 to-blue-700" },
          { name: "Twitter", icon: "twitter", url: "#", color: "from-sky-500 to-sky-600" },
          { name: "Facebook", icon: "facebook", url: "#", color: "from-blue-700 to-blue-800" }
        ],
        legal: [
          { label: "Privacy Policy", url: "/privacy" },
          { label: "Terms of Service", url: "/terms" }
        ],
        cta: {
          title: "Ready to Transform?",
          subtitle: "Let's build something amazing together",
          buttonText: "Get Started",
          buttonLink: "/contact"
        }
      });
      await content.save();
    }
    
    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Update Footer content (admin only)
router.put("/", async (req, res) => {
  try {
    const content = await Footer.findOneAndUpdate(
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
