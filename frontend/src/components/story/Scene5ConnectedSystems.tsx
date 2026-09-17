import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, GitBranch, Terminal } from 'lucide-react';

interface Scene5ConnectedSystemsProps {
  progress?: number;
  opacity?: number;
}

export default function Scene5ConnectedSystems({ progress = 0.5, opacity }: Scene5ConnectedSystemsProps) {
  const prefersReducedMotion = useReducedMotion();

  // Animated path drawing progress (0.0 to 1.0)
  const drawProgress = Math.min(1, Math.max(0, progress * 2));
  const dashOffset = prefersReducedMotion ? 0 : (1 - drawProgress) * 600;

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      {/* 1. Animated SVG Connecting Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Path 1: Desk to Knowledge Hub */}
        <path
          d="M 220,420 C 320,380 400,460 520,340"
          fill="none"
          stroke="#9a7b56"
          strokeWidth="1.75"
          strokeDasharray="600"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Path 2: Notebooks to System Architecture */}
        <path
          d="M 520,340 C 620,240 700,320 820,260"
          fill="none"
          stroke="#5c7a68"
          strokeWidth="1.5"
          strokeDasharray="600"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Path 3: Lower Workspace Loop */}
        <path
          d="M 300,500 C 420,440 600,540 750,450"
          fill="none"
          stroke="#b87353"
          strokeWidth="1.25"
          strokeDasharray="600"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* 2. Editorial Systems Thinking Statement */}
      <div className="relative z-10 w-full max-w-xl px-6 sm:px-8 py-6 flex flex-col items-center text-center select-text pointer-events-auto">
        <div className="w-full bg-[#FAF6EE]/96 dark:bg-[#17171B]/96 rounded-3xl p-6 sm:p-8 shadow-md border border-[#E3DACB] dark:border-[#26262C] flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 select-none">
            <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase shadow-sm">
              CHAPTER IV · CONNECTED SYSTEMS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-text1 leading-tight mb-4">
            Nothing exists in isolation.
          </h2>

          <p className="text-sm sm:text-base text-text2 leading-relaxed font-body max-w-md">
            The best software connects cleanly: agentic reasoning models feeding deterministic backend queues, streaming pipelines indexing telemetry, and intuitive interfaces making complexity invisible.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-mono text-text3/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#9a7b56]" /> Interfaces
            </span>
            <span>&rarr;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5c7a68]" /> AI Logic
            </span>
            <span>&rarr;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#b87353]" /> Backends
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
