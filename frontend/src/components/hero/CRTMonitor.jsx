import React from 'react';
import { motion } from 'framer-motion';
import Sticker from '../ui/Sticker';
import { Terminal } from 'lucide-react';

export default function CRTMonitor() {
  return (
    <div className="col-span-1 md:col-span-6 relative flex flex-col items-center justify-center z-20">
      {/* Bezel Stickers */}
      <div className="absolute -top-4 -left-4 z-30 flex gap-2 rotate-2">
        <span className="bg-primary-container text-on-primary-container px-2 py-1 manga-border font-label-sm text-label-sm rounded-full">G</span>
        <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 manga-border font-label-sm text-label-sm rounded-full -translate-y-2">E</span>
        <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-1 manga-border font-label-sm text-label-sm rounded-full">E</span>
      </div>

      {/* CRT Monitor Body */}
      <div className="bg-surface-container-lowest w-full max-w-2xl aspect-[4/3] manga-border manga-shadow p-6 md:p-8 flex flex-col relative">
        {/* Screen */}
        <div className="bg-secondary flex-grow manga-border relative overflow-hidden flex flex-col p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          {/* Scanline Overlay */}
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-50"
            animate={{ backgroundPosition: ['0px 0px', '0px 100%'] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          />

          {/* CRT Screen Glow */}
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,255,255,0.1)] pointer-events-none z-10 mix-blend-overlay"></div>

          <motion.div 
            className="flex-grow flex flex-col items-center justify-center text-center z-10 -translate-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0ePeJat5fgDwLVDCCOEWz3QiOgMHkjwjYPS-6oBXVTt3sJIexWUi1N9VhXXBB-s8zYFo35cR_sGPIVRWZr9xVvLyviRSiOfcW8iU2nSZAA0jOvFVjyaM26my4E2SHrr-BdSvemQE_RCkgF_OrC97h4Qa-iAYNOyf_fR_O0kNI2SXPhd7mC8G9MdXhWcKKjvDlVqcjRsJ90zEvKGglOoeMcYLXNKVDElssUm7pT4vIDzxj7dksVhXpmcz9e21qtFjGF1CVfSNbwLmR" 
              alt="Logo Watermark" 
              className="w-32 h-32 md:w-48 md:h-48 mb-4 opacity-100" 
            />
            <h1 className="font-headline-xl text-headline-xl leading-tight text-tertiary-fixed drop-shadow-[4px_4px_0px_#1a1c1c] uppercase tracking-tighter mb-4 md:text-[56px]">
              GEETIKA'S<br />PORTFOLIO
            </h1>
          </motion.div>

          {/* Loading Bar */}
          <div className="mt-auto z-10 w-full">
            <div className="font-label-sm text-label-sm text-on-secondary mb-2 uppercase tracking-widest flex justify-between">
              <span>LOADING... AI + DATA + DESIGN</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >_</motion.span>
            </div>
            <div className="w-full h-6 border-2 border-on-surface bg-surface-container-lowest p-1">
              <motion.div 
                className="h-full bg-primary-container border-r-2 border-on-surface flex items-center overflow-hidden"
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              >
                <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:16px_16px]"></div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Fake Taskbar */}
        <div className="h-10 mt-4 bg-inverse-surface manga-border flex items-center px-2 gap-2">
          <button className="bg-surface text-on-surface font-label-sm text-label-sm px-3 py-1 manga-border flex items-center gap-1 hover:bg-surface-variant active:translate-y-1 transition-colors">
            <Terminal size={16} /> Start
          </button>
          <div className="h-full w-0.5 bg-on-surface mx-1"></div>
          <div className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1 manga-border shadow-[inset_2px_2px_0px_#fff] cursor-pointer">About</div>
          <div className="bg-inverse-surface text-surface font-label-sm text-label-sm px-3 py-1 border border-on-surface opacity-70 cursor-pointer hover:opacity-100 transition-opacity">Projects</div>
        </div>
      </div>

      {/* Tower Unit / Stickers below */}
      <div className="w-11/12 max-w-xl h-24 bg-surface-container-high mt-6 manga-border manga-shadow relative flex items-center justify-center gap-4 px-4 flex-wrap">
        <div className="absolute top-2 left-4 w-3 h-3 rounded-full bg-secondary-fixed manga-border"></div>
        <div className="absolute top-2 left-9 w-3 h-3 rounded-full bg-error-container manga-border"></div>
        
        <Sticker text="AI Engineer" colorClass="bg-primary-container text-on-primary-container" rotateClass="-rotate-3" />
        <Sticker text="Data Scientist" colorClass="bg-inverse-surface text-surface" rotateClass="rotate-2" />
        <Sticker text="Climate-tech" colorClass="bg-secondary-fixed text-on-secondary-fixed" rotateClass="-rotate-1" />
      </div>
    </div>
  );
}
