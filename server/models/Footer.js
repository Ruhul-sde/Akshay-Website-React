
const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  company: {
    name: String,
    tagline: String,
    description: String,
    logo: String
  },
  sections: [{
    title: String,
    icon: String,
    links: [{
      label: String,
      url: String,
      isExternal: Boolean
    }],
    order: Number
  }],
  contact: {
    email: String,
    phone: String,
    address: String
  },
  social: [{
    name: String,
    icon: String,
    url: String,
    color: String
  }],
  legal: [{
    label: String,
    url: String
  }],
  cta: {
    title: String,
    subtitle: String,
    buttonText: String,
    buttonLink: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Footer", footerSchema);
