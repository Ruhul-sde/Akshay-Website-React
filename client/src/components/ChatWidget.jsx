
import React, { useState, useRef, useEffect } from 'react';

const API_URL = '/api/chat';
const CHATBOT_CONFIG_URL = '/api/chatbot/config';
const CONTACT_SUBMIT_URL = '/contact/submit';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [chatbotConfig, setChatbotConfig] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current && !showContactForm) {
      inputRef.current.focus();
    }
  }, [messages, isOpen, showContactForm]);

  // Fetch chatbot configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
        const response = await fetch(`${apiUrl}${CHATBOT_CONFIG_URL}`);
        const data = await response.json();
        
        if (data.success) {
          setChatbotConfig(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch chatbot config:', error);
      }
    };

    fetchConfig();
  }, []);

  // Initialize chat session - clear history on new visit
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch(`${API_URL}/session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: null })
        });

        const data = await response.json();
        setSessionId(data.sessionId);
        
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages.map(msg => ({
            id: Date.now() + Math.random(),
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          })));
        }
      } catch (error) {
        console.error('Failed to initialize chat session:', error);
        setMessages([{
          id: 1,
          text: "How can I help you understand more about Akshay Software Technologies and its Services?",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    };

    initSession();
  }, []);

  const typeMessage = (text, callback) => {
    let index = 0;
    setTypingText('');
    setIsTyping(true);
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTypingText('');
        callback();
      }
    }, 30);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessageText = inputMessage;
    const newMessage = {
      id: Date.now(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          message: userMessageText
        })
      });

      const data = await response.json();

      if (data.botMessage) {
        const botMessageText = data.botMessage.text;
        const botTimestamp = new Date(data.botMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        typeMessage(botMessageText, () => {
          const botResponse = {
            id: Date.now() + 1,
            text: botMessageText,
            sender: 'bot',
            timestamp: botTimestamp
          };

          setMessages(prev => [...prev, botResponse]);

          if (!isOpen) {
            setUnreadCount(prev => prev + 1);
          }
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorText = "I'm sorry, I'm having trouble connecting. Please try again or contact our support team.";
      
      typeMessage(errorText, () => {
        const errorResponse = {
          id: Date.now() + 1,
          text: errorText,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorResponse]);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageWithLinks = (text) => {
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
    
    let parts = cleanText.split(emailRegex);
    
    return parts.map((part, index) => {
      if (emailRegex.test(part)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="underline hover:text-blue-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      
      const phoneParts = part.split(phoneRegex);
      return phoneParts.map((phonePart, phoneIndex) => {
        if (phoneRegex.test(phonePart) && phonePart.replace(/\D/g, '').length >= 10) {
          const cleanPhone = phonePart.replace(/\D/g, '');
          return (
            <a
              key={`${index}-${phoneIndex}`}
              href={`tel:${cleanPhone}`}
              className="underline hover:text-blue-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {phonePart}
            </a>
          );
        }
        return <span key={`${index}-${phoneIndex}`}>{phonePart}</span>;
      });
    });
  };

  const handleQuickReply = (reply) => {
    if (reply === "Contact Us") {
      setShowContactForm(true);
    } else {
      setInputMessage(reply);
      inputRef.current.focus();
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateContactForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^[\d\s+()-]{7,}$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateContactForm()) return;

    setFormLoading(true);

    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}${CONTACT_SUBMIT_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowContactForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        
        const successMessage = {
          id: Date.now(),
          text: "Thank you for contacting us! We'll get back to you soon.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, successMessage]);
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      setShowContactForm(false);
    }
  };

  const quickReplies = chatbotConfig?.quickReplies || ["SAP", "Cloud Solutions", "Staffing", "AI Solutions"];
  const headerTitle = chatbotConfig?.header?.title || "Akshay Software";
  const headerSubtitle = chatbotConfig?.header?.subtitle || "AI Assistant";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`absolute bottom-0 right-0 w-[380px] bg-white rounded-3xl shadow-2xl transition-all duration-500 ease-in-out transform ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
      }`}>

        {/* Chat Header */}
        <div className="bg-gradient-to-br from-red-500 via-purple-500 to-red-600 text-white p-4 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 bg-white/25 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">{headerTitle}</h3>
                <p className="text-xs text-white/80 font-medium">{headerSubtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/15 backdrop-blur-sm"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Replies - Top Section */}
        <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
          <div className="flex flex-wrap gap-1.5">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="bg-white hover:bg-gradient-to-r hover:from-red-50 hover:to-purple-50 text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-300 text-xs font-semibold shadow-sm hover:shadow-md transform hover:scale-105"
              >
                {reply}
              </button>
            ))}
            {chatbotConfig?.contactForm?.enabled && (
              <button
                onClick={() => handleQuickReply("Contact Us")}
                className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-semibold shadow-sm hover:shadow-md transform hover:scale-105"
              >
                Contact Us
              </button>
            )}
          </div>
        </div>

        {/* Contact Form or Messages Area */}
        {showContactForm ? (
          <div className="h-[320px] overflow-y-auto bg-gradient-to-b from-white to-gray-50/30 p-4">
            <div className="mb-4">
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Chat
              </button>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{chatbotConfig?.contactForm?.title || "Contact Us"}</h3>
            <p className="text-xs text-gray-600 mb-4">{chatbotConfig?.contactForm?.description || "Fill out the form and we'll get back to you soon"}</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Full Name *"
                  className={`w-full px-3 py-2 text-sm border ${formErrors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email Address *"
                  className={`w-full px-3 py-2 text-sm border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Phone Number *"
                  className={`w-full px-3 py-2 text-sm border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="Company Name"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  placeholder="Subject *"
                  className={`w-full px-3 py-2 text-sm border ${formErrors.subject ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Your Message *"
                  rows="3"
                  className={`w-full px-3 py-2 text-sm border ${formErrors.message ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none`}
                ></textarea>
                {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {formLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        ) : (
          <div className="h-[320px] overflow-y-auto bg-gradient-to-b from-white to-gray-50/30 p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-red-500 to-purple-600 text-white rounded-2xl rounded-tr-md shadow-md'
                    : 'bg-white text-gray-800 rounded-2xl rounded-tl-md shadow-sm border border-gray-100'
                } px-3.5 py-2.5`}>
                  <p className="text-sm leading-relaxed">{renderMessageWithLinks(message.text)}</p>
                  <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white text-gray-800 px-3.5 py-2.5 rounded-2xl rounded-tl-md shadow-sm border border-gray-100 min-h-[44px]">
                  {typingText ? (
                    <div>
                      <p className="text-sm leading-relaxed">{renderMessageWithLinks(typingText)}</p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        {!showContactForm && (
          <div className="p-3 bg-gradient-to-br from-white to-gray-50/50 border-t border-gray-100 rounded-b-3xl">
            <div className="flex items-center space-x-2 bg-white rounded-xl p-1.5 border border-gray-200 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-all duration-200 shadow-sm">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent px-3 py-2 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  inputMessage.trim() === ''
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-br from-red-500 to-purple-600 text-white hover:shadow-md transform hover:scale-105 active:scale-95'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="group relative bg-gradient-to-br from-red-500 via-purple-500 to-red-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center overflow-hidden"
          aria-label="Open chat"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-purple-600 to-red-700 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full"></div>

          <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          {unreadCount > 0 && (
            <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg animate-pulse">
              {unreadCount}
            </div>
          )}

          <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
        </button>
      )}
    </div>
  );
}
