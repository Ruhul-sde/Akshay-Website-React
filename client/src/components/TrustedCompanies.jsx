import React, { useState, useEffect } from 'react';

export default function TrustedCompanies() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [companiesData, setCompaniesData] = useState(null);

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  const fetchCompaniesData = async () => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/api/trusted-companies`);
      const data = await response.json();
      if (data.success) {
        setCompaniesData(data.data);
      }
    } catch (error) {
      console.error('Error fetching companies data:', error);
    }
  };

  const companies = companiesData?.companies?.sort((a, b) => a.order - b.order) || [
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png' }
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

    const section = document.getElementById('trusted-companies');
    if (section) observer.observe(section);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="trusted-companies" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0) rotateX(${mousePosition.y * 0.1}deg)`
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-red-400/10 to-orange-600/10 rounded-2xl blur-2xl animate-bounce"
          style={{
            transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0) rotateY(${mousePosition.x * 0.1}deg)`,
            animationDelay: '1s'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">Leading Companies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We partner with industry leaders to deliver exceptional solutions that drive digital transformation
            </p>
          </div>
        </div>

        {/* 3D Company Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: `translate3d(${mousePosition.x * (index % 2 === 0 ? 0.1 : -0.1)}px, ${mousePosition.y * 0.05}px, 0)`
              }}
            >
              {/* 3D Container */}
              <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-gray-200/50">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                {/* Logo Container */}
                <div className="relative z-10 flex justify-center items-center h-16">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 w-auto opacity-70 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }}
                  />
                </div>

                {/* Company Name */}
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {company.name}
                  </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '50+', label: 'Trusted Partners' },
            { number: '3+', label: 'Decades of Excellence' },
            { number: '100%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`text-center transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <div className="relative">
                <h3 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>

                {/* Decorative Element */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600/5 to-purple-600/5 rounded-xl -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}