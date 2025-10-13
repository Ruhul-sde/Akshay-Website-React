
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, default: 'medium' },
  status: { type: String, default: 'open' },
  assignedTo: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  responses: [{
    message: String,
    sender: String,
    senderType: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model("Ticket", ticketSchema);
