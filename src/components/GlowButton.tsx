
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlowButtonProps extends ButtonProps {
  glowColor?: 'purple' | 'blue' | 'green' | 'pink';
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  className, 
  glowColor = 'purple',
  ...props 
}) => {
  const glowClasses = {
    purple: 'shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 border-purple-500/50',
    blue: 'shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 border-blue-500/50',
    green: 'shadow-lg shadow-green-500/50 hover:shadow-green-500/70 border-green-500/50',
    pink: 'shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 border-pink-500/50',
  };

  return (
    <Button
      className={cn(
        'relative overflow-hidden border transition-all duration-300 hover:scale-105',
        glowClasses[glowColor],
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GlowButton;
