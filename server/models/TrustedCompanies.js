
const mongoose = require("mongoose");

const trustedCompaniesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  companies: [{
    name: String,
    logo: String,
    order: Number
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("TrustedCompanies", trustedCompaniesSchema);
