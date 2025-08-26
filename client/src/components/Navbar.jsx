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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      label: 'Home',
      href: '/',
      hasDropdown: false,
      isRoute: true
    },
    {
      label: 'SAP',
      href: '#',
      hasDropdown: true,
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
      dropdown: [
        { label: 'IT Staffing', href: '/it-staffing' },
        { label: 'Payroll Management', href: '/payroll-management' }
      ]
    },
    {
      label: 'Cloud',
      href: '#',
      hasDropdown: true,
      dropdown: [
        { label: 'Cloud Hosting', href: '/cloud-hosting' }
      ]
    },
    {
      label: 'Artificial Intelligence',
      href: '#',
      hasDropdown: true,
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
      dropdown: [
        { label: 'Crest ERP', href: '/crest-erp' },
        { label: 'Case Studies', href: '/erp-case-studies' }
      ]
    },
    { 
      label: 'Blog',
      href: '/blog',
      hasDropdown: false,
      isRoute: true
    },
    { 
      label: 'About Us',
      href: '/about',
      hasDropdown: false,
      isRoute: true
    },
    { 
      label: 'Contact Us',
      href: '/contact',
      hasDropdown: false,
      isRoute: true
    }
  ];

  const handleMouseEnter = (index) => {
    clearTimeout(hoverTimeout);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // Slight delay to allow cursor to move to dropdown
    setHoverTimeout(timeout);
  };

  const keepDropdownOpen = () => {
    clearTimeout(hoverTimeout);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50' 
        : 'bg-white/90 backdrop-blur-lg'
    }`}>
      <div className="max-w-8xl mx-auto px-5">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                <img 
                  src={logo} 
                  alt="Akshay Software Technologies" 
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to text logo if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 items-center justify-center rounded-lg">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className="relative px-5 py-3 text-sm font-medium text-gray-800 hover:text-red-600 transition-all duration-300 block"
                  >
                    <span className="relative inline-block">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
                    </span>
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="relative px-5 py-3 text-sm font-medium text-gray-800 hover:text-red-600 transition-all duration-300 block"
                  >
                    <span className="relative inline-block">
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-all duration-300 scale-x-0 ${
                        activeDropdown === index ? 'scale-x-100' : 'group-hover:scale-x-100'
                      }`}></span>
                    </span>
                  </a>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100/50 py-3 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200"
                    onMouseEnter={keepDropdownOpen}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.href}
                        className="block px-6 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-all duration-200 relative overflow-hidden"
                      >
                        <span className="relative z-10">{dropdownItem.label}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block ml-6">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="relative bg-gradient-to-br from-red-600 to-red-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 shadow-md hover:shadow-red-200 hover:from-red-700 hover:to-red-600 group"
            >
              <span className="relative z-10">Get Free Quote</span>
              <span className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-red-600 focus:outline-none transition-all duration-300 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-3 pb-6 space-y-1 bg-white/95 backdrop-blur-xl shadow-xl rounded-xl mt-2 border border-gray-100/50 animate-in slide-in-from-top-4 duration-300">
              {navItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  {item.isRoute && !item.hasDropdown ? (
                    <Link
                      to={item.href}
                      className="block px-4 py-4 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-4 py-4 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      onClick={() => item.hasDropdown ? setActiveDropdown(activeDropdown === index ? null : index) : setIsMobileMenuOpen(false)}
                    >
                    <div className="flex justify-between items-center">
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <svg 
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                    </a>
                  )}
                  {item.hasDropdown && activeDropdown === index && (
                    <div className="ml-4 space-y-1 mb-2">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsQuoteModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-center bg-gradient-to-br from-red-600 to-red-500 text-white px-4 py-4 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300"
                >
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