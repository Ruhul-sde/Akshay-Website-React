
import React from 'react';

export default function SapCaseStudies() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SAP Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how businesses have transformed their operations with our SAP solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Manufacturing Excellence</h3>
              <p className="text-gray-600 mb-4">
                How a mid-size manufacturer increased efficiency by 40% with SAP Business One.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Manufacturing Industry</span>
                <button className="text-red-600 hover:text-red-700 font-medium">Read More →</button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Retail Transformation</h3>
              <p className="text-gray-600 mb-4">
                Multi-location retailer streamlines operations and improves customer experience.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Retail Industry</span>
                <button className="text-red-600 hover:text-red-700 font-medium">Read More →</button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Service Industry Growth</h3>
              <p className="text-gray-600 mb-4">
                Service company scales operations while maintaining quality with SAP solutions.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Service Industry</span>
                <button className="text-red-600 hover:text-red-700 font-medium">Read More →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
