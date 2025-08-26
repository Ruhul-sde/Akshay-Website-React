
import React from 'react';

export default function GrowWithSap() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Grow with SAP</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scale your business with confidence using SAP's comprehensive growth solutions.
          </p>
        </div>
        
        <div className="bg-green-600 text-white rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Your Growth Partner</h2>
              <p className="text-xl opacity-90">
                From startup to enterprise, SAP solutions evolve with your business needs.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-6 bg-white/20 rounded-full">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">01</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Start Small</h3>
            <p className="text-gray-600">Begin with essential modules and grow your system as needed.</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">02</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Scale Up</h3>
            <p className="text-gray-600">Add functionality and users as your business expands.</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">03</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Transform</h3>
            <p className="text-gray-600">Evolve to enterprise-grade solutions when ready.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
