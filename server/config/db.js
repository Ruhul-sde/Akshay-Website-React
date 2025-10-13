const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️  MONGO_URI not configured. Update it in Replit Secrets with your MongoDB Atlas connection string.");
      console.warn("⚠️  Server will run without database functionality.");
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.warn("⚠️  Server will continue without database functionality.");
  }
};

module.exports = connectDB;
