
import React from 'react';

const FloatingStars: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`large-${i}`}
          className="absolute animate-float-slow opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50" />
        </div>
      ))}
      
      {/* Medium stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`medium-${i}`}
          className="absolute animate-float-medium opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 8}s`,
          }}
        >
          <div className="w-1.5 h-1.5 bg-blue-200 rounded-full shadow-md shadow-blue-200/50" />
        </div>
      ))}
      
      {/* Small stars */}
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={`small-${i}`}
          className="absolute animate-float-fast opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        >
          <div className="w-1 h-1 bg-purple-200 rounded-full shadow-sm shadow-purple-200/50" />
        </div>
      ))}
    </div>
  );
};

export default FloatingStars;
