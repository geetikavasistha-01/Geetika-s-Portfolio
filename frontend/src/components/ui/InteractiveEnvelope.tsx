import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveEnvelope() {
  const [isHovered, setIsHovered] = useState(false);

  // Load cursive handwriting font dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <a
      href="mailto:contact.geetikavasistha@gmail.com"
      className="relative flex flex-col items-center justify-center w-full pt-12 pb-6 group select-none transition-transform duration-300 hover:scale-[1.01]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stacking Container */}
      <div 
        className="relative w-[300px] h-[200px]"
        style={{ perspective: '1000px' }}
      >
        {/* 1. Envelope Backside */}
        <div className="absolute inset-0 bg-[#0A3323] rounded-2xl shadow-lg border border-[#1a5c3a]/60" />

        {/* 2. Letter Paper (Permanently visible/slid out) */}
        <motion.div
          animate={{
            y: isHovered ? -82 : -75,
            scale: isHovered ? 1.04 : 1,
            zIndex: 20
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22
          }}
          className="absolute left-[15px] top-[15px] w-[270px] h-[170px] bg-white rounded-lg shadow-md border border-gray-100 p-4 flex flex-col items-center justify-center"
        >
          {/* Letter Lines Decoration */}
          <div className="w-full h-full border-t border-b border-dashed border-gray-200/80 flex flex-col items-center justify-center gap-2">
            <span 
              className="text-2xl sm:text-3xl text-gray-800 leading-none font-bold"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Hire Me
            </span>
            <div className="w-16 h-[1.5px] bg-[#0A3323]/40 rounded-full" />
          </div>
        </motion.div>

        {/* 3. Envelope Front Folds (Triangular Overlays) */}
        <svg
          className="absolute inset-0 w-full h-full z-10 drop-shadow-md pointer-events-none"
          viewBox="0 0 300 200"
        >
          {/* Left Fold */}
          <polygon
            points="0,0 160,100 0,200"
            fill="#1a5c3a"
            stroke="#0d4029"
            strokeWidth="0.5"
          />
          {/* Right Fold */}
          <polygon
            points="300,0 140,100 300,200"
            fill="#1a5c3a"
            stroke="#0d4029"
            strokeWidth="0.5"
          />
          {/* Bottom Fold */}
          <polygon
            points="0,200 150,95 300,200"
            fill="#0f4a2e"
            stroke="#0d4029"
            strokeWidth="0.5"
          />
        </svg>

        {/* 4. Top Flap (Permanently flipped open) */}
        <motion.div
          animate={{
            rotateX: 180,
            zIndex: 0
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 20
          }}
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          className="absolute inset-x-0 top-0 h-[105px] pointer-events-none"
        >
          <svg
            className="w-full h-full drop-shadow-sm"
            viewBox="0 0 300 105"
          >
            <polygon
              points="0,0 150,105 300,0"
              fill="#155232"
              stroke="#0d4029"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      </div>

      {/* Hover Subtext Guide */}
      <span className="text-[10px] font-mono tracking-widest text-text3 uppercase mt-6 group-hover:text-text1 transition-colors">
        Click to email me
      </span>
    </a>
  );
}
