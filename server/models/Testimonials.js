
const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  testimonials: [{
    name: String,
    role: String,
    company: String,
    image: String,
    rating: Number,
    text: String,
    order: Number
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Testimonials", testimonialsSchema);
