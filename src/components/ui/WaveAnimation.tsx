'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WaveAnimationProps {
  className?: string;
  color?: string;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ 
  className = '', 
  color = 'rgb(147, 51, 234)' 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 V120 H0 V60 Z"
          fill={color}
          fillOpacity="0.3"
          initial={{ d: "M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 V120 H0 V60 Z" }}
          animate={{
            d: [
              "M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 V120 H0 V60 Z",
              "M0,80 C150,60 350,100 600,80 C850,60 1050,100 1200,80 V120 H0 V60 Z",
              "M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 V120 H0 V60 Z",
            ],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.path
          d="M0,80 C150,120 350,40 600,80 C850,120 1050,40 1200,80 V120 H0 V80 Z"
          fill={color}
          fillOpacity="0.2"
          initial={{ d: "M0,80 C150,120 350,40 600,80 C850,120 1050,40 1200,80 V120 H0 V80 Z" }}
          animate={{
            d: [
              "M0,80 C150,120 350,40 600,80 C850,120 1050,40 1200,80 V120 H0 V80 Z",
              "M0,100 C150,80 350,120 600,100 C850,80 1050,120 1200,100 V120 H0 V80 Z",
              "M0,80 C150,120 350,40 600,80 C850,120 1050,40 1200,80 V120 H0 V80 Z",
            ],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.path
          d="M0,100 C150,140 350,60 600,100 C850,140 1050,60 1200,100 V120 H0 V100 Z"
          fill={color}
          fillOpacity="0.1"
          initial={{ d: "M0,100 C150,140 350,60 600,100 C850,140 1050,60 1200,100 V120 H0 V100 Z" }}
          animate={{
            d: [
              "M0,100 C150,140 350,60 600,100 C850,140 1050,60 1200,100 V120 H0 V100 Z",
              "M0,120 C150,100 350,140 600,120 C850,100 1050,140 1200,120 V120 H0 V100 Z",
              "M0,100 C150,140 350,60 600,100 C850,140 1050,60 1200,100 V120 H0 V100 Z",
            ],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 2,
          }}
        />
      </svg>
    </div>
  );
};

export default WaveAnimation;
