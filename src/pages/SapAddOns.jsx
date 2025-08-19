
import React from 'react';

export default function SapAddOns() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SAP B1 Add Ons</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Extend your SAP Business One functionality with powerful add-ons tailored to your industry needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">E-Commerce Integration</h3>
            <p className="text-gray-600 mb-4">Seamlessly integrate your online store with SAP Business One.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Real-time inventory sync</li>
              <li>• Automated order processing</li>
              <li>• Customer data integration</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Solutions</h3>
            <p className="text-gray-600 mb-4">Access SAP B1 data on-the-go with mobile applications.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Sales force automation</li>
              <li>• Inventory management</li>
              <li>• Approval workflows</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Reporting</h3>
            <p className="text-gray-600 mb-4">Enhanced reporting and analytics capabilities.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Custom dashboards</li>
              <li>• Advanced analytics</li>
              <li>• Automated reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
