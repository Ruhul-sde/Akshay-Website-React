
const mongoose = require("mongoose");

const aboutCompanySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  description: {
    type: String,
    required: true
  },
  image: String,
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AboutCompany", aboutCompanySchema);
