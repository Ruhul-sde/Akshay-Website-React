
const mongoose = require("mongoose");

const chatbotConfigSchema = new mongoose.Schema({
  header: {
    title: { type: String, default: "Akshay Software" },
    subtitle: { type: String, default: "AI Assistant" },
    logo: { type: String, default: "" }
  },
  quickReplies: [{ 
    type: String 
  }],
  contactForm: {
    enabled: { type: Boolean, default: true },
    title: { type: String, default: "Contact Us" },
    description: { type: String, default: "Fill out the form and we'll get back to you soon" }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ChatbotConfig", chatbotConfigSchema);
