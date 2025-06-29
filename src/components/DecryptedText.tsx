
import React, { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDecrypting(true);
      let iteration = 0;
      
      const interval = setInterval(() => {
        setDisplayText(text.split('').map((char, index) => {
          if (index < iteration) {
            return char;
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join(''));

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDecrypting(false);
        }

        iteration += 1/3;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className={`${className} ${isDecrypting ? 'animate-pulse' : ''}`}>
      {displayText || text}
    </span>
  );
};

export default DecryptedText;
