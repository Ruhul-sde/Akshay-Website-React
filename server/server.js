require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/tickets", require("./routes/tickets"));

// Start Server after DB connect
connectDB().then(() => {
  app.listen(process.env.PORT, "0.0.0.0", () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
});
