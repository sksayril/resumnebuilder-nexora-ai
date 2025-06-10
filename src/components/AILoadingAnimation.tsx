import React from 'react';
import { motion } from 'framer-motion';

interface AILoadingAnimationProps {
  color?: string;
}

export const AILoadingAnimation: React.FC<AILoadingAnimationProps> = ({ color = '#4F46E5' }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          {/* AI Brain Animation */}
          <div className="relative w-24 h-24 mb-6">
            {/* Neural Network Lines */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-12 bg-gradient-to-b"
                  style={{
                    background: `linear-gradient(to bottom, ${color}40, ${color})`,
                    left: `${Math.cos(i * Math.PI / 4) * 40 + 48}px`,
                    top: `${Math.sin(i * Math.PI / 4) * 40 + 48}px`,
                    transform: `rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    height: ['0%', '100%', '0%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Central Brain Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                <path d="M12 6v4" />
                <path d="M12 14v4" />
                <path d="M8 10h8" />
                <path d="M8 14h8" />
              </svg>
            </motion.div>

            {/* Pulsing Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: color }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Loading Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-2" style={{ color }}>
              AI is Crafting Your Resume
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI is analyzing your experience and creating a professional resume...
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-6 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}40, ${color})` }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 