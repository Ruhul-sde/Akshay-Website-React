
const express = require("express");
const Ticket = require("../models/Ticket");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create ticket
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;
    
    const ticketCount = await Ticket.countDocuments();
    const ticketNumber = `TKT-${String(ticketCount + 1).padStart(6, '0')}`;

    const ticket = new Ticket({
      ticketNumber,
      userId: req.user.id,
      userEmail: req.user.email,
      userName: req.user.name || req.user.email,
      subject,
      description,
      category,
      priority,
      status: 'open'
    });

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user tickets
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all tickets (admin only)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }
    
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update ticket status
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }

    const { status, assignedTo } = req.body;
    
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, assignedTo, updatedAt: Date.now() },
      { new: true }
    );

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Add response to ticket
router.post("/:id/response", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.responses.push({
      message,
      sender: req.user.name || req.user.email,
      senderType: req.user.role === 'admin' ? 'admin' : 'user',
      timestamp: Date.now()
    });

    ticket.updatedAt = Date.now();
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
