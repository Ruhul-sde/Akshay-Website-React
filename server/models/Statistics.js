
const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  stats: [{
    number: String,
    label: String,
    icon: String,
    color: String,
    order: Number
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Statistics", statisticsSchema);
