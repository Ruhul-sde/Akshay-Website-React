
import React from 'react';

export default function EInvoicing() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">E-Invoicing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your invoicing process with compliant electronic invoicing solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Digital Invoice Processing</h2>
            <p className="text-gray-600 mb-6">
              Transform your invoicing workflow with automated, compliant electronic invoicing that reduces costs and improves efficiency.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Compliance Ready</h3>
                  <p className="text-gray-600">Meets all regulatory requirements</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Faster Processing</h3>
                  <p className="text-gray-600">Instant delivery and processing</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span className="text-gray-600">Reduced processing costs by up to 80%</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span className="text-gray-600">Faster payment cycles</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span className="text-gray-600">Improved accuracy and reduced errors</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span className="text-gray-600">Better supplier relationships</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span className="text-gray-600">Environmental sustainability</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
