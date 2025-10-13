const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI === 'mongodb://localhost:27017/support_ticketing_system') {
      console.warn("⚠️  MONGO_URI not configured properly.");
      console.warn("⚠️  Please add your MongoDB Atlas connection string to Replit Secrets.");
      console.warn("⚠️  Example: mongodb+srv://username:password@cluster.mongodb.net/database");
      console.warn("⚠️  Server will run without database functionality.");
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB Connected successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.warn("⚠️  Server will continue without database functionality.");
    console.warn("⚠️  Please check your MONGO_URI in Replit Secrets");
  }
};

module.exports = connectDB;
