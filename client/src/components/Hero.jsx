
import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/api/hero`);
      const data = await response.json();
      if (data.success) {
        setHeroData(data.data);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const slides = heroData ? [
    {
      image: heroData.backgroundImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop",
      title: heroData.title || "Innovative Business Solutions",
      subtitle: heroData.subtitle || "Transform Your Enterprise",
      description: heroData.description || "Empowering businesses with comprehensive solutions.",
      color: "from-blue-600 to-purple-600"
    }
  ] : [
    {
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop",
      title: "Innovative Business Solutions",
      subtitle: "Transform Your Enterprise",
      description: "Empowering businesses for over 3 decades with comprehensive enterprise software solutions.",
      color: "from-blue-600 to-purple-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating 3D Shapes */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
          }}
        />
        <div 
          className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-2xl blur-xl animate-bounce"
          style={{
            transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0) rotateX(${mousePosition.y * -0.1}deg) rotateY(${mousePosition.x * -0.1}deg)`,
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * 0.8}px, ${mousePosition.y * -0.4}px, 0) rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
            animationDelay: '2s'
          }}
        />
        
        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-12"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent transform -rotate-12"></div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Parallax Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: `scale(1.1) translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px, 0)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
              
              {/* Animated Overlay Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </div>
            </div>

            {/* Content with 3D Transform */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div 
                  className={`transform transition-all duration-1000 delay-300 ${
                    index === currentSlide 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-10 opacity-0 scale-95'
                  }`}
                  style={{
                    transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.05}px, 0) ${
                      index === currentSlide ? 'translateY(0)' : 'translateY(40px)'
                    }`
                  }}
                >
                  {/* Subtitle with 3D Effect */}
                  <div className="relative mb-6">
                    <p className={`text-lg md:text-xl font-medium bg-gradient-to-r ${slide.color} bg-clip-text text-transparent mb-4 tracking-wide uppercase transform hover:scale-105 transition-transform duration-300`}>
                      {slide.subtitle}
                    </p>
                    <div className={`absolute -inset-1 bg-gradient-to-r ${slide.color} rounded-lg blur opacity-20 animate-pulse`}></div>
                  </div>
                  
                  {/* Main Title with Staggered Animation */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.title.split(' ').map((word, wordIndex) => (
                      <span 
                        key={wordIndex}
                        className={`inline-block transform transition-all duration-700 hover:scale-110 ${
                          index === currentSlide 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-4 opacity-0'
                        }`}
                        style={{
                          transitionDelay: `${wordIndex * 100 + 400}ms`,
                          textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </h1>
                  
                  {/* Description with Typewriter Effect */}
                  <p 
                    className={`text-lg md:text-xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed transform transition-all duration-1000 delay-700 ${
                      index === currentSlide 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-6 opacity-0'
                    }`}
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                  >
                    {slide.description}
                  </p>

                  {/* Enhanced CTA Buttons */}
                  <div 
                    className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-900 ${
                      index === currentSlide 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    <a
                      href="#contact"
                      className="group relative bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Free Quote
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </a>
                    
                    <a
                      href="#about"
                      className="group relative border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:border-white hover:bg-white/10 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Learn More
                        <svg className="w-5 h-5 ml-2 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 group bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 group bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-500 hover:scale-125 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-gradient-to-r from-red-600 to-red-500' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Floating Statistics Cards */}
      <div className="absolute bottom-20 left-8 z-20 hidden lg:block">
        <div 
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform hover:scale-105 transition-all duration-300"
          style={{
            transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.05}px, 0)`
          }}
        >
          <div className="text-3xl font-bold text-white mb-2">3+</div>
          <div className="text-gray-300 text-sm">Decades of Excellence</div>
        </div>
      </div>

      <div className="absolute bottom-20 right-8 z-20 hidden lg:block">
        <div 
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform hover:scale-105 transition-all duration-300"
          style={{
            transform: `translate3d(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.05}px, 0)`
          }}
        >
          <div className="text-3xl font-bold text-white mb-2">50+</div>
          <div className="text-gray-300 text-sm">Trusted Partners</div>
        </div>
      </div>

      </section>
  );
}
