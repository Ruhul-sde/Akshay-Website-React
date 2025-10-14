
const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  services: [{
    title: String,
    description: String,
    icon: String,
    link: String,
    gradient: String,
    order: Number
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Services", servicesSchema);
