
const mongoose = require("mongoose");

const contactFormConfigSchema = new mongoose.Schema({
  contactInfo: {
    email: { type: String, default: "info@akshay.com" },
    phone: { type: String, default: "+91-22-6712 6060" },
    address: { type: String, default: "Unit 214, Building 2, Sector-I, Millennium Business Park, Mahape, Navi Mumbai - 400710" },
    workingHours: { type: String, default: "Mon - Fri: 9:00 AM - 6:00 PM" }
  },
  socialLinks: {
    linkedin: { type: String, default: "#" },
    twitter: { type: String, default: "#" },
    facebook: { type: String, default: "#" },
    instagram: { type: String, default: "#" }
  },
  mapEmbedUrl: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ContactFormConfig", contactFormConfigSchema);
