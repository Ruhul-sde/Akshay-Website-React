import React, { useState, useEffect } from 'react';

export default function AboutCompany() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/api/about-company`);
      const data = await response.json();
      if (data.success) {
        setAboutData(data.data);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

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

    const section = document.getElementById('about-company');
    if (section) observer.observe(section);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="about-company" className="relative py-24 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-red-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0) rotateX(${mousePosition.y * 0.1}deg)`
          }}
        />
        <div 
          className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-teal-600/10 rounded-2xl blur-2xl animate-bounce"
          style={{
            transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0) rotateY(${mousePosition.x * 0.1}deg)`,
            animationDelay: '1s'
          }}
        />

        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/10 to-transparent transform rotate-12"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="relative mb-8">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {aboutData?.title || 'Transforming Businesses for 3+ Decades'}
              </h2>

              {/* Decorative Element */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-red-600 to-transparent rounded-full"></div>
            </div>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {aboutData?.description || 'Akshay Software Technologies has been at the forefront of digital transformation.'}
            </p>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Expert Implementation",
                  description: "Seamless software deployment and integration",
                  color: "from-red-500 to-red-600",
                  bgColor: "from-red-50 to-red-100"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Innovation Driven",
                  description: "Cutting-edge technology solutions for modern businesses",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`group relative bg-gradient-to-br ${feature.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/50`}
                  style={{
                    transform: `translate3d(${mousePosition.x * (index % 2 === 0 ? 0.1 : -0.1)}px, ${mousePosition.y * 0.05}px, 0)`
                  }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>

                  <div className="relative z-10 flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <a
              href="#about"
              className="group relative inline-flex items-center bg-gradient-to-r from-red-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                More About Us
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>

              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          </div>

          {/* Right Image Section with 3D Effects */}
          <div 
            className={`relative transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
            style={{
              transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px, 0)`
            }}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-700 group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Enhanced Floating Stats */}
              <div 
                className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-110 transition-all duration-500 group"
                style={{
                  transform: `translate3d(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.05}px, 0)`
                }}
              >
                <div className="relative">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mb-2">3+</div>
                  <div className="text-gray-600 font-medium">Decades</div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                </div>
              </div>

              <div 
                className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-110 transition-all duration-500 group"
                style={{
                  transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.05}px, 0)`
                }}
              >
                <div className="relative">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-2">50+</div>
                  <div className="text-gray-600 font-medium">Partners</div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                </div>
              </div>

              {/* Additional Floating Elements */}
              <div className="absolute top-1/2 -left-6 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/4 -right-4 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}