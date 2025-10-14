
const mongoose = require("mongoose");

const quoteFormConfigSchema = new mongoose.Schema({
  services: [{ type: String }],
  countryCodes: [{
    code: String,
    name: String,
    dialCode: String
  }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuoteFormConfig", quoteFormConfigSchema);
