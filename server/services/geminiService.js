// Gemini AI Service for Chatbot
// Reference: blueprint:javascript_gemini

const { GoogleGenAI } = require("@google/genai");
const CompanyKnowledge = require("../models/CompanyKnowledge");

// Initialize Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Search knowledge base for relevant information
 * @param {string} query - User's query
 * @returns {Promise<Array>} - Relevant knowledge entries
 */
async function searchKnowledge(query) {
  try {
    // Extract keywords from query
    const keywords = query.toLowerCase().split(' ').filter(word => word.length > 3);
    
    // Search by keywords and text
    const results = await CompanyKnowledge.find({
      isActive: true,
      $or: [
        { keywords: { $in: keywords } },
        { $text: { $search: query } }
      ]
    }).limit(5);

    return results;
  } catch (error) {
    console.error("Knowledge search error:", error);
    return [];
  }
}

/**
 * Generate chatbot response using Gemini AI
 * @param {string} userMessage - The user's message
 * @param {Array} conversationHistory - Previous conversation messages
 * @returns {Promise<string>} - AI generated response
 */
async function generateChatResponse(userMessage, conversationHistory = []) {
  try {
    // Search knowledge base for relevant context
    const knowledgeResults = await searchKnowledge(userMessage);
    let contextInfo = '';
    
    if (knowledgeResults.length > 0) {
      contextInfo = '\n\nRelevant Company Information:\n' + 
        knowledgeResults.map(k => `Q: ${k.question}\nA: ${k.answer}`).join('\n\n');
    }

    // Build system instruction with knowledge base context
    const systemInstruction = `You are a helpful AI assistant for Akshay Software Technologies. 
You help customers with information about:
- SAP Business One Solutions
- SAP S/4HANA Implementation
- Cloud Solutions (Cloud Hosting Services)
- AI Solutions (AI Digital Marketing, AI Inside Sales)
- IT Staffing Services
- ERP Solutions
- Payroll Management
- E-Invoicing Solutions

Company Details:
- Founded: 1987 (37+ years of experience)
- Headquarters: Mumbai, India
- Global Offices: Dubai, UAE
- Contact: info@akshay.com | +91-22-6712 6060
- Website: www.akshay.com

Use the following knowledge base when answering questions:${contextInfo}

Be friendly, professional, and provide accurate information based on the knowledge base. 
If asked about pricing or specific details not in the knowledge base, encourage them to contact the sales team at info@akshay.com or request a free quote.`;

    // Build contents array with conversation history
    const contents = [];
    
    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }
    
    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    // Extract text from response
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        const text = candidate.content.parts.map(part => part.text).join('');
        return text || "I'm sorry, I couldn't generate a response. Please try again.";
      }
    }
    
    return "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    
    // Fallback response if API fails
    if (error.message.includes('API key') || error.message.includes('API_KEY')) {
      return "I'm currently unable to respond. Please contact our support team for assistance.";
    }
    
    return "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team.";
  }
}

/**
 * Analyze user intent from message
 * @param {string} message - User's message
 * @returns {Promise<string>} - Detected intent
 */
async function analyzeIntent(message) {
  try {
    const prompt = `Analyze the following user message and classify it into one of these intents:
- inquiry (asking for information)
- pricing (asking about costs or quotes)
- support (technical help or issue)
- sales (interested in buying/demo)
- general (casual conversation)

Message: "${message}"

Respond with only the intent category.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    // Extract text from response
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        const text = candidate.content.parts.map(part => part.text).join('').trim().toLowerCase();
        return text || "general";
      }
    }

    return "general";
  } catch (error) {
    console.error("Intent Analysis Error:", error.message);
    return "general";
  }
}

module.exports = {
  generateChatResponse,
  analyzeIntent,
  searchKnowledge
};
