
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
    <div>
      <Hero />
      <TrustedCompanies />
      <AboutCompany />
      <ServicesCards />
      <WhyChooseUs />
      <Statistics />
      <ClientTestimonials />
    </div>
  );
}
