
import React from 'react';

export default function SapS4Hana() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SAP S/4HANA</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Next-generation ERP suite built on SAP HANA platform for real-time analytics and streamlined processes.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Digital Transformation with S/4HANA</h2>
          <p className="text-xl opacity-90">
            Transform your business with intelligent ERP that adapts to your evolving needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Real-time Processing</h4>
                  <p className="text-gray-600">In-memory computing for instant insights</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Simplified Architecture</h4>
                  <p className="text-gray-600">Reduced data footprint and complexity</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Modern UX</h4>
                  <p className="text-gray-600">Intuitive user experience with Fiori</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Implementation Options</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">On-Premise</h4>
                <p className="text-gray-600 text-sm">Full control and customization</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Cloud</h4>
                <p className="text-gray-600 text-sm">Rapid deployment and scalability</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Hybrid</h4>
                <p className="text-gray-600 text-sm">Best of both worlds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
