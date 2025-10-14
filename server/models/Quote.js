
const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  countryCode: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  service: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'pending', enum: ['pending', 'contacted', 'completed', 'rejected'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quote", quoteSchema);
