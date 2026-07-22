import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    <Link
      to="/contact"
      className="relative flex flex-col items-center justify-center w-full pt-12 pb-6 group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stacking Container */}
      <div 
        className="relative w-[300px] h-[200px]"
        style={{ perspective: '1000px' }}
      >
        {/* 1. Envelope Backside */}
        <div className="absolute inset-0 bg-[#E6C665] rounded-2xl shadow-lg border border-[#D9B753]/40" />

        {/* 2. Letter Paper (Slides up on hover) */}
        <motion.div
          animate={{
            y: isHovered ? -75 : 0,
            scale: isHovered ? 1.02 : 1,
            zIndex: isHovered ? 20 : 5
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
              className="text-xl sm:text-2xl text-gray-800 leading-none"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              write me a mail
            </span>
            <div className="w-16 h-[1.5px] bg-[#659287]/40 rounded-full" />
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
            fill="#F2D172"
            stroke="#D9B753"
            strokeWidth="0.5"
          />
          {/* Right Fold */}
          <polygon
            points="300,0 140,100 300,200"
            fill="#F2D172"
            stroke="#D9B753"
            strokeWidth="0.5"
          />
          {/* Bottom Fold */}
          <polygon
            points="0,200 150,95 300,200"
            fill="#EAD07C"
            stroke="#D2B04E"
            strokeWidth="0.5"
          />
        </svg>

        {/* 4. Top Flap (Flips open on hover) */}
        <motion.div
          animate={{
            rotateX: isHovered ? 180 : 0,
            zIndex: isHovered ? 0 : 30
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
              fill="#E2C165"
              stroke="#D2B04E"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      </div>

      {/* Hover Subtext Guide */}
      <span className="text-[10px] font-mono tracking-widest text-text3 uppercase mt-6 group-hover:text-text1 transition-colors">
        Click to open form
      </span>
    </Link>
  );
}
