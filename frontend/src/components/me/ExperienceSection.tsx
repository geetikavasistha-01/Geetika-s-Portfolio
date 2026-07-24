import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  duration: string;
  location: string;
  bullets: string[];
  obfuscated?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    company: 'Aadi Art',
    role: 'Backend & API Intern',
    type: 'Internship',
    duration: 'Feb 2026 - Apr 2026',
    location: 'Delhi NCR (Hybrid)',
    bullets: [
      'Designed database schemas and REST API endpoints using Django REST Framework and MongoDB in a collaborative Agile team environment.'
    ]
  },
  {
    company: 'Sacred Gurukul',
    role: 'Backend Developer Intern',
    type: 'Internship',
    duration: 'Dec 2025 - Feb 2026',
    location: 'Delhi NCR (Hybrid)',
    bullets: [
      'Built and deployed clean REST APIs using TypeScript and Node.js with automated version control.'
    ]
  },
  {
    company: 'Havish M Consultancy',
    role: 'AI Engineering Intern',
    type: 'Internship',
    duration: 'Jul 2025 - Dec 2025',
    location: 'Noida (Onsite)',
    bullets: [
      'Developed LLM pipelines and observability dashboards, improving pipeline uptime and debugging efficiency.'
    ],
    obfuscated: true // Example obfuscated item
  }
];

export default function ExperienceSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleOpen = (idx: number) => {
    setOpenIdx(prev => prev === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {experiences.map((exp, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="w-full bg-[#111318] border border-border/30 rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-300"
          >
            <div
              onClick={() => toggleOpen(idx)}
              className="flex justify-between items-start cursor-pointer select-none group"
            >
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span 
                    className={`font-body font-bold text-xs sm:text-sm text-text1 transition-colors group-hover:text-[#38bdf8] ${
                      exp.obfuscated ? 'blur-[4px] select-none' : ''
                    }`}
                  >
                    {exp.company}
                  </span>
                  <span className="bg-zinc-800/60 text-text3 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded font-body">
                    {exp.type}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-text3 font-body">
                  {exp.role}
                </span>
              </div>

              <div className="flex items-center gap-3 text-right flex-shrink-0 ml-4">
                <div className="flex flex-col items-end text-[10px] sm:text-xs font-body text-text4">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} />
                    {exp.location}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp size={14} className="text-text3 group-hover:text-[#38bdf8]" />
                ) : (
                  <ChevronDown size={14} className="text-text3 group-hover:text-[#38bdf8]" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 border-t border-border/20 pt-4"
                >
                  <ul className="list-disc list-inside text-xs text-text2 font-body space-y-1.5 leading-relaxed">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <div className="flex justify-center mt-4">
        <Link
          to="/work"
          className="inline-flex items-center justify-center px-5 py-2 border border-[#38bdf8]/60 hover:border-[#38bdf8] text-[#38bdf8] hover:text-[#38bdf8]/85 text-xs font-body font-semibold rounded-full bg-transparent transition-colors shadow-sm"
        >
          View full experience &rarr;
        </Link>
      </div>
    </div>
  );
}
