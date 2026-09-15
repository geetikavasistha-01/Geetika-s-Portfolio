import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import PlaylistEmbed from '../components/human/PlaylistEmbed';
import PostEmbed from '../components/human/PostEmbed';
import { 
  playlists, 
  watchItems, 
  posts, 
  latelyStatus, 
  featuredBooks, 
  returningPapers, 
  journalEntries, 
  smallTruths 
} from '../data/humanData';
import renge from '../assets/human-renge.jpg';
import keepGoing from '../assets/keep-going.jpg';
import { 
  Moon, Sun, ArrowUpRight, ExternalLink, ChevronDown, ChevronUp, Star 
} from 'lucide-react';

export default function Human() {
  const { theme, toggleTheme } = useUIStore();
  const [watchFilter, setWatchFilter] = useState<'all' | 'movie' | 'series' | 'anime'>('all');
  const [openJournalIdx, setOpenJournalIdx] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      if (prefersReducedMotion) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => {
          console.warn('Background video autoplay was prevented:', err);
        });
      }
    }
  }, []);

  const filteredWatchItems = watchItems.filter(item => 
    watchFilter === 'all' || item.type === watchFilter
  );

  const toggleJournal = (idx: number) => {
    setOpenJournalIdx(prev => prev === idx ? null : idx);
  };

  return (
    <div className="homepage-root w-full flex flex-col relative">
      {/* 1. Background Video */}
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        poster="/videos/homepage-bg-poster.jpg"
      >
        <source src="/videos/Create_a_clean_bright_whimsi.mp4" type="video/mp4" />
        <source src="/videos/homepage-bg.mp4" type="video/mp4" />
        <source src="/videos/homepage-bg.webm" type="video/webm" />
      </video>

      {/* 2. Contrast Overlay */}
      <div className="bg-overlay" />

      {/* 3. Page Content */}
      <div className="homepage-content w-full flex flex-col">
        <PageWrapper>
          {/* SECTION 1 — HEADER */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-surface border border-border shadow-sm mb-16 select-none">
            {/* Banner with theme toggle */}
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

            {/* Profile Content Wrapper */}
            <div className="px-6 pb-6 pt-0 relative flex flex-col items-start">
              {/* Avatar (Overlapping) */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-surface overflow-hidden shadow-md -mt-10 sm:-mt-12 bg-surface flex items-center justify-center relative z-20">
                <img src={renge} alt="Mascot Avatar" className="w-full h-full object-cover" />
              </div>

          {/* Name & Tagline */}
          <div className="mt-4 flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-text1 leading-tight not-italic">
              hey, i'm geetika
            </h1>
            <span className="text-xs sm:text-sm text-text3 italic font-editorial mt-1">
              this is the quieter side.
            </span>
            <span className="text-[10px] text-text4 mt-1 font-body tracking-wider">
              @geekykunoichi
            </span>
          </div>

          {/* Warm Bio */}
          <p className="mt-4 text-base sm:text-lg text-text2 font-body max-w-xl leading-relaxed">
            I engineer software and data pipelines by day, and seek out quiet, analog spaces by night.
            This page is a repository of the music I play, the books I read, and the small, sensory truths I chew on.
          </p>

          {/* Elsewhere Buttons */}
          <div className="mt-6 w-full">
            <span className="text-[9px] font-mono tracking-widest text-text3 uppercase block mb-3">
              ELSEWHERE
            </span>
            <div className="flex flex-wrap gap-2 items-center">
              <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/geetikavasistha" target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors">
                LinkedIn
              </a>
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-text3 text-text3 hover:text-text1 text-[11px] font-body transition-colors">
                Spotify
              </a>
              <Link to="/me" className="px-3.5 py-1.5 rounded-full bg-accent text-bg hover:opacity-90 text-[11px] font-body transition-all hover:shadow-md">
                the technical me &rarr;
              </Link>
            </div>
          </div>

          {/* Anonymous Question Link */}
          <div className="mt-5">
            <Link to="/ama" className="text-xs text-text3 font-body hover:text-accent underline transition-colors">
              send an anonymous question to my inbox
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2 — ON REPEAT */}
      <section className="mb-16">
        <SectionHeader label="on repeat" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {playlists.map((playlist) => (
            <PlaylistEmbed key={playlist.id} playlistId={playlist.id} />
          ))}
        </div>
      </section>

      {/* SECTION 3 — WATCH LIST */}
      <section className="mb-16">
        <SectionHeader label="what i like to watch" />
        
        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 select-none">
          {(['all', 'movie', 'series', 'anime'] as const).map((type) => {
            const isActive = watchFilter === type;
            return (
              <button
                key={type}
                onClick={() => setWatchFilter(type)}
                className={`rounded-full px-4 py-1.5 text-[10px] tracking-wider uppercase transition-all duration-200 border ${
                  isActive
                    ? 'bg-accent text-bg border-accent font-semibold'
                    : 'border-border/60 text-text3 hover:border-text3 hover:text-text1'
                }`}
              >
                {type}s
              </button>
            );
          })}
        </div>

        {/* Watch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <AnimatePresence mode="popLayout">
            {filteredWatchItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={item.title}
                className="group relative bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Poster Container */}
                <div className="aspect-[2/3] w-full bg-surface2 overflow-hidden relative">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Badge (Top-Left) */}
                  <span className="absolute top-3 left-3 bg-surface/80 backdrop-blur-sm text-text1 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded font-mono border border-border/50">
                    {item.type}
                  </span>
                  {/* Rating Badge (Top-Right) */}
                  <span className="absolute top-3 right-3 bg-accent text-bg text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    <Star size={10} className="fill-bg" />
                    {item.rating}
                  </span>
                </div>
                {/* Info Footer */}
                <div className="p-4">
                  <h3 className="font-body font-bold text-sm text-text1 truncate">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-text3 font-body mt-0.5 block">
                    {item.genre}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 4 — WORDS, SCATTERED */}
      <section className="mb-16">
        <SectionHeader label="words, scattered" />
        <div className="flex flex-col gap-6 mt-8 max-w-2xl">
          {posts.map((post) => (
            <PostEmbed key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* SECTION 5 — LATELY */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-3.5 bg-accent rounded-full" />
          <span className="text-[9px] tracking-[0.2em] font-semibold text-text3 uppercase font-mono">
            lately
          </span>
        </div>
        <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col gap-4 font-body text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border/30 pb-3 gap-1">
              <span className="text-text3 italic">listening to</span>
              <span className="text-text1 font-medium">{latelyStatus.listening}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border/30 pb-3 gap-1">
              <span className="text-text3 italic">writing</span>
              <span className="text-text1 font-medium">{latelyStatus.writing}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-text3 italic">looking at</span>
              <span className="text-text1 font-medium">{latelyStatus.looking}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FROM MY SHELF */}
      <section className="mb-16">
        <SectionHeader label="from my shelf" />
        
        {/* Featured books grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {featuredBooks.map((book) => (
            <div key={book.title} className="flex gap-4 items-center bg-surface border border-border p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-20 rounded bg-surface2 overflow-hidden shadow-sm flex-shrink-0">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="font-body font-bold text-sm text-text1 truncate">
                  {book.title}
                </h4>
                <span className="text-xs text-text3 font-body mt-1">
                  {book.author}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Papers subsection */}
        <div className="mt-12">
          <span className="text-[9px] font-mono tracking-widest text-text3 uppercase block mb-4">
            papers i keep returning to
          </span>
          <div className="flex flex-col gap-3 bg-surface border border-border rounded-2xl p-4 shadow-sm">
            {returningPapers.map((paper) => (
              <a
                href={paper.url}
                key={paper.title}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-b-0 hover:text-accent transition-colors group"
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-body font-bold text-xs sm:text-sm text-text1 group-hover:text-accent transition-colors truncate">
                    {paper.title}
                  </span>
                  <span className="text-[10px] text-text3 font-body mt-0.5">
                    {paper.author} · {paper.date}
                  </span>
                </div>
                <ExternalLink size={14} className="text-text4 group-hover:text-accent transition-colors flex-shrink-0 ml-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/shelf" className="inline-flex items-center gap-1 bg-surface border border-border/60 hover:border-text2 text-text3 hover:text-text1 px-5 py-2 rounded-full text-xs font-body transition-colors shadow-sm">
            <span>see the full shelf</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* SECTION 7 — THINKING OUT LOUD (Accordion entries) */}
      <section className="mb-16">
        <SectionHeader label="thinking out loud" />
        <div className="flex flex-col gap-3 mt-8 bg-surface border border-border rounded-2xl p-4 shadow-sm">
          {journalEntries.map((entry, idx) => {
            const isOpen = openJournalIdx === idx;
            return (
              <div key={entry.title} className="border-b border-border/30 last:border-b-0 py-2">
                <button
                  onClick={() => toggleJournal(idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none py-2 group"
                >
                  <div className="flex flex-col">
                    <span className="font-body font-bold text-xs sm:text-sm text-text1 group-hover:text-accent transition-colors">
                      {entry.title}
                    </span>
                    <span className="text-[10px] text-text3 font-body mt-0.5">
                      {entry.date}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-text3 group-hover:text-accent" />
                  ) : (
                    <ChevronDown size={16} className="text-text3 group-hover:text-accent" />
                  )}
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-sm sm:text-base text-text2 leading-relaxed pl-1 pb-2 font-body select-text"
                  >
                    {entry.body}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 8 — THE DAY JOB */}
      <section className="mb-16 select-none">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
          <p className="font-editorial text-lg sm:text-xl italic text-text1 leading-relaxed">
            "i spend my daytime crafting distributed systems and training neural nodes."
          </p>
          <p className="mt-4 text-sm sm:text-base text-text2 font-body max-w-md leading-relaxed">
            By day, my world consists of clean data structures, anomaly models, sat telemetry scripts, and system performance. You can read the formal logs on the other side.
          </p>
          <Link to="/me" className="mt-6 inline-flex items-center gap-1 border border-border/60 hover:border-text2 text-text3 hover:text-text1 px-5 py-2 rounded-full text-xs font-body transition-colors bg-surface shadow-sm">
            <span>the technical side</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* SECTION 9 — SMALL TRUTHS */}
      <section className="mb-20">
        <SectionHeader label="small truths" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {smallTruths.map((truth, idx) => (
            <div key={idx} className="bg-surface border border-border p-5 rounded-2xl shadow-sm text-sm sm:text-base text-text3 leading-relaxed font-body italic flex items-center justify-center text-center">
              "{truth}"
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10 — CLOSING / OUTRO */}
      <section className="w-full py-12 flex flex-col items-center text-center border-t border-border/30 select-none">
        <p className="font-editorial text-base sm:text-lg italic text-text2 max-w-md leading-relaxed">
          "quieter thoughts leave room for cleaner creations."
        </p>
        <Link to="/me" className="mt-4 text-xs text-text3 font-body hover:text-accent underline transition-colors">
          back to the serious stuff &rarr;
        </Link>
        <span className="mt-8 text-[10px] text-text4 font-body">
          with love, <span className="text-accent font-semibold">@geekykunoichi</span>
        </span>
      </section>
        </PageWrapper>
      </div>
    </div>
  );
}
