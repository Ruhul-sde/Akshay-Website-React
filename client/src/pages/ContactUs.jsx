
import React, { useState, useEffect } from 'react';
import QuoteModal from '../components/QuoteModal';

export default function ContactUs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      company: '',
      message: ''
    });
    alert('Thank you for your inquiry! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section with 3D Background */}
      <section className="relative py-24 bg-gradient-to-br from-red-500 via-purple-600 to-blue-600 text-white overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0) rotateX(${mousePosition.y * 0.1}deg)`
            }}
          />
          <div 
            className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl blur-2xl animate-bounce"
            style={{
              transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0) rotateY(${mousePosition.x * 0.1}deg)`,
              animationDelay: '1s'
            }}
          />
          
          {/* Geometric shapes */}
          <div className="absolute top-1/2 left-10 w-6 h-6 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/4 right-10 w-4 h-4 bg-white/40 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Get in touch with us to discuss your business requirements and discover how we can help you grow.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Subtle 3D background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-100 to-purple-100 rounded-full blur-2xl"
            style={{
              transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px, 0)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Connect With Us Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:scale-105">
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop" 
                  alt="Connect with us" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect With Us</h3>
                <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                <p className="text-lg font-semibold text-red-600">info@akshay.com</p>
              </div>
            </div>

            {/* Call Us Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:scale-105">
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" 
                  alt="Call us" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our experts for immediate assistance.</p>
                <p className="text-lg font-semibold text-purple-600">+91-22-6712 6060</p>
              </div>
            </div>

            {/* Visit Our Office Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:scale-105">
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" 
                  alt="Visit our office" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Our Office</h3>
                <p className="text-gray-600 mb-4">Come visit us at our Mumbai office for a face-to-face consultation.</p>
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                  Unit 214, Building 2, Sector-I, Millennium Business Park,<br />
                  Mahape, Navi Mumbai - 400710.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.2}px, 0)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Us on Map</h2>
            <p className="text-gray-600 text-lg">Located in the heart of Navi Mumbai's business district</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600">Map integration would be implemented here</p>
                <p className="text-sm text-gray-500 mt-2">Akshay Software Technologies Private Limited</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-red-100/50 to-purple-100/50 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.2}px, 0) rotateX(${mousePosition.y * 0.1}deg)`
            }}
          />
          <div 
            className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-blue-100/50 to-teal-100/50 rounded-2xl blur-2xl animate-bounce"
            style={{
              transform: `translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * 0.3}px, 0)`,
              animationDelay: '1s'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>SEND US A MAIL</span>
              </button>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
              Let's discuss your requirement together
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            <div className="mb-8">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="6"
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white resize-none"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
}
