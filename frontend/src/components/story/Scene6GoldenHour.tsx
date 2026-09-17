import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Heart, Terminal, Compass } from 'lucide-react';

interface Scene6GoldenHourProps {
  progress?: number;
  opacity?: number;
}

const values = [
  {
    title: 'Open Source & Transparency',
    desc: 'Software should be inspectable, community-grounded, and built with shared knowledge.',
    icon: Terminal,
  },
  {
    title: 'Privacy by Architecture',
    desc: 'Security is an engineering prerequisite, not an afterthought bolted onto telemetry.',
    icon: Shield,
  },
  {
    title: 'Correctness & Reliability',
    desc: 'In intelligent systems, hallucination is fragility. We benchmark relentlessly.',
    icon: Compass,
  },
  {
    title: 'Analog Calm in Digital Noise',
    desc: 'Engineering spaces that respect human attention and feel grounded.',
    icon: Heart,
  },
];

export default function Scene6GoldenHour({ progress, opacity }: Scene6GoldenHourProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 py-6 flex flex-col items-center select-text">
      {/* Editorial Header Banner */}
      <div className="bg-[#FAF6EE]/96 dark:bg-[#17171B]/96 rounded-2xl px-6 py-3 border border-[#E3DACB] dark:border-[#26262C] shadow-sm flex flex-col items-center mb-5 text-center select-none">
        <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
          CHAPTER V · GOLDEN HOUR · VALUES
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-text1 leading-tight select-text">
          Principles that guide the craft.
        </h2>
      </div>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {values.map((val) => {
          const Icon = val.icon;
          return (
            <div
              key={val.title}
              className="bg-[#FAF6EE]/96 dark:bg-[#17171B]/96 rounded-2xl p-5 shadow-sm border border-[#E3DACB] dark:border-[#26262C] flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Icon size={15} />
                </div>
                <h3 className="text-sm font-serif font-bold text-text1">
                  {val.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-text2 leading-relaxed font-body">
                {val.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
