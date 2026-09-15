import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';

export default function HomeEnvelopeFooter() {
  const { setCliOpen } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCliClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCliOpen(true);
  };

  const handleCopyEmail = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      await navigator.clipboard.writeText('contact.geetikavasistha@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard copy fail silent
    }
  };

  return (
    <footer className="w-full relative flex flex-col items-center pt-24 pb-8 mt-16 select-none bg-bg border-t border-border/20">
      {/* 3D Stacking Envelope Centerpiece */}
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.geetikavasistha@gmail.com&su=Hire%20Me%20%E2%80%94%20Saw%20your%20portfolio!"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCopyEmail}
        className="relative flex flex-col items-center justify-center group mb-12 transition-transform duration-300 hover:scale-[1.01]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Click me badge above the envelope */}
        <div 
          className="absolute -top-12 flex items-center gap-1.5 text-text3 font-bold select-none rotate-2"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '20px' }}
        >
          {/* Twinkling star SVG path */}
          <svg className="w-4 h-4 text-accent animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
          </svg>
          <span>click me</span>
          <svg className="w-3.5 h-3.5 text-accent animate-pulse delay-100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
          </svg>
        </div>

        {/* 1.5x scaled Stacking container */}
        <div 
          className="relative w-[450px] h-[300px]"
          style={{ perspective: '1200px' }}
        >
          {/* 1. Envelope Backside */}
          <div className="absolute inset-0 bg-[#0A3323] rounded-3xl shadow-xl border border-[#1a5c3a]/60" />

          {/* 2. Letter Paper (1.5x scaled, slightly shortened) */}
          <motion.div
            animate={{
              y: isHovered ? -112.5 : -97.5,
              scale: isHovered ? 1.04 : 1,
              zIndex: 20
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22
            }}
            className="absolute left-[22.5px] top-[22.5px] w-[405px] h-[232.5px] bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col items-center justify-center"
          >
            <div className="w-full h-full border-t border-b border-dashed border-gray-200/80 flex flex-col items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl text-gray-800 leading-none font-bold font-body">
                Hire Me
              </span>
              <div className="w-24 h-[2px] bg-[#0A3323]/40 rounded-full" />
            </div>
          </motion.div>

          {/* 3. Envelope Front Folds (Triangular Overlays) */}
          <svg
            className="absolute inset-0 w-full h-full z-10 drop-shadow-lg pointer-events-none"
            viewBox="0 0 450 300"
          >
            {/* Left Fold */}
            <polygon
              points="0,0 240,150 0,300"
              fill="#1a5c3a"
              stroke="#0d4029"
              strokeWidth="0.5"
            />
            {/* Right Fold */}
            <polygon
              points="450,0 210,150 450,300"
              fill="#1a5c3a"
              stroke="#0d4029"
              strokeWidth="0.5"
            />
            {/* Bottom Fold */}
            <polygon
              points="0,300 225,142.5 450,300"
              fill="#0f4a2e"
              stroke="#0d4029"
              strokeWidth="0.5"
            />
          </svg>

          {/* 4. Top Flap */}
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
            className="absolute inset-x-0 top-0 h-[157.5px] pointer-events-none"
          >
            <svg
              className="w-full h-full drop-shadow-sm"
              viewBox="0 0 450 157.5"
            >
              <polygon
                points="0,0 225,157.5 450,0"
                fill="#155232"
                stroke="#0d4029"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>

          {/* Copied Toast */}
          <AnimatePresence>
            {copied && (
              <motion.div
                key="copied-toast"
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A3323] text-white text-[11px] font-mono tracking-wide shadow-md whitespace-nowrap pointer-events-none"
              >
                <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2,6 5,9 10,3" />
                </svg>
                Email copied!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </a>

      {/* Link Row */}
      <div className="max-w-[880px] w-full mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-6 text-text3 font-sans text-xs">
        <a
          href="https://geetikavasistha.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text1 transition-colors flex items-center gap-1"
        >
          Newsletter <span className="text-[10px]">&rarr;</span>
        </a>
        <Link
          to="/contact"
          className="hover:text-text1 transition-colors flex items-center gap-1"
        >
          Get in touch <span className="text-[10px]">&rarr;</span>
        </Link>
        <a
          href="https://medium.com/@geetikavasistha13"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text1 transition-colors flex items-center gap-1"
        >
          Medium <span className="text-[10px]">&rarr;</span>
        </a>
        <a
          href="https://github.com/geetikavasistha-01"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text1 transition-colors flex items-center gap-1"
        >
          GitHub <span className="text-[10px]">&rarr;</span>
        </a>
        <button
          onClick={handleCopyEmail}
          className="hover:text-text1 transition-colors flex items-center gap-1.5"
        >
          Email {copied ? <Check size={12} className="text-accent" /> : <Copy size={11} />}
        </button>
        <button
          onClick={handleCliClick}
          className="hover:text-text1 transition-colors flex items-center gap-1 font-mono text-[11px]"
        >
          {`>_`} CLI <span className="text-[10px]">&rarr;</span>
        </button>
      </div>

      {/* Horizontal Divider Line */}
      <div className="max-w-[880px] w-full mx-auto px-6 border-t border-border/20 my-4" />

      {/* Bottom Row */}
      <div className="max-w-[880px] w-full mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-text4 pt-2 font-sans">
        <span>© 2026 Geetika Vasistha. All rights reserved.</span>
        <div className="flex gap-6 text-text3">
          <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noopener noreferrer" className="hover:text-text1 transition-colors">
            GitHub
          </a>
          <a href="https://x.com/GeetikaVasistha" target="_blank" rel="noopener noreferrer" className="hover:text-text1 transition-colors">
            Twitter
          </a>
          <a href="https://linkedin.com/in/geetikavasisthampy" target="_blank" rel="noopener noreferrer" className="hover:text-text1 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
