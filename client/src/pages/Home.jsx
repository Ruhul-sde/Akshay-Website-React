
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedCompanies from '../components/TrustedCompanies';
import AboutCompany from '../components/AboutCompany';
import ServicesCards from '../components/ServicesCards';
import WhyChooseUs from '../components/WhyChooseUs';
import Statistics from '../components/Statistics';
import ClientTestimonials from '../components/ClientTestimonials';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import BackendStatus from '../components/BackendStatus';

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Backend Status - Temporary for development */}
      <BackendStatus />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Trusted Companies Section */}
      <TrustedCompanies />
      
      {/* About Company Section - "Powering Growth with Our People" */}
      <AboutCompany />
      
      {/* Services Cards Section */}
      <ServicesCards />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* Statistics Section */}
      <Statistics />
      
      {/* Client Testimonials & Success Stories */}
      <ClientTestimonials />
      
      {/* Footer */}
      <Footer />
      
      {/* Chat Widget - Fixed position */}
      <ChatWidget />
    </div>
  );
}
