import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface Scene3WorkshopProps {
  progress: number;
  opacity: number;
}

const projects = [
  {
    title: 'Plume',
    subtitle: 'Satellite Timeseries AI',
    desc: 'Satellite timeseries air quality prediction & wildfire hotspot detection. 0.975 Pearson r accuracy and 5x faster ingestion throughput.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'Satellite Data'],
    rotation: '-1.5deg',
    github: 'https://github.com/geetikavasistha-01/Plume',
    slug: 'plume',
  },
  {
    title: 'Distributed Rate Limiter',
    subtitle: 'Systems & Cloud Infrastructure',
    desc: 'Low-latency distributed token-bucket rate limiter engineered in Rust. Achieves >100k req/sec with <1.2ms p99 latency under heavy load.',
    tech: ['Rust', 'Redis', 'Tokio', 'Docker'],
    rotation: '1.8deg',
    github: 'https://github.com/geetikavasistha-01/Distributed-Rate-Limiter',
    slug: 'distributed-rate-limiter',
  },
  {
    title: "Teachers' Mate",
    subtitle: 'Role-Based Analytics & Automation',
    desc: 'Automated student assignment grading analytics and classroom workflow system. Cut manual evaluation time by 50%.',
    tech: ['TypeScript', 'Node.js', 'React', 'MongoDB'],
    rotation: '-1.2deg',
    github: 'https://github.com/geetikavasistha-01/Teachers-Mate-Frontend',
    slug: 'teachers-mate',
  },
];

export default function Scene3Workshop({ progress, opacity }: Scene3WorkshopProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 py-6 flex flex-col items-center select-text">
      {/* Editorial Header Banner */}
      <div className="bg-surface/92 dark:bg-surface/95 backdrop-blur-md rounded-2xl px-6 py-3 border border-border/40 shadow-sm flex flex-col items-center mb-5 text-center select-none">
        <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
          CHAPTER II · THE WORKSHOP · PROJECTS
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-text1 leading-tight select-text">
          Notes from the workbench.
        </h2>
      </div>

      {/* Pinned Paper Notes Grid (Scattered editorial cards on desktop, clean vertical stack on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        {projects.map((proj, idx) => (
          <div
            key={proj.title}
            className="group relative bg-surface/92 dark:bg-surface/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-md border border-border/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            style={{
              transform: prefersReducedMotion ? 'none' : `rotate(${proj.rotation})`,
            }}
          >
            {/* Pinned tape / pushpin effect */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-amber-200/80 dark:bg-amber-800/60 rounded-[2px] shadow-sm rotate-[-2deg] pointer-events-none" />

            <div>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-text1 group-hover:text-accent transition-colors">
                  {proj.title}
                </h3>
                <span className="text-[9px] font-mono text-text3 uppercase tracking-wider">
                  0{idx + 1}
                </span>
              </div>

              <span className="text-xs text-accent font-mono block mb-2.5 font-medium">
                {proj.subtitle}
              </span>

              <p className="text-xs sm:text-sm text-text2 leading-relaxed font-body mb-4">
                {proj.desc}
              </p>
            </div>

            <div>
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-surface2/40 text-[10px] font-mono text-text3 border border-border/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center justify-between pt-3 border-t border-border/30 text-xs">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-text2 hover:text-accent transition-colors"
                >
                  <FaGithub size={13} />
                  <span>Code</span>
                </a>

                <Link
                  to={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-0.5 text-text1 hover:text-accent font-semibold transition-colors"
                >
                  <span>Details</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs select-none">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface/90 hover:bg-surface border border-border/50 text-text2 hover:text-text1 transition-all shadow-sm font-medium"
        >
          <span>View all archive projects</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
