
const mongoose = require("mongoose");

const adminConfigSchema = new mongoose.Schema({
  adminEmail: { type: String, required: true },
  emailNotifications: { type: Boolean, default: true },
  smtpConfig: {
    host: { type: String, default: 'smtp.gmail.com' },
    port: { type: Number, default: 587 },
    secure: { type: Boolean, default: false },
    user: { type: String, required: true },
    pass: { type: String, required: true }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AdminConfig", adminConfigSchema);
