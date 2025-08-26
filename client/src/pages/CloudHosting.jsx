
import React from 'react';

export default function CloudHosting() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cloud Hosting</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reliable, scalable, and secure cloud hosting solutions for your business applications.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Cloud Infrastructure</h2>
              <p className="text-xl opacity-90">
                99.9% uptime guarantee with 24/7 monitoring and support.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-6 bg-white/20 rounded-full">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">High Performance</h3>
            <p className="text-gray-600">
              SSD storage, high-speed networks, and optimized configurations for maximum performance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Security</h3>
            <p className="text-gray-600">
              Advanced security measures, regular backups, and compliance with industry standards.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Scaling</h3>
            <p className="text-gray-600">
              Scale resources up or down instantly based on your business needs.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Hosting Plans</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Starter</h4>
              <p className="text-3xl font-bold text-blue-600 mb-4">$49<span className="text-sm text-gray-500">/month</span></p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>2 CPU Cores</li>
                <li>4GB RAM</li>
                <li>100GB SSD Storage</li>
                <li>1TB Bandwidth</li>
              </ul>
            </div>
            
            <div className="border-2 border-blue-500 rounded-lg p-6 text-center relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs">
                Popular
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Professional</h4>
              <p className="text-3xl font-bold text-blue-600 mb-4">$99<span className="text-sm text-gray-500">/month</span></p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>4 CPU Cores</li>
                <li>8GB RAM</li>
                <li>250GB SSD Storage</li>
                <li>2TB Bandwidth</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Enterprise</h4>
              <p className="text-3xl font-bold text-blue-600 mb-4">$199<span className="text-sm text-gray-500">/month</span></p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>8 CPU Cores</li>
                <li>16GB RAM</li>
                <li>500GB SSD Storage</li>
                <li>Unlimited Bandwidth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
