import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
        const response = await fetch(`${apiUrl}/footer`);
        const data = await response.json();
        if (data.success) {
          setFooterData(data.data);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading || !footerData) {
    return null;
  }

  const getSocialIcon = (name) => {
    const icons = {
      LinkedIn: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z',
      Twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
      Facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
    };
    return icons[name] || '';
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CTA Section */}
        <div className="text-center mb-12 pb-12 border-b border-gray-700/50">
          <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
            {footerData.cta.title}
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{footerData.cta.subtitle}</p>
          <Link
            to={footerData.cta.buttonLink}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {footerData.cta.buttonText}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">{footerData.company.logo}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{footerData.company.name}</h3>
                <p className="text-xs text-gray-400">{footerData.company.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{footerData.company.description}</p>

            {/* Contact Info */}
            <div className="space-y-2">
              <a href={`mailto:${footerData.contact.email}`} className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {footerData.contact.email}
              </a>
              <a href={`tel:${footerData.contact.phone}`} className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {footerData.contact.phone}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-4">
              {footerData.social.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-9 h-9 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getSocialIcon(social.name)} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerData.sections.sort((a, b) => a.order - b.order).map((section, index) => (
            <div key={index}>
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                </svg>
                <h4 className="font-bold text-white">{section.title}</h4>
              </div>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.isExternal ? (
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.url} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {footerData.company.name}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {footerData.legal.map((item, index) => (
              <Link key={index} to={item.url} className="text-sm text-gray-400 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}