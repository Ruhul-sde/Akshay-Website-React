
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import QuoteModal from './QuoteModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/navigation/menu`);
      const data = await response.json();
      
      if (data.success) {
        setNavItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconPath) => {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
    );
  };

  const navItemsStatic = [
    { 
      label: 'Home',
      href: '/',
      hasDropdown: false,
      isRoute: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'SAP',
      href: '#',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      dropdown: [
        { label: 'SAP Business One Solution', href: '/sap-business-one' },
        { label: 'SAP Business One Implementation Partner', href: '/sap-implementation' },
        { label: 'SAP Business One Support', href: '/sap-support' },
        { label: 'SAP B1 Add Ons', href: '/sap-addons' },
        { label: 'SAP S/4HANA', href: '/sap-s4hana' },
        { label: 'Grow with SAP', href: '/grow-with-sap' },
        { label: 'Rise with SAP', href: '/rise-with-sap' },
        { label: 'E-Invoicing', href: '/e-invoicing' },
        { label: 'SAP Case Studies', href: '/sap-case-studies' }
      ]
    },
    {
      label: 'Staffing',
      href: '#',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      dropdown: [
        { label: 'IT Staffing', href: '/it-staffing' },
        { label: 'Payroll Management', href: '/payroll-management' }
      ]
    },
    {
      label: 'Cloud',
      href: '#',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      dropdown: [
        { label: 'Cloud Hosting', href: '/cloud-hosting' }
      ]
    },
    {
      label: 'AI',
      href: '#',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      dropdown: [
        { label: 'Akshay Intelligence', href: '/akshay-intelligence' },
        { label: 'AI – Digital Marketing', href: '/ai-digital-marketing' },
        { label: 'AI Inside Sales', href: '/ai-inside-sales' }
      ]
    },
    {
      label: 'ERP',
      href: '#',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      dropdown: [
        { label: 'Crest ERP', href: '/crest-erp' },
        { label: 'Case Studies', href: '/erp-case-studies' }
      ]
    },
    { 
      label: 'Blog',
      href: '/blog',
      hasDropdown: false,
      isRoute: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      label: 'About',
      href: '/about',
      hasDropdown: false,
      isRoute: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: 'Contact',
      href: '/contact',
      hasDropdown: false,
      isRoute: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      label: 'Support',
      href: '/support',
      hasDropdown: false,
      isRoute: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const handleMouseEnter = (index) => {
    clearTimeout(hoverTimeout);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  const keepDropdownOpen = () => {
    clearTimeout(hoverTimeout);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-2xl shadow-2xl shadow-purple-500/10 border-b border-white/20' 
        : 'bg-gradient-to-b from-white/95 to-white/85 backdrop-blur-xl'
    }`}>
      {/* Animated gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 transition-all duration-700 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-pulse opacity-50"></div>
      </div>

      <div className="max-w-8xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo with glow effect */}
          <div className="flex-shrink-0 relative">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                
                {/* Logo container */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 p-2 rounded-xl border border-gray-200/50 group-hover:border-purple-300 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                  <img 
                    src={logo} 
                    alt="Akshay Software Technologies" 
                    className="h-10 w-auto object-contain transition-all duration-500 group-hover:brightness-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-10 h-10 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 items-center justify-center rounded-lg">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className="relative flex items-center gap-2 px-4 py-2.5 text-base font-semibold text-gray-700 hover:text-purple-600 transition-all duration-300 rounded-xl group/link"
                  >
                    <span className="transform group-hover/link:scale-110 transition-transform duration-300">{renderIcon(item.icon)}</span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-purple-600 transform origin-left transition-all duration-300 scale-x-0 group-hover/link:scale-x-100 rounded-full"></span>
                    </span>
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="relative flex items-center gap-2 px-4 py-2.5 text-base font-semibold text-gray-700 hover:text-purple-600 transition-all duration-300 rounded-xl group/link"
                  >
                    <span className="transform group-hover/link:scale-110 transition-transform duration-300">{renderIcon(item.icon)}</span>
                    <span className="relative">
                      {item.label}
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-purple-600 transform origin-left transition-all duration-300 rounded-full ${
                        activeDropdown === index ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'
                      }`}></span>
                    </span>
                    {item.hasDropdown && (
                      <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>
                )}

                {/* Modern Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-purple-200/50 py-2 z-50 overflow-hidden animate-in slide-in-from-top-3 duration-300"
                    onMouseEnter={keepDropdownOpen}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-purple-50/50 to-blue-50/50 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.href}
                        className="relative block px-5 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 transition-all duration-300 group/item"
                      >
                        <div className="flex items-center justify-between">
                          <span className="relative z-10 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-full transform scale-0 group-hover/item:scale-100 transition-transform duration-300"></span>
                            {dropdownItem.label}
                          </span>
                          <svg className="w-4 h-4 opacity-0 transform -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              ))
            )}
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden lg:block ml-4">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="relative group overflow-hidden bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-base font-bold transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Free Quote
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
            </button>
          </div>

          {/* Modern Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-3 rounded-xl text-gray-700 hover:text-purple-600 focus:outline-none transition-all duration-300 hover:bg-purple-50 group"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5 w-6">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'w-full'}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'w-4 ml-auto'}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'w-full'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Modern Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="mt-4 space-y-2 bg-gradient-to-br from-white/98 to-purple-50/98 backdrop-blur-2xl rounded-2xl p-4 border border-purple-200/50 shadow-2xl animate-in slide-in-from-top-4 duration-300">
              {navItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100/50 last:border-b-0">
                  {item.isRoute && !item.hasDropdown ? (
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="transform group-hover:scale-110 transition-transform duration-300">{renderIcon(item.icon)}</span>
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 group"
                      onClick={() => item.hasDropdown ? setActiveDropdown(activeDropdown === index ? null : index) : setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="transform group-hover:scale-110 transition-transform duration-300">{renderIcon(item.icon)}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.hasDropdown && (
                        <svg 
                          className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180 text-purple-600' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </a>
                  )}
                  {item.hasDropdown && activeDropdown === index && (
                    <div className="ml-4 mt-2 mb-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></span>
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setIsQuoteModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white px-4 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Free Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </nav>
  );
}
