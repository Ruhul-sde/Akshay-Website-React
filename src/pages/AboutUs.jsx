
import React, { useState, useEffect } from 'react';

export default function AboutUs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100,
      });
    };

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const stats = [
    { number: '150+', label: 'EMPLOYEES' },
    { number: '50+', label: 'CLIENTS' },
    { number: '26+', label: 'EXPERT CONSULTANTS' },
    { number: '100%', label: 'HAPPY CLIENTS' }
  ];

  const boardMembers = [
    {
      name: 'Mr. Anant C. V.',
      role: 'CHAIRMAN',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Anant is responsible for the overall management and supervision of the activities.'
    },
    {
      name: 'Ms. Nethraa Ganesan',
      role: 'MANAGING DIRECTOR',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'With over two decades of dynamic leadership experience with a MBA degree, Nethraa...'
    },
    {
      name: 'Mr. Akshay Anantapadmanabhan',
      role: 'DIRECTOR',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Akshay Anantapadmanabhan has been instrumental in driving the company forward...'
    }
  ];

  const leadershipTeam = [
    {
      name: 'Mr. Rajan Chelladurai',
      role: 'GLOBAL HEAD - ERP',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      description: 'With over 30 years of rich industry experience, Rajan Chelladurai serves as the Global Head - ERP at Akshay Software Technologies Private Limited.'
    },
    {
      name: 'Mrs. Bhavana Thapa',
      role: 'TALENT ACQUISITION - HR MANAGER',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      description: 'Bhavana leads Akshay\'s staffing and HR initiatives with a strong focus on sourcing the right talent and ensuring seamless client coordination.'
    }
  ];

  const services = [
    {
      title: 'SAP Business One',
      description: 'Scalable ERP solution streamlining business operations, finance, and inventory management.',
      icon: '💼'
    },
    {
      title: 'SAP Support',
      description: 'Expert assistance ensuring smooth SAP system performance, upgrades, and troubleshooting.',
      icon: '🛠️'
    },
    {
      title: 'IT Staffing',
      description: 'Providing skilled tech talent for projects, contracts, and full-time roles.',
      icon: '👥'
    },
    {
      title: 'Digital Marketing',
      description: 'Driving online growth through SEO, PPC, content and social media.',
      icon: '📱'
    },
    {
      title: 'AI Inside Sales',
      description: 'AI-powered lead generation, prospect engagement, and sales automation for businesses.',
      icon: '🤖'
    },
    {
      title: 'Cloud Hosting & Computing',
      description: 'Secure, scalable cloud infrastructure ensuring seamless data storage and processing.',
      icon: '☁️'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
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
          
          {/* Floating Icons */}
          <div className="absolute top-1/3 left-10 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          
          <div className="absolute top-1/4 right-10 w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Empowering businesses with Innovation & Excellence for over 38 years
          </p>
        </div>
      </section>

      {/* Vision, Mission, Core Values Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-100 to-purple-100 rounded-full blur-2xl"
            style={{
              transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px, 0)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Vision Section */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-blue-800 font-semibold text-sm">🎯 VISION</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be a top player in every line of business that we are in. To be technologically ahead always. To empower employees, clients and community.
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
                <span className="text-purple-800 font-semibold text-sm">💎 CORE VALUES</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Customer Care</h4>
                    <p className="text-gray-600 text-sm">Our customers' satisfaction is our success.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">People Care</h4>
                    <p className="text-gray-600 text-sm">We value our employees as our greatest asset.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Care</h4>
                    <p className="text-gray-600 text-sm">Excellence is our standard.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Investor Care</h4>
                    <p className="text-gray-600 text-sm">We build long-term relationships based on trust.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
              <span className="text-green-800 font-semibold text-sm">🚀 MISSION</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Provide efficient ERP Software Solutions, Staffing Solutions, and AI-driven Sales and Digital Marketing Solutions.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Enable organizations to focus on their core activities using the latest technology.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Nurture human capital to deliver quality services on time.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Foster continuous improvement and innovation.</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🎯</div>
                    <div className="font-bold">MISSION</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-red-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.2}px, 0)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-full mb-6">
              <span className="text-white font-semibold text-sm">📊 ABOUT COMPANY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering businesses with Innovation & Excellence for over <span className="text-red-400">38 years</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Founded in June 1987 by seasoned technocrats, Akshay Software Technologies Private Limited is an IT services company with offices in India and the UAE. Their offerings include SAP Business One ERP for SMEs, staffing solutions, and a team of certified consultants with extensive project experience across domains.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold text-red-400 mb-4 group-hover:text-white transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Transformation Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-100 rounded-full opacity-30"></div>
              
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Latest Technology Integration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl mb-2">☁️</div>
                    <div className="text-sm">Cloud Computing</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl mb-2">🤖</div>
                    <div className="text-sm">AI Solutions</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
                <span className="text-blue-800 font-semibold text-sm">🏢 A COMPANY</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Driving Digital Transformation using Modern Technology
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Under the new young leadership, Akshay has new initiatives as offerings – Cloud Hosting and Computing Services, AI (Akshay Intelligence), Digital marketing Agency, AI Inside Sales.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Cloud Hosting & Computing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Akshay Intelligence (AI)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Digital Marketing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">AI Inside Sales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-6">
              <span className="text-indigo-800 font-semibold text-sm">👥 Our</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Board Of Directors</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-sm font-medium text-red-600 mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
              <span className="text-purple-800 font-semibold text-sm">🌟 Our</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Leadership Team</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-sm font-medium text-purple-600 mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * 0.3}px, 0)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8">
              <span className="text-white font-semibold">EXPLORE OUR OFFERINGS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              We are continuously expanding our services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
