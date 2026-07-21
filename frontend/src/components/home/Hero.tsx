import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import kunoichi from '../../assets/kunoichi.png';
import kunoichiDark from '../../assets/kunoichi-dark.png';

export default function Hero() {
  const { theme, recruiterMode } = useUIStore();
  const currentAvatar = theme === 'dark' ? kunoichiDark : kunoichi;

  return (
    <section className="pt-24 pb-12 w-full flex flex-col items-start relative z-10">
      {/* Avatar & Social Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full mb-8">
        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-surface2 border border-border shadow-md flex items-center justify-center">
          <img
            src={currentAvatar}
            alt="Geetika Vasistha"
            className="w-full h-full object-contain p-1.5"
          />
        </div>
        
        {/* Social Links */}
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/geetikavasistha-01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text3 hover:text-text1 transition-colors"
            title="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/geetikavasisthampy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text3 hover:text-text1 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text3 hover:text-text1 transition-colors"
            title="Twitter"
          >
            <FaXTwitter size={18} />
          </a>
        </div>
      </div>

      {/* Name and Alias */}
      <div className="flex flex-col mb-8">
        <h1 className="text-5xl sm:text-6xl font-display font-normal leading-none tracking-tight">
          Geetika <span className="text-text3">Vasistha</span>
        </h1>
        <span className="text-xs text-text3 font-mono mt-2 italic select-none">
          geekykunoichi
        </span>
      </div>

      {/* Bio Prose Block */}
      <div className="space-y-6 text-sm text-text2 leading-relaxed max-w-[620px]">
        <p className="flex flex-wrap items-center gap-2">
          I am an AI engineer and data scientist building intelligent systems. Currently crafting models with
          <span className="inline-flex items-center gap-1.5 bg-surface2 border border-border text-text1 text-xs px-2.5 py-1 rounded-md font-mono font-medium">
            Python
          </span>
          ,
          <span className="inline-flex items-center gap-1.5 bg-surface2 border border-border text-text1 text-xs px-2.5 py-1 rounded-md font-mono font-medium">
            FastAPI
          </span>
          , and
          <span className="inline-flex items-center gap-1.5 bg-surface2 border border-border text-text1 text-xs px-2.5 py-1 rounded-md font-mono font-medium">
            scikit-learn
          </span>
          .
        </p>

        <p>
          I focus on machine learning algorithms, distributed pipelines, and climate technology.
          My background lies at the intersection of robotic vision systems (co-founding Raphson Robotics) and high-throughput data pipelines.
        </p>

        <p className="text-text3">
          Explore my latest <Link to="/projects" className="underline hover:text-text1 font-medium">projects</Link>, read my 
          work <Link to="/work" className="underline hover:text-text1 font-medium">experience</Link>, or checkout the 
          technical <Link to="/blog" className="underline hover:text-text1 font-medium">blog</Link>.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <a
          href="#currently-building"
          className="inline-flex items-center gap-2 border border-border text-text1 bg-surface rounded-full px-5 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-surface2 transition-all duration-300 shadow-sm"
        >
          Everything at a glance <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Fan of line (hidden in recruiter mode) */}
      {!recruiterMode && (
        <div className="mt-12 text-xs text-text3 italic select-none font-display">
          fan of · melodic OSTs and · memoir writing and · paper + systems
        </div>
      )}
    </section>
  );
}
