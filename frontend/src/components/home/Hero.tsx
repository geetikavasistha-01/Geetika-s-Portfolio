import React from 'react';
import { ArrowUpRight, FolderGit2, Briefcase, FileText, Headphones, PenTool, BookOpen } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaXTwitter, FaMedium, FaPython } from 'react-icons/fa6';
import { SiHashnode, SiSubstack, SiFastapi, SiScikitlearn } from 'react-icons/si';

import renge from '../../assets/renge.jpg';
import { LinkPreview } from '../ui/LinkPreview';
import SpotifyWidget from './SpotifyWidget';

export default function Hero() {
  const { theme, recruiterMode } = useUIStore();

  return (
    <section className="pt-24 pb-12 w-full flex flex-col items-start relative z-10">
      {/* Avatar & Social Header - Polaroid Taped Style */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 w-full mb-8">
        {/* Taped Polaroid Container */}
        <div className="relative rotate-[-3deg] hover:rotate-0 transition-all duration-300 transform origin-bottom-left select-none flex-shrink-0">
          {/* Tape Strip */}
          <div 
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/20 dark:bg-white/10 backdrop-blur-[2.5px] border border-white/20 shadow-sm z-20 transform -rotate-6"
            style={{ 
              clipPath: 'polygon(5% 0%, 95% 5%, 90% 95%, 10% 100%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }} 
          />
          
          {/* Avatar Box (Polaroid Frame) */}
          <a
            href="https://nonnontv.fandom.com/wiki/Non_Non_Biyori_(manga)"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-[96px] h-[108px] bg-zinc-50 dark:bg-zinc-100 p-2 pb-5 rounded shadow-md border border-zinc-200/80 hover:border-zinc-300 dark:border-zinc-300 transition-all duration-300 group cursor-pointer"
            title="Non Non Biyori (manga)"
          >
            <div className="w-full h-[76px] overflow-hidden bg-zinc-200/50 border border-zinc-300/40 rounded-sm">
              <img
                src={renge}
                alt="Renge Miyauchi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </a>
        </div>

        {/* Name and Socials */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-text1 leading-none tracking-tight">
            Geetika <span className="text-[#34908B]">Vasistha</span>
          </h1>
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-4 items-center mt-3">
            <a
              href="https://github.com/geetikavasistha-01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text3 hover:text-[#34908B] transition-colors"
              title="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/geetikavasisthampy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text3 hover:text-[#34908B] transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://x.com/GeetikaVasistha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text3 hover:text-[#34908B] transition-colors"
              title="Twitter/X"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://medium.com/@geetikavasistha13"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text3 hover:text-[#34908B] transition-colors"
              title="Medium"
            >
              <FaMedium size={18} />
            </a>
            <a
              href="https://hashnode.com/@ai-for-all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text3 hover:text-[#34908B] transition-colors"
              title="Hashnode"
            >
              <SiHashnode size={17} />
            </a>
            <a
              href="https://substack.com/@augustine1301"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text3 hover:text-[#34908B] transition-colors"
              title="Substack"
            >
              <SiSubstack size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Name and Alias Divider Line */}
      <div className="flex items-center gap-3 w-full mb-8">
        <span className="text-xs text-text3 font-mono italic select-none">
          geekykunoichi
        </span>
        <div className="h-px flex-1 bg-border/40" />
      </div>

      {/* Bio Prose Block with Left Border Indent */}
      <div className="pl-4 border-l border-border/70 space-y-6 text-sm text-text2 leading-relaxed max-w-[620px] font-sans">
        <p>
          I spend most of my time building <span className="font-semibold text-text1">Agentic AI</span>, <span className="font-semibold text-text1">distributed systems</span>, and <span className="font-semibold text-text1">backend infrastructure</span> for intelligent applications.
        </p>

        <p>
          I enjoy designing systems that <span className="italic text-text1">reason</span>, <span className="font-semibold text-text1">scale</span>, and remain <span className="font-semibold text-text1">reliable</span> under real-world constraints.
        </p>

        <p>
          I care deeply about <span className="font-semibold text-text1">open source</span>, <span className="font-semibold text-text1">privacy-preserving systems</span>, and <span className="font-semibold text-text1">security-first engineering</span>.
        </p>

        <p className="text-text3 flex flex-wrap items-center gap-1">
          Explore my latest 
          <Link to="/projects" className="inline-flex items-center gap-0.5 underline hover:text-[#34908B] font-medium transition-colors">
            <FolderGit2 size={13} /> projects
          </Link>
          , read my 
          <Link to="/work" className="inline-flex items-center gap-0.5 underline hover:text-[#34908B] font-medium transition-colors">
            <Briefcase size={13} /> experience
          </Link>
          , or check out the 
          <Link to="/blog" className="inline-flex items-center gap-0.5 underline hover:text-[#34908B] font-medium transition-colors">
            <FileText size={13} /> blog
          </Link>
          .
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <a
          href="#featured-work"
          className="inline-flex items-center gap-2 border border-border/80 hover:border-[#34908B]/40 text-text2 hover:text-[#34908B] bg-surface2/30 rounded-full px-5 py-2 text-xs font-medium tracking-wider transition-all duration-300 shadow-sm"
        >
          Everything at a glance <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Fan of line with custom matching icons */}
      <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text3 font-mono">
        <span className="italic select-none mr-0.5">fan of</span>
        <span className="inline-flex items-center gap-1 text-text2">
          <Headphones size={13} className="text-[#34908B]" /> melodic OSTs
        </span>
        <span className="select-none text-text4">,</span>
        <span className="inline-flex items-center gap-1 text-text2">
          <PenTool size={13} className="text-[#34908B]" /> memoir writing
        </span>
        <span className="select-none italic text-text4">and</span>
        <span className="inline-flex items-center gap-1 text-text2">
          <BookOpen size={13} className="text-[#34908B]" /> paper + systems
        </span>
      </div>

      {/* Compact Spotify Status */}
      <SpotifyWidget />
    </section>
  );
}
