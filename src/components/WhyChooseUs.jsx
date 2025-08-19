import React, { useState, useEffect } from 'react';

export default function WhyChooseUs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      number: "01",
      title: "3+ Decades of Excellence",
      description: "With over 30 years in the industry, we bring unparalleled experience and expertise to every project.",
      color: "from-red-500 to-red-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "02", 
      title: "Comprehensive Solutions",
      description: "From SAP implementation to AI-driven automation, we offer end-to-end technology solutions.",
      color: "from-blue-500 to-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Expert Team",
      description: "Our certified professionals stay ahead of technology trends to deliver cutting-edge solutions.",
      color: "from-green-500 to-emerald-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "24/7 Support",
      description: "Round-the-clock support ensures your business operations never skip a beat.",
      color: "from-purple-500 to-indigo-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      )
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

    const section = document.getElementById('why-choose-us');
    if (section) observer.observe(section);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="why-choose-us" className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Background Orbs with 3D Effect */}
        <div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0) rotateX(${mousePosition.y * 0.1}deg)`
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-teal-600/20 rounded-full filter blur-3xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0) rotateY(${mousePosition.x * 0.1}deg)`,
            animationDelay: '2s'
          }}
        />

        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent transform rotate-12"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent transform -rotate-12"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/2 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Enhanced Content */}
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="relative mb-8">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Why Choose 
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-pulse">
                  Akshay?
                </span>
              </h2>

              {/* Decorative Line */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent rounded-full"></div>
            </div>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              We combine decades of experience with cutting-edge technology to deliver 
              solutions that transform businesses and drive exponential growth.
            </p>

            {/* Enhanced Features List */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`group flex items-start space-x-6 transform transition-all duration-700 hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    transform: `translate3d(${mousePosition.x * (index % 2 === 0 ? 0.1 : -0.1)}px, ${mousePosition.y * 0.05}px, 0)`
                  }}
                >
                  {/* Enhanced Number Badge */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/20`}>
                      <span className="text-white font-bold text-lg">{feature.number}</span>

                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl`}></div>
                    </div>

                    {/* Icon Overlay */}
                    <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg`}>
                      {feature.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${feature.color} transition-all duration-500`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Enhanced 3D Visual Element */}
          <div 
            className={`relative transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
            style={{
              transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px, 0)`
            }}
          >
            <div className="relative">
              {/* Main Stats Card with 3D Effect */}
              <div className="relative bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-700 border border-white/20 backdrop-blur-sm group">
                {/* Card Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-2xl"></div>

                <div className="relative z-10 text-center">
                  {/* Main Statistic */}
                  <div className="mb-8">
                    <div className="text-7xl lg:text-8xl font-bold mb-4 text-white drop-shadow-2xl">
                      30+
                    </div>
                    <div className="text-2xl mb-6 text-white/90 font-medium">
                      Years of Innovation
                    </div>
                  </div>

                  {/* Sub Statistics Grid */}
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { number: '500+', label: 'Projects Delivered' },
                      { number: '50+', label: 'Happy Clients' },
                      { number: '99%', label: 'Success Rate' },
                      { number: '24/7', label: 'Support' }
                    ].map((stat, index) => (
                      <div 
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                          {stat.number}
                        </div>
                        <div className="text-sm text-white/80 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div 
                className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30 animate-pulse"
                style={{
                  transform: `translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.1}px, 0)`
                }}
              />
              <div 
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl opacity-40 animate-bounce"
                style={{
                  transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px, 0)`,
                  animationDelay: '1s'
                }}
              />
              <div 
                className="absolute top-1/2 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-50 animate-ping"
                style={{
                  transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * -0.1}px, 0)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}