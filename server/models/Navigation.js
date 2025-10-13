
const mongoose = require("mongoose");

const DropdownItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
});

const NavigationSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: '#'
  },
  icon: {
    type: String, // SVG path data
    required: true
  },
  hasDropdown: {
    type: Boolean,
    default: false
  },
  isRoute: {
    type: Boolean,
    default: false
  },
  dropdown: [DropdownItemSchema],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

NavigationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Navigation", NavigationSchema);
