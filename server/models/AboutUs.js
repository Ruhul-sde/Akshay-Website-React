
const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  hero: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundGradient: { type: String, default: "from-red-500 via-purple-600 to-blue-600" }
  },
  vision: {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  mission: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: [{ type: String }]
  },
  coreValues: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, default: "from-red-500 to-red-600" }
  }],
  stats: [{
    number: { type: String, required: true },
    label: { type: String, required: true }
  }],
  aboutCompany: {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  digitalTransformation: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }]
  },
  boardMembers: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
  }],
  leadershipTeam: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
  }],
  services: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 }
  }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);
