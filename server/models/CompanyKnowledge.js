
const mongoose = require("mongoose");

const CompanyKnowledgeSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['company_info', 'services', 'industries', 'testimonials', 'contact', 'leadership', 'achievements']
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  keywords: [{
    type: String,
    lowercase: true
  }],
  metadata: {
    type: Object,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Index for faster search
CompanyKnowledgeSchema.index({ keywords: 1, category: 1 });
CompanyKnowledgeSchema.index({ question: 'text', answer: 'text' });

CompanyKnowledgeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("CompanyKnowledge", CompanyKnowledgeSchema);
