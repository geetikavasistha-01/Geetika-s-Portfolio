import React from 'react';
import { motion } from 'framer-motion';
import StickyNote from '../ui/StickyNote';

export default function RightClutter() {
  return (
    <div className="hidden md:flex md:col-span-3 flex-col gap-8 relative pt-12">
      {/* Manga Poster */}
      <motion.div 
        className="bg-inverse-surface text-tertiary-fixed p-4 manga-border manga-shadow -rotate-2 self-start w-5/6 relative overflow-hidden group origin-left"
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
        className="absolute bottom-1/4 -right-4 -rotate-12 w-28 h-28 z-30" 
      />
    </div>
  );
}
