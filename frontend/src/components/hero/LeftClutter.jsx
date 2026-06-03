import React from 'react';
import { motion } from 'framer-motion';
import StickyNote from '../ui/StickyNote';

export default function LeftClutter() {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
      {/* Poster */}
      <motion.div 
        className="absolute left-[5%] top-[40%] bg-inverse-surface text-tertiary-fixed p-4 manga-border manga-shadow -rotate-3 transition-transform w-[240px] origin-bottom-right pointer-events-auto"
        whileHover={{ rotate: 0 }}
      >
        <h3 className="font-headline-lg text-headline-lg leading-none mb-2 uppercase">CODE FOR CLIMATE</h3>
        <p className="font-label-sm text-label-sm text-surface-dim">DEPLOYING MODELS.</p>
      </motion.div>

      {/* PYTHON label */}
      <div className="absolute left-[8%] bottom-[24%] w-32 h-8 bg-primary-container manga-border -rotate-2 flex items-center justify-center font-nav-bold text-nav-bold text-on-primary-container z-30 pointer-events-auto">
        PYTHON
      </div>

      {/* Sticky Note */}
      <StickyNote 
        text="Agentic Systems" 
        className="absolute left-[10%] top-[16%] rotate-6 pointer-events-auto" 
      />
    </div>
  );
}
