
const mongoose = require("mongoose");

const whyChooseUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  reasons: [{
    title: String,
    description: String,
    icon: String,
    color: String,
    order: Number
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("WhyChooseUs", whyChooseUsSchema);
