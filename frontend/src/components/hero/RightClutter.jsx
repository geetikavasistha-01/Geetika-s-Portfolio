import React from 'react';
import { motion } from 'framer-motion';
import StickyNote from '../ui/StickyNote';

export default function RightClutter() {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
      {/* Manga Poster */}
      <motion.div 
        className="absolute right-[5%] top-[18%] bg-inverse-surface text-tertiary-fixed p-4 manga-border manga-shadow -rotate-2 w-[240px] origin-left pointer-events-auto group"
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 border-4 border-secondary-fixed m-2 opacity-50 border-dashed pointer-events-none"></div>
        <h3 className="font-headline-lg text-headline-lg leading-none mb-2 uppercase relative z-10">
          DATA IS THE NEW SOIL
        </h3>
      </motion.div>

      {/* Sticky Note */}
      <StickyNote 
        text="push to<br/>GitHub" 
        className="absolute right-[10%] bottom-[26%] -rotate-12 w-28 h-28 z-30 pointer-events-auto" 
      />
    </div>
  );
}
