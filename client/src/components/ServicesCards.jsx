import React, { useState, useEffect } from 'react';

export default function ServicesCards() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/api/services`);
      const data = await response.json();
      if (data.success) {
        setServicesData(data.data);
      }
    } catch (error) {
      console.error('Error fetching services data:', error);
    }
  };

  const defaultServices = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "SAP Solutions",
      description: "Comprehensive SAP Business One implementation, support, and consulting services to streamline your enterprise operations.",
      link: "#sap",
      color: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 via-blue-100 to-blue-50"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "IT Staffing",
      description: "Connect with top-tier IT professionals and comprehensive payroll management solutions to scale your team efficiently.",
      link: "#staffing",
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 via-emerald-100 to-green-50"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Artificial Intelligence",
      description: "Leverage cutting-edge AI solutions including digital marketing automation and inside sales optimization.",
      link: "#ai",
      color: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 via-indigo-100 to-purple-50"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: "Cloud Hosting",
      description: "Secure, scalable cloud hosting solutions to ensure your applications run smoothly and efficiently.",
      link: "#cloud",
      color: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 via-pink-100 to-red-50"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const section = document.getElementById('services-cards');
    if (section) observer.observe(section);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="services-cards" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-red-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0) rotateX(${mousePosition.y * 0.1}deg)`
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-teal-600/10 rounded-2xl blur-2xl animate-bounce"
          style={{
            transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0) rotateY(${mousePosition.x * 0.1}deg)`,
            animationDelay: '1s'
          }}
        />

        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-10 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 transform rotate-45 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-600 to-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions to drive your business forward with innovation and excellence
            </p>

            {/* Decorative Line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(servicesData?.services?.sort((a, b) => a.order - b.order) || defaultServices).map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 p-8 border border-gray-200/50 transform hover:scale-105 hover:-translate-y-4 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transform: `translate3d(${mousePosition.x * (index % 2 === 0 ? 0.1 : -0.1)}px, ${mousePosition.y * 0.05}px, 0) ${
                  isVisible ? 'translateY(0)' : 'translateY(40px)'
                }`
              }}
            >
              {/* 3D Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}></div>

              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Enhanced Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  {service.icon}

                  {/* Icon Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg`}></div>
                </div>

                {/* Title with Gradient on Hover */}
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.color} transition-all duration-500`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Enhanced CTA Link */}
                <a
                  href={service.link}
                  className={`inline-flex items-center font-semibold text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r ${service.color} transition-all duration-300 group/link`}
                >
                  Learn more
                  <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Floating Particles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div 
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started Today
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>

              {/* Button Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}