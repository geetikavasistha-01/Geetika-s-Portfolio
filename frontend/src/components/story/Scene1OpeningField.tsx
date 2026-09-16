import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SiSubstack } from 'react-icons/si';

import renge from '../../assets/renge.png';

interface Scene1OpeningFieldProps {
  progress?: number;
}

export default function Scene1OpeningField({ progress }: Scene1OpeningFieldProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      {/* Central Hero Content Layer */}
      <div className="relative z-10 w-full max-w-xl px-6 sm:px-8 flex flex-col items-center text-center select-text">
        {/* Crisp Frosted Paper Backing */}
        <div className="w-full bg-surface/92 dark:bg-surface/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-md border border-border/40 flex flex-col items-center">
          
          {/* Mascot Avatar */}
          <div className="relative mb-4 select-none group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-surface2/60 shadow-lg bg-surface/90 backdrop-blur-sm p-1 transition-transform duration-300 group-hover:scale-105">
              <img
                src={renge}
                alt="Geetika's Mascot Avatar"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-accent text-bg text-[9px] font-mono font-bold tracking-wider shadow-sm">
              PROLOGUE
            </div>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-text1 leading-tight tracking-tight">
            hey, i'm geetika
          </h1>

          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm text-text3 font-mono">
              @geekykunoichi
            </span>
            <span className="text-text4">·</span>
            <span className="text-xs sm:text-sm text-text3 font-serif italic">
              architecting systems & quiet spaces
            </span>
          </div>

          {/* Bio Copy */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-text2 leading-relaxed max-w-lg font-body">
            I spend most of my time building <span className="font-semibold text-text1">Agentic AI</span>,{' '}
            <span className="font-semibold text-text1">distributed systems</span>, and backend infrastructure for intelligent applications.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 select-none">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.geetikavasistha@gmail.com&su=Hire%20Me%20%E2%80%94%20Saw%20your%20story!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-bg hover:opacity-90 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={14} />
            </a>

            <Link
              to="/human"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F9C5D5] hover:bg-[#F4AFC3] text-zinc-900 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Personal Side</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-text3 font-body">
            <a
              href="https://github.com/geetikavasistha-01"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-surface2/40 hover:bg-surface2/80 border border-border/50 hover:border-text2 text-text3 hover:text-text1 transition-all"
              title="GitHub"
            >
              <FaGithub size={13} />
            </a>
            <a
              href="https://www.linkedin.com/in/geetikavasisthampy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-surface2/40 hover:bg-surface2/80 border border-border/50 hover:border-text2 text-text3 hover:text-text1 transition-all"
              title="LinkedIn"
            >
              <FaLinkedin size={13} />
            </a>
            <a
              href="https://x.com/GeetikaVasistha"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-surface2/40 hover:bg-surface2/80 border border-border/50 hover:border-text2 text-text3 hover:text-text1 transition-all"
              title="Twitter/X"
            >
              <FaXTwitter size={13} />
            </a>
            <a
              href="https://substack.com/@augustine1301"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-surface2/40 hover:bg-surface2/80 border border-border/50 hover:border-text2 text-text3 hover:text-text1 transition-all"
              title="Substack"
            >
              <SiSubstack size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        className="absolute bottom-6 flex flex-col items-center gap-1 text-text3/70 select-none z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">
          scroll to explore
        </span>
        <ArrowDown size={13} className={prefersReducedMotion ? '' : 'animate-bounce'} />
      </motion.div>
    </div>
  );
}
