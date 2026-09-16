import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Network, ShieldCheck, ArrowRight, FolderGit2, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Scene2CuriosityProps {
  progress?: number;
  opacity?: number;
}

export default function Scene2Curiosity({ progress, opacity }: Scene2CuriosityProps) {
  return (
    <div className="relative z-10 w-full max-w-2xl px-6 sm:px-8 py-6 flex flex-col items-center select-text">
      {/* Frosted Parchment Card Container */}
      <div className="w-full bg-surface/92 dark:bg-surface/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-md border border-border/40 flex flex-col items-start text-left">
        {/* Chapter Badge */}
        <div className="flex items-center gap-2 mb-3 select-none">
          <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase">
            CHAPTER I · ABOUT & CRAFT
          </span>
        </div>

        {/* Heading & Intro */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-text1 leading-tight not-italic">
          I engineer systems that <span className="text-accent italic font-editorial">reason</span> and <span className="font-semibold">scale</span>.
        </h2>

        <p className="mt-3 text-sm sm:text-base text-text2 leading-relaxed font-body">
          My work spans the intersection of autonomous AI agent orchestration, distributed systems engineering, and resilient backend architecture. I love crafting software that remains reliable under real-world constraints.
        </p>

        {/* Technical Pillars Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
          {/* Pillar 1 */}
          <div className="p-3.5 rounded-2xl bg-surface2/30 border border-border/40 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Cpu size={16} />
            </div>
            <h3 className="text-xs font-bold text-text1 font-mono uppercase tracking-wider">
              Agentic AI
            </h3>
            <p className="text-xs text-text3 leading-relaxed">
              Multi-agent tool orchestration, structured reasoning, and autonomous pipelines.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-3.5 rounded-2xl bg-surface2/30 border border-border/40 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Network size={16} />
            </div>
            <h3 className="text-xs font-bold text-text1 font-mono uppercase tracking-wider">
              Distributed
            </h3>
            <p className="text-xs text-text3 leading-relaxed">
              High-throughput rate limiters, event streaming, and low-latency API infrastructure.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-3.5 rounded-2xl bg-surface2/30 border border-border/40 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
            <h3 className="text-xs font-bold text-text1 font-mono uppercase tracking-wider">
              Resilience
            </h3>
            <p className="text-xs text-text3 leading-relaxed">
              Privacy-first design, benchmarked reliability, and open-source craftsmanship.
            </p>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="mt-6 pt-5 border-t border-border/30 w-full flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-text1 hover:text-accent font-semibold transition-colors"
            >
              <FolderGit2 size={13} />
              <span>Explore Projects</span>
              <ArrowRight size={12} />
            </Link>
            <span className="text-text4">·</span>
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-text1 hover:text-accent font-semibold transition-colors"
            >
              <Briefcase size={13} />
              <span>Experience</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <span className="text-[10px] font-mono text-text3">
            Keep scrolling for more &darr;
          </span>
        </div>
      </div>
    </div>
  );
}
