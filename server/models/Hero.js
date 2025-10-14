
const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  primaryButton: {
    text: String,
    link: String
  },
  secondaryButton: {
    text: String,
    link: String
  },
  backgroundImage: String,
  stats: [{
    number: String,
    label: String
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Hero", heroSchema);
