
import React, { useState, useEffect } from 'react';

export default function BackendStatus() {
  const [status, setStatus] = useState({
    backend: 'checking',
    mongodb: 'checking',
    gemini: 'checking'
  });

  useEffect(() => {
    checkBackendStatus();
    // Check every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkBackendStatus = async () => {
    try {
      // Check backend connection
      const response = await fetch('http://localhost:3001/chat/health');
      const data = await response.json();
      
      setStatus({
        backend: response.ok ? 'connected' : 'disconnected',
        mongodb: data.mongodb || 'disconnected',
        gemini: data.gemini || 'disconnected'
      });
    } catch (error) {
      setStatus({
        backend: 'disconnected',
        mongodb: 'disconnected',
        gemini: 'disconnected'
      });
    }
  };

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case 'connected':
        return 'bg-green-500';
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500 animate-pulse';
    }
  };

  const getStatusText = (statusValue) => {
    switch (statusValue) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Checking...';
    }
  };

  return (
    <div className="fixed top-24 right-6 z-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-6 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Backend Status</h3>
        <button 
          onClick={checkBackendStatus}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Refresh status"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {/* Backend Server */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status.backend)}`}></div>
            <span className="font-medium text-gray-700">Backend Server</span>
          </div>
          <span className="text-sm text-gray-600">{getStatusText(status.backend)}</span>
        </div>

        {/* MongoDB */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status.mongodb)}`}></div>
            <span className="font-medium text-gray-700">MongoDB</span>
          </div>
          <span className="text-sm text-gray-600">{getStatusText(status.mongodb)}</span>
        </div>

        {/* Gemini API */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status.gemini)}`}></div>
            <span className="font-medium text-gray-700">Gemini API</span>
          </div>
          <span className="text-sm text-gray-600">{getStatusText(status.gemini)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Last checked: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
