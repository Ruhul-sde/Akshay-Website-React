
import React from 'react';

export default function Statistics() {
  const stats = [
    {
      number: "150+",
      label: "EMPLOYEES",
      color: "text-blue-600"
    },
    {
      number: "50+", 
      label: "CLIENTS",
      color: "text-green-600"
    },
    {
      number: "26+",
      label: "EXPERT CONSULTANTS", 
      color: "text-purple-600"
    },
    {
      number: "100%",
      label: "HAPPY CLIENTS",
      color: "text-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 leading-tight">
          Powering Growth with Our People, Clients & Success Stories
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`text-5xl lg:text-6xl font-bold mb-4 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
