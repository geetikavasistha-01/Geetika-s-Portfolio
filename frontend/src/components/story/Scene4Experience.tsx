import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Scene4ExperienceProps {
  progress: number;
  opacity: number;
}

const experiences = [
  {
    company: 'Aadi Art',
    role: 'Backend & API Intern',
    duration: 'Feb 2026 - Apr 2026',
    location: 'Delhi NCR · Hybrid',
    impact: 'Engineered Django REST Framework APIs and MongoDB schemas in an Agile team.',
  },
  {
    company: 'Sacred Gurukul',
    role: 'Backend Developer Intern',
    duration: 'Dec 2025 - Feb 2026',
    location: 'Delhi NCR · Hybrid',
    impact: 'Deployed modular REST APIs using TypeScript and Node.js with automated CI/CD.',
  },
  {
    company: 'Havish M Consultancy',
    role: 'AI Engineering Intern',
    duration: 'Jul 2025 - Dec 2025',
    location: 'Noida · Onsite',
    impact: 'Built LLM-powered document intelligence pipelines and Python service observability.',
  },
  {
    company: 'Raphsons Robotics',
    role: 'Machine Learning Intern',
    duration: 'Mar 2025 - Jun 2026',
    location: 'Ghaziabad · Onsite',
    impact: 'Boosted anomaly detection model accuracy by 40% and sped up SQL data pipelines by 25%.',
  },
];

interface Scene4ExperienceProps {
  progress?: number;
  opacity?: number;
}

export default function Scene4Experience({ progress, opacity }: Scene4ExperienceProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 py-6 flex flex-col items-center select-text">
      {/* Main Experience Container with Timeline */}
      <div className="w-full bg-surface/92 dark:bg-surface/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-md border border-border/40 relative flex flex-col">
        {/* Chapter Tag & Heading Inside Card for Maximum Legibility */}
        <div className="flex flex-col items-center text-center mb-6 select-none">
          <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
            CHAPTER III · THE GROWING WORLD · EXPERIENCE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-text1 leading-tight select-text">
            Engineering tracks in the wild.
          </h2>
        </div>

        {/* Vertical hand-drawn timeline thread */}
        <div className="absolute left-8 top-28 bottom-20 w-[2px] bg-accent/30 hidden sm:block pointer-events-none" />

        <div className="flex flex-col gap-6 w-full">
          {experiences.map((exp, idx) => (
            <div key={exp.company} className="relative flex flex-col sm:flex-row items-start sm:pl-10 gap-3 group">
              {/* Timeline Marker Node */}
              <div className="absolute left-[3px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface border-2 border-accent hidden sm:flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold font-serif text-text1 group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-text3 font-medium">@ {exp.company}</span>
                  </div>

                  <span className="text-[11px] font-mono text-text3/90 flex items-center gap-1 font-medium">
                    <Calendar size={11} /> {exp.duration}
                  </span>
                </div>

                <p className="mt-1.5 text-xs sm:text-sm text-text2 leading-relaxed font-body">
                  {exp.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between text-xs w-full">
          <Link
            to="/work"
            className="inline-flex items-center gap-1 text-text1 hover:text-accent font-semibold transition-colors"
          >
            <span>Full Experience Timeline & Résumé</span>
            <ArrowRight size={12} />
          </Link>
          <span className="text-[10px] font-mono text-text3">4 industry internships</span>
        </div>
      </div>
    </div>
  );
}
