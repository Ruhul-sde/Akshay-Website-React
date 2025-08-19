
import React from 'react';

export default function SapBusinessOne() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SAP Business One Solution</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive ERP solution designed for small to medium-sized businesses to streamline operations and drive growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transform Your Business Operations</h2>
            <p className="text-gray-600 mb-6">
              SAP Business One is a powerful, affordable ERP solution that helps growing companies manage their entire business more effectively.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Financial Management
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Sales & Customer Management
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Purchasing & Inventory
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900">Real-time Reporting</h4>
                <p className="text-gray-600 text-sm">Get instant insights into your business performance</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900">Mobile Access</h4>
                <p className="text-gray-600 text-sm">Access your data anywhere, anytime</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900">Scalable Solution</h4>
                <p className="text-gray-600 text-sm">Grows with your business needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
