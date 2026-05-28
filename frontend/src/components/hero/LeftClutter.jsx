import React from 'react';
import { motion } from 'framer-motion';
import StickyNote from '../ui/StickyNote';

export default function LeftClutter() {
  return (
    <div className="hidden md:flex md:col-span-3 flex-col gap-6 relative justify-end pb-12">
      {/* Poster */}
      <motion.div 
        className="bg-inverse-surface text-tertiary-fixed p-4 manga-border manga-shadow -rotate-3 transition-transform w-4/5 self-end origin-bottom-right"
        whileHover={{ rotate: 0 }}
      >
        <h3 className="font-headline-lg text-headline-lg leading-none mb-2 uppercase">CODE FOR CLIMATE</h3>
        <p className="font-label-sm text-label-sm text-surface-dim">DEPLOYING MODELS.</p>
      </motion.div>

      {/* Books Stack */}
      <div className="relative w-full h-40 mt-12 flex items-end">
        <div className="absolute bottom-0 left-4 w-32 h-8 bg-primary-container manga-border -rotate-2 flex items-center justify-center font-nav-bold text-nav-bold text-on-primary-container z-30">
          PYTHON
        </div>
        <div className="absolute bottom-8 left-2 w-48 h-8 bg-inverse-surface manga-border rotate-1 flex items-center justify-center font-nav-bold text-nav-bold text-surface opacity-0 z-20">
          LLM Orchestration
        </div>
        <div className="absolute bottom-16 left-2 w-48 h-8 bg-secondary manga-border -rotate-4 flex items-center justify-center font-nav-bold text-nav-bold text-on-secondary opacity-0 z-10">
          Distributed Systems
        </div>
      </div>

      {/* Sticky Note */}
      <StickyNote 
        text="Agentic Systems" 
        className="absolute -left-4 top-0 rotate-6" 
      />
    </div>
  );
}
