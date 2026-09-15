import React from 'react';
import { ArrowUpRight, FolderGit2, Briefcase, FileText, Headphones, PenTool, BookOpen, Sun, Moon } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaXTwitter, FaMedium } from 'react-icons/fa6';
import { SiHashnode, SiSubstack } from 'react-icons/si';

import renge from '../../assets/renge.png';
import keepGoing from '../../assets/keep-going.jpg';
import SpotifyWidget from './SpotifyWidget';

export default function Hero() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <div className="w-full flex flex-col items-start relative select-none">
      {/* 1. Cover Banner with Theme Toggle */}
      <div 
        className="h-36 sm:h-52 w-full bg-cover bg-center bg-no-repeat relative border-b border-border/20"
        style={{ backgroundImage: `url(${keepGoing})` }}
      >
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none" />
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-border/60 hover:border-text2 text-text3 hover:text-text1 transition-colors bg-surface/75 backdrop-blur-sm focus:outline-none"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* 2. Profile Details Container */}
      <div className="px-6 sm:px-8 pb-6 pt-0 relative flex flex-col items-start select-text w-full">
        {/* Mascot Avatar (Overlapping Banner) */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-surface overflow-hidden shadow-md -mt-10 sm:-mt-12 bg-surface flex items-center justify-center relative z-20 select-none">
          <img src={renge} alt="Renge Avatar" className="w-full h-full object-cover" />
        </div>

        {/* Name & Title */}
        <div className="mt-4 flex flex-col">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-text1 leading-tight not-italic">
              hey, i'm geetika
            </h1>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.geetikavasistha@gmail.com&su=Hire%20Me%20%E2%80%94%20Saw%20your%20portfolio!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent text-bg hover:opacity-90 text-xs font-bold shadow-sm transition-all duration-300 select-none md:mt-1"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
          <span className="text-[11px] text-text3 font-mono mt-1">
            @geekykunoichi
          </span>
        </div>

        {/* Bio Text */}
        <div className="mt-4 space-y-3.5 text-base sm:text-lg text-text2 leading-relaxed max-w-2xl font-body">
          <p>
            I spend most of my time building <span className="font-semibold text-text1">Agentic AI</span>, <span className="font-semibold text-text1">distributed systems</span>, and <span className="font-semibold text-text1">backend infrastructure</span> for intelligent applications.
          </p>
          <p>
            I enjoy designing systems that <span className="italic text-text1">reason</span>, <span className="font-semibold text-text1">scale</span>, and remain <span className="font-semibold text-text1">reliable</span> under real-world constraints.
          </p>
          <p>
            I care deeply about <span className="font-semibold text-text1">open source</span>, <span className="font-semibold text-text1">privacy-preserving systems</span>, and <span className="font-semibold text-text1">security-first engineering</span>.
          </p>
          <p className="text-text3 flex flex-wrap items-center gap-1 text-sm sm:text-base">
            Explore my latest{' '}
            <Link to="/projects" className="inline-flex items-center gap-0.5 underline hover:text-accent font-medium transition-colors">
              <FolderGit2 size={14} /> projects
            </Link>
            , read my{' '}
            <Link to="/work" className="inline-flex items-center gap-0.5 underline hover:text-accent font-medium transition-colors">
              <Briefcase size={14} /> experience
            </Link>
            , or check out the{' '}
            <Link to="/blog" className="inline-flex items-center gap-0.5 underline hover:text-accent font-medium transition-colors">
              <FileText size={14} /> blog
            </Link>
            .
          </p>
        </div>

        {/* Elsewhere Pills + CTAs */}
        <div className="mt-6 w-full">
          <span className="text-[9px] font-mono tracking-widest text-text3 uppercase block mb-3">
            ELSEWHERE
          </span>
          <div className="flex flex-wrap gap-2 items-center">
            <a 
              href="https://github.com/geetikavasistha-01" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/geetikavasisthampy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/GeetikaVasistha" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors"
            >
              Twitter/X
            </a>
            <a 
              href="https://medium.com/@geetikavasistha13" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors"
            >
              Medium
            </a>
            <a 
              href="https://hashnode.com/@ai-for-all" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors"
            >
              Hashnode
            </a>
            <a 
              href="https://substack.com/@augustine1301" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors"
            >
              Substack
            </a>
            <Link 
              to="/me" 
              className="px-3.5 py-1.5 rounded-full bg-accent text-bg hover:opacity-90 text-[11px] font-body transition-all hover:shadow-md font-medium"
            >
              Everything at a glance &rarr;
            </Link>
            <Link 
              to="/human" 
              className="px-3.5 py-1.5 rounded-full bg-[#F9C5D5] hover:bg-[#F4AFC3] text-zinc-900 text-[11px] font-body transition-all hover:shadow-md font-medium"
            >
              Personal Side &rarr;
            </Link>
          </div>
        </div>

        {/* Fan of + Spotify status bar */}
        <div className="mt-6 pt-5 border-t border-border/40 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-text3 font-mono">
            <span className="italic select-none mr-0.5">fan of</span>
            <a
              href="https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text2 hover:text-accent hover:underline transition-colors"
            >
              <Headphones size={13} className="text-accent" /> Taylor Swift
            </a>
            <span className="select-none text-text4">,</span>
            <a
              href="https://medium.com/@geetikavasistha13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text2 hover:text-accent hover:underline transition-colors"
            >
              <PenTool size={13} className="text-accent" /> Writing
            </a>
            <span className="select-none italic text-text4">and</span>
            <a
              href="https://in.pinterest.com/geezxoeyy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text2 hover:text-accent hover:underline transition-colors"
            >
              <BookOpen size={13} className="text-accent" /> pinterest boards
            </a>
          </div>

          {/* Spotify Status */}
          <SpotifyWidget />
        </div>
      </div>
    </div>
  );
}
