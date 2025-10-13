
import React from 'react';

export default function SapSupport() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SAP Business One Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            24/7 comprehensive support services to keep your SAP Business One system running smoothly.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• System troubleshooting</li>
                <li>• Performance optimization</li>
                <li>• Bug fixes and patches</li>
                <li>• Database maintenance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">User Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• User training and guidance</li>
                <li>• Process optimization</li>
                <li>• Custom report creation</li>
                <li>• Workflow improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
