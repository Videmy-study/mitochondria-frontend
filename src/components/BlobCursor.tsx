
import React, { useEffect, useState } from 'react';

const BlobCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 w-10 h-10 rounded-full opacity-100 transition-all duration-200 ease-out"
      style={{
        left: position.x - 20,
        top: position.y - 20,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 1) 0%, rgba(59, 130, 246, 0.8) 70%, transparent 100%)',
        filter: 'blur(1px)',
        transform: 'scale(1)',
      }}
    />
  );
};

export default BlobCursor;
