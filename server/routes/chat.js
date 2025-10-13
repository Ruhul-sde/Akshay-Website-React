const express = require("express");
const router = express.Router();
const ChatConversation = require("../models/ChatConversation");
const { generateChatResponse, analyzeIntent } = require("../services/geminiService");
const crypto = require('crypto');
const { chatLimiter } = require("../middleware/rateLimiter");

// Generate UUID using Node's built-in crypto
const uuidv4 = () => crypto.randomUUID();

// Create or get chat session
router.post("/session", async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (sessionId) {
      // Try to find existing session
      const session = await ChatConversation.findOne({ sessionId });
      if (session) {
        return res.json({ sessionId: session.sessionId, messages: session.messages });
      }
    }
    
    // Create new session
    const newSessionId = uuidv4();
    const welcomeMessage = {
      text: "Hello! I'm here to help. How can I assist you with Akshay Software Technologies and its Services?",
      sender: 'bot',
      timestamp: new Date(),
      intent: 'general'
    };
    
    const newSession = new ChatConversation({
      sessionId: newSessionId,
      messages: [welcomeMessage],
      userInfo: {
        ip: req.ip,
        userAgent: req.get('user-agent')
      }
    });
    
    await newSession.save();
    
    res.json({ sessionId: newSessionId, messages: [welcomeMessage] });
  } catch (error) {
    console.error("Session Error:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Send message and get AI response
router.post("/message", chatLimiter, async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    // Find or create session
    let session = await ChatConversation.findOne({ sessionId });
    
    if (!session) {
      // Create new session if not found
      const newSessionId = sessionId || uuidv4();
      session = new ChatConversation({
        sessionId: newSessionId,
        messages: [],
        userInfo: {
          ip: req.ip,
          userAgent: req.get('user-agent')
        }
      });
    }
    
    // Analyze intent
    const intent = await analyzeIntent(message);
    
    // Add user message
    const userMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date(),
      intent
    };
    session.messages.push(userMessage);
    
    // Generate AI response using conversation history
    const conversationHistory = session.messages.slice(-10); // Last 10 messages for context
    const aiResponse = await generateChatResponse(message, conversationHistory);
    
    // Add bot response
    const botMessage = {
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date(),
      intent: 'response'
    };
    session.messages.push(botMessage);
    
    // Save session
    await session.save();
    
    res.json({
      sessionId: session.sessionId,
      userMessage,
      botMessage,
      intent
    });
  } catch (error) {
    console.error("Message Error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

// Get conversation history
router.get("/history/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await ChatConversation.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    
    res.json({ messages: session.messages });
  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
