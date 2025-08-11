'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LottieIconProps {
  icon: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LottieIcon: React.FC<LottieIconProps> = ({ 
  icon, 
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-2xl w-8 h-8',
    md: 'text-4xl w-12 h-12',
    lg: 'text-6xl w-16 h-16',
  };

  return (
    <motion.div
      className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0],
        transition: { 
          duration: 0.5,
          rotate: { duration: 0.3, ease: "easeInOut" }
        }
      }}
      whileTap={{ scale: 0.9 }}
    >
      <span role="img" aria-label="icon">
        {icon}
      </span>
    </motion.div>
  );
};

export default LottieIcon;
