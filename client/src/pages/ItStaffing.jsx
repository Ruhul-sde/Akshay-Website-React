
import React from 'react';

export default function ItStaffing() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">IT Staffing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the right IT talent for your projects with our comprehensive staffing solutions.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Expert IT Professionals</h2>
              <p className="text-xl opacity-90">
                Access a pool of skilled developers, architects, and specialists.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-6 bg-white/20 rounded-full">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Developers</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Full Stack Developers</li>
              <li>• Frontend Specialists</li>
              <li>• Backend Engineers</li>
              <li>• Mobile Developers</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Data & Analytics</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Data Scientists</li>
              <li>• Business Analysts</li>
              <li>• Data Engineers</li>
              <li>• BI Specialists</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cloud & DevOps</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Cloud Architects</li>
              <li>• DevOps Engineers</li>
              <li>• System Administrators</li>
              <li>• Security Specialists</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Project Management</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Project Managers</li>
              <li>• Scrum Masters</li>
              <li>• Technical Leads</li>
              <li>• Solution Architects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
