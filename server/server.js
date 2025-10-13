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
app.use("/auth", require("./routes/auth"));
app.use("/tickets", require("./routes/tickets"));
app.use("/chat", require("./routes/chat"));

// Start Server after DB connect
connectDB().then(() => {
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${process.env.PORT}`);
    console.log(`🔗 Backend accessible at port ${process.env.PORT}`);
  });
});
