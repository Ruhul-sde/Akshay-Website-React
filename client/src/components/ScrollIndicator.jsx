
import React, { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll indicator when user scrolls near bottom
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage < 90);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      onClick={scrollToNext}
      className="fixed bottom-8 left-8 z-50 text-gray-700 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
    >
      <div className="flex flex-col items-center space-y-2 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow">
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-700 rounded-full animate-pulse mt-2"></div>
        </div>
        <span className="text-xs font-medium hidden md:block">Scroll</span>
      </div>
    </div>
  );
}
