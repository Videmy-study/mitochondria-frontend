
import React from 'react';

interface FallingTextProps {
  words: string[];
  className?: string;
}

const FallingText: React.FC<FallingTextProps> = ({ words, className = '' }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {words.map((word, index) => (
        <div
          key={`${word}-${index}`}
          className={`absolute animate-fall opacity-20 text-sm font-mono ${className}`}
          style={{
            left: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default FallingText;
