// Load .env only for local development (not on Replit)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Set defaults for environment variables
process.env.PORT = process.env.PORT || '3001';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here_change_this_in_production';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/support_ticketing_system';
process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your_gemini_api_key_here_change_this_in_production';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const ticketRoutes = require("./routes/tickets");
const quoteRoutes = require("./routes/quotes");
const quoteConfigRoutes = require("./routes/quoteConfig");
const navigationRoutes = require("./routes/navigation");
const knowledgeRoutes = require("./routes/knowledge");
const chatRoutes = require("./routes/chat");
const contactRoutes = require("./routes/contact");
const aboutUsRoutes = require("./routes/aboutUs");
const footerRoutes = require("./routes/footer");
const heroRoutes = require("./routes/hero");
const trustedCompaniesRoutes = require("./routes/trustedCompanies");
const aboutCompanyRoutes = require("./routes/aboutCompany");
const servicesRoutes = require("./routes/services");
const whyChooseUsRoutes = require("./routes/whyChooseUs");
const statisticsRoutes = require("./routes/statistics");
const testimonialsRoutes = require("./routes/testimonials");
const chatbotRoutes = require("./routes/chatbot");


app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/tickets", ticketRoutes);
app.use("/quotes", quoteRoutes);
app.use("/quote-config", quoteConfigRoutes);
app.use("/navigation", navigationRoutes);
app.use("/knowledge", knowledgeRoutes);
app.use("/chat", chatRoutes);
app.use("/contact", contactRoutes);
app.use("/about-us", aboutUsRoutes);
app.use("/footer", footerRoutes);
app.use("/hero", heroRoutes);
app.use("/trusted-companies", trustedCompaniesRoutes);
app.use("/about-company", aboutCompanyRoutes);
app.use("/services", servicesRoutes);
app.use("/why-choose-us", whyChooseUsRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/testimonials", testimonialsRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Start Server after DB connect
connectDB().then(() => {
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${process.env.PORT}`);
    console.log(`🔗 Backend accessible at port ${process.env.PORT}`);
  });
});