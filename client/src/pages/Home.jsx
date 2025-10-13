
import React from 'react';
import Hero from '../components/Hero';
import TrustedCompanies from '../components/TrustedCompanies';
import AboutCompany from '../components/AboutCompany';
import ServicesCards from '../components/ServicesCards';
import WhyChooseUs from '../components/WhyChooseUs';
import Statistics from '../components/Statistics';
import ClientTestimonials from '../components/ClientTestimonials';

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
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
    </div>
  );
}
