
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Ticket = require("../models/Ticket");
const authMiddleware = require("../middleware/auth");
const { sendTicketNotification } = require("../services/emailService");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/tickets');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|mov|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
  }
});

// Create ticket
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;
    
    // Validation
    if (!subject || !description) {
      return res.status(400).json({ error: "Subject and description are required" });
    }
    
    const ticketCount = await Ticket.countDocuments();
    const ticketNumber = `TKT-${String(ticketCount + 1).padStart(6, '0')}`;

    const ticket = new Ticket({
      ticketNumber,
      userId: req.user.id,
      userEmail: req.user.email,
      userName: req.user.name || req.user.email,
      subject,
      description,
      category: category || 'technical',
      priority: priority || 'medium',
      status: 'open'
    });

    await ticket.save();
    
    // Send email notification to admin
    sendTicketNotification(ticket).catch(err => {
      console.error("Failed to send email notification:", err);
    });
    
    res.json(ticket);
  } catch (err) {
    console.error("Error creating ticket:", err.message);
    res.status(500).json({ error: "Server error", message: err.message });
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

// Add response to ticket with file upload
router.post("/:id/response", authMiddleware, upload.array('files', 5), async (req, res) => {
  try {
    const { message } = req.body;
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const attachments = req.files ? req.files.map(file => ({
      name: file.originalname,
      url: `/uploads/tickets/${file.filename}`,
      type: file.mimetype,
      size: file.size
    })) : [];

    ticket.responses.push({
      message: message || '',
      sender: req.user.name || req.user.email,
      senderType: req.user.role === 'admin' ? 'admin' : 'user',
      timestamp: Date.now(),
      attachments
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
