import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Mail, ArrowUpRight, Sparkles, BookOpen, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Scene7NightFinaleProps {
  progress?: number;
  opacity?: number;
}

export default function Scene7NightFinale({ progress, opacity }: Scene7NightFinaleProps) {
  const prefersReducedMotion = useReducedMotion();

  // Staggered twinkle fireflies / stars (GPU friendly)
  const fireflies = [
    { top: '18%', left: '22%', delay: '0s', duration: '2.8s' },
    { top: '26%', left: '78%', delay: '0.7s', duration: '3.2s' },
    { top: '42%', left: '15%', delay: '1.4s', duration: '2.5s' },
    { top: '65%', left: '85%', delay: '0.3s', duration: '3.6s' },
    { top: '78%', left: '28%', delay: '1.1s', duration: '2.9s' },
    { top: '33%', left: '60%', delay: '1.8s', duration: '3.1s' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Subtle Fireflies / Twinkling Night Particles (Disabled if reduced-motion) */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {fireflies.map((ff, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_rgba(253,230,138,0.9)] animate-pulse"
              style={{
                top: ff.top,
                left: ff.left,
                animationDelay: ff.delay,
                animationDuration: ff.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* Epilogue Content Card */}
      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 py-6 flex flex-col items-center select-text">
        <div className="w-full bg-[#FAF6EE]/96 dark:bg-[#17171B]/96 rounded-3xl p-6 sm:p-8 shadow-md border border-[#E3DACB] dark:border-[#26262C] flex flex-col items-center text-center">
          
          <div className="flex items-center gap-2 mb-3 select-none">
            <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase shadow-sm">
              EPILOGUE · THE HORIZON
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal text-text1 leading-tight mb-2">
            Let's build something enduring.
          </h2>

          <p className="text-xs sm:text-sm text-text2 leading-relaxed max-w-md font-body mb-6">
            Whether you're looking for an engineer to architect agentic AI workflows, build resilient backends, or collaborate on open-source systems—my inbox is always open.
          </p>

          {/* Contact Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 select-none">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.geetikavasistha@gmail.com&su=Hello%20Geetika%20%E2%80%94%20Let's%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-accent text-bg hover:opacity-90 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Mail size={14} />
              <span>contact.geetikavasistha@gmail.com</span>
              <ArrowUpRight size={13} />
            </a>

            <Link
              to="/me"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-surface2/60 hover:bg-surface2 text-text1 text-xs sm:text-sm font-bold border border-border/50 transition-all"
            >
              <span>Everything at a glance</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Currently Section Row */}
          <div className="w-full pt-5 border-t border-border/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-6">
            <div className="p-3 rounded-xl bg-[#F3EDE0]/80 dark:bg-[#1F1F24] border border-[#E3DACB] dark:border-[#26262C] flex items-start gap-2.5">
              <Coffee size={15} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-text3 uppercase block">Currently Building</span>
                <span className="text-xs text-text1 font-medium">Distributed Agentic Observability Pipelines</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F3EDE0]/80 dark:bg-[#1F1F24] border border-[#E3DACB] dark:border-[#26262C] flex items-start gap-2.5">
              <BookOpen size={15} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-text3 uppercase block">Currently Reading</span>
                <span className="text-xs text-text1 font-medium">Designing Data-Intensive Applications</span>
              </div>
            </div>
          </div>

          {/* Understated Editorial Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text3 font-body">
            <a
              href="https://github.com/geetikavasistha-01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text1 transition-colors"
            >
              GitHub &rarr;
            </a>
            <a
              href="https://www.linkedin.com/in/geetikavasisthampy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text1 transition-colors"
            >
              LinkedIn &rarr;
            </a>
            <a
              href="https://x.com/GeetikaVasistha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text1 transition-colors"
            >
              Twitter/X &rarr;
            </a>
            <a
              href="https://medium.com/@geetikavasistha13"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text1 transition-colors"
            >
              Medium &rarr;
            </a>
            <a
              href="https://substack.com/@augustine1301"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text1 transition-colors"
            >
              Substack &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
