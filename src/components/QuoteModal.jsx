import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isOpen) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) / 100,
          y: (e.clientY - window.innerHeight / 2) / 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      company: '',
      message: ''
    });

    setIsSubmitting(false);
    onClose();

    // Show success message
    alert('Thank you! We will contact you soon.');
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fixed Overlay - Highest z-index */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            style={{ zIndex: 999999 }}
            onClick={onClose}
          />

          {/* Modal Container - Even higher z-index */}
          <div 
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9999999 }}
          >
            {/* Animated background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div 
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-500/20 to-purple-600/20 rounded-full blur-3xl"
                style={{
                  transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full blur-3xl"
                style={{
                  transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0)`
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 p-8 border-b border-white/20">
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 transition-all duration-300 shadow-lg hover:shadow-xl group z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Header Content */}
                <div className="text-center pr-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-purple-600 to-blue-600">
                      Get Your Free Quote
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Let's discuss your project requirements
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Form */}
              <div className="p-8">
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Form Fields */}
                  {[
                    { name: 'fullName', type: 'text', placeholder: 'Full Name', icon: '👤', required: true },
                    { name: 'phone', type: 'tel', placeholder: 'Phone Number', icon: '📱', required: true },
                    { name: 'email', type: 'email', placeholder: 'Email Address', icon: '✉️', required: true },
                    { name: 'company', type: 'text', placeholder: 'Company Name', icon: '🏢', required: false },
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      className="relative group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg z-10">
                          {field.icon}
                        </span>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          onFocus={() => setActiveField(field.name)}
                          onBlur={() => setActiveField(null)}
                          required={field.required}
                          placeholder={field.placeholder}
                          className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 hover:bg-white hover:shadow-md"
                        />
                        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-all duration-300 ${
                          activeField === field.name ? 'w-full' : 'w-0'
                        }`}></div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Message Field */}
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-lg z-10">💬</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setActiveField('message')}
                        onBlur={() => setActiveField(null)}
                        placeholder="Project Requirements"
                        rows="4"
                        className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 hover:bg-white hover:shadow-md resize-none"
                      />
                      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-all duration-300 ${
                        activeField === 'message' ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="pt-4"
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group disabled:opacity-70"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <span className="mr-2">🚀</span>
                            GET FREE CONSULTATION
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </motion.button>
                  </motion.div>
                </motion.form>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 text-center"
                >
                  <p className="text-sm text-gray-500">
                    🔒 Your information is secure and confidential
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}