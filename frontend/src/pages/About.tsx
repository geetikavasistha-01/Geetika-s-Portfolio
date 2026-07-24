import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import SkillConstellation from '../components/about/SkillConstellation';
import { useUIStore } from '../store/uiStore';
import { LinkPreview } from '../components/ui/LinkPreview';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { api } from '../lib/api';

const skillGroups = [
  {
    label: 'ML & DATA SCIENCE',
    skills: 'Python, scikit-learn, XGBoost, LSTM, LangChain, HuggingFace, BERT'
  },
  {
    label: 'DATA ENGINEERING',
    skills: 'FastAPI, Pandas, NumPy, Streamlit, SQLite, MongoDB, Redis'
  },
  {
    label: 'INFRASTRUCTURE',
    skills: 'Docker, Git, GitHub Actions, GCP, Vercel, Railway'
  },
  {
    label: 'FRONTEND',
    skills: 'React, TypeScript, Tailwind CSS, HTMX, Jinja2'
  },
  {
    label: 'RESEARCH & WRITING',
    skills: 'Technical blogs, Memoir writing, Research papers (ICMCE 2026)'
  }
];

const philosophyCards = [
  {
    title: 'Precision over speed',
    description: 'Build things that work under pressure. Fast prototypes are cheap, stable systems are premium.'
  },
  {
    title: 'Data tells stories',
    description: 'Every model is a hypothesis about the world. Filter out the noise to capture the real signal.'
  },
  {
    title: 'Ship, then refine',
    description: 'Iteration beats waiting for perfection. Get it in front of users, monitor logs, and optimize.'
  },
  {
    title: 'Write to understand',
    description: 'If you cannot explain it to an anonymous questioner, you do not fully understand it yet.'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const stickerVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: (customDelay: number) => ({ 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 85, 
      damping: 13,
      delay: customDelay
    }
  })
};

export default function About() {
  const { theme } = useUIStore();
  const shouldReduceMotion = useReducedMotion();
  const currentAvatar = "/illustration - about page Background Removed.png";
  const [track, setTrack] = useState<any>(null);

  useEffect(() => {
    let active = true;
    const fetchNowPlaying = async () => {
      try {
        const res = await api.get('/spotify/now-playing');
        if (active) setTrack(res.data);
      } catch (err) {
        console.error('Error fetching now playing track:', err);
      }
    };
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // Avatar Floating Animation
  const avatarFloat = shouldReduceMotion ? {} : {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const nowPlayingTitle = track?.isPlaying ? track.title : "cardigan";
  const nowPlayingArtist = track?.isPlaying ? track.artist : "Taylor Swift";
  const nowPlayingAlbum = track?.isPlaying ? (track.album || "folklore") : "folklore";
  const nowPlayingArt = track?.isPlaying ? track.albumArt : "https://i.scdn.co/image/ab67616d0000b27395f2e53b8c3d8985cf9c07cf";

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-4 select-none items-center text-center">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>ABOUT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
        </div>
        <h1 className="text-4xl font-sans font-semibold text-text1 mt-2">
          About Me
        </h1>
        <p className="text-sm text-text3 mt-2">
          The journey, the tools, and the philosophy behind what I build.
        </p>
      </div>

      {/* Saturated Color-block Poster Hero */}
      <div className="w-full bg-heroPink rounded-[32px] p-6 md:p-12 md:relative md:h-[640px] flex flex-col items-center justify-center mt-12 mb-16 overflow-hidden select-none">
        
        {/* Right side static/animated bold stars */}
        <div className="hidden md:block absolute right-[4%] top-[10%] z-0 pointer-events-none">
          <motion.svg
            animate={shouldReduceMotion ? {} : { rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 text-heroLime"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
          </motion.svg>
        </div>

        <div className="hidden md:block absolute right-[6%] top-[45%] z-0 pointer-events-none">
          <motion.svg
            animate={shouldReduceMotion ? {} : { rotate: -360, scale: [1, 1.08, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 text-heroLime"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
          </motion.svg>
        </div>

        <div className="hidden md:block absolute right-[4%] bottom-[10%] z-0 pointer-events-none">
          <motion.svg
            animate={shouldReduceMotion ? {} : { rotate: 360, scale: [1, 1.12, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 text-heroLime"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
          </motion.svg>
        </div>

        {/* Central Avatar card */}
        <motion.div
          animate={avatarFloat.animate}
          className="w-[240px] h-[340px] md:w-[350px] md:h-[500px] flex items-center justify-center z-10 transition-all duration-300 hover:scale-[1.01] mb-6 md:mb-0 relative"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={theme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              src={currentAvatar}
              alt="Geetika Vasistha"
              className="w-full h-full object-contain"
            />
          </AnimatePresence>
        </motion.div>

        {/* Scattered Color-block Stickers Layer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 justify-center w-full md:absolute md:inset-0 md:pointer-events-none"
        >
          {/* Card 1: Tech Stack */}
          <motion.div
            variants={stickerVariants}
            custom={0.08}
            animate={shouldReduceMotion ? { rotate: -2 } : {
              rotate: [-2.5, -1.5, -2.5],
              transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ y: -6, rotate: 0, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="bg-heroCream text-heroDark rounded-3xl p-5 shadow-sm md:absolute md:left-[4%] md:top-[6%] md:w-[320px] pointer-events-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-heroPink font-bold flex items-center gap-1.5 uppercase mb-3">
              TECH STACK 💻
            </span>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Python', 'SQL', 'R', 'Pandas', 'Scikit-learn', 'PyTorch', 'React', 'Next.js', 'Tailwind CSS', 'PostgreSQL'].map((tech) => (
                <span key={tech} className="border border-heroDark/15 bg-heroCream rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold shadow-xs">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xs text-heroDark/80 font-medium">
              Turning data into decisions. 💖
            </p>
          </motion.div>

          {/* Card 2: Philosophy */}
          <motion.div
            variants={stickerVariants}
            custom={0.16}
            animate={shouldReduceMotion ? { rotate: 3 } : {
              rotate: [2.5, 3.5, 2.5],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            whileHover={{ y: -6, rotate: 0, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="bg-heroLime text-heroDark rounded-3xl p-5 shadow-sm md:absolute md:right-[15%] md:top-[8%] md:w-[260px] pointer-events-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-heroDark/70 font-bold flex items-center gap-1.5 uppercase mb-3">
              ✨ PHILOSOPHY
            </span>
            <div className="text-xs leading-relaxed font-semibold flex flex-col gap-1 text-heroDark/90">
              <p>Curious by nature.</p>
              <p>Driven by purpose.</p>
              <p>Building things that create impact. 💖</p>
            </div>
          </motion.div>

          {/* Card 3: Now Playing */}
          <motion.div
            variants={stickerVariants}
            custom={0.24}
            animate={shouldReduceMotion ? { rotate: 2 } : {
              rotate: [1.5, 2.5, 1.5],
              transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.0 }
            }}
            whileHover={{ y: -6, rotate: 0, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="bg-heroCyan text-white rounded-3xl p-5 shadow-sm md:absolute md:left-[2%] md:top-[38%] md:w-[320px] pointer-events-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-white/80 font-bold flex items-center gap-1.5 uppercase mb-3">
              🎵 NOW PLAYING
            </span>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={nowPlayingArt}
                alt={nowPlayingTitle}
                className="w-16 h-16 rounded-xl object-cover border border-white/10 shadow-xs flex-shrink-0"
              />
              <div className="flex flex-col min-w-0 text-white">
                <span className="font-bold text-sm truncate leading-snug">
                  {nowPlayingTitle}
                </span>
                <span className="text-[11px] text-white/85 truncate mt-0.5">
                  {nowPlayingArtist}
                </span>
                <span className="text-[10px] text-white/70 truncate">
                  {nowPlayingAlbum}
                </span>
              </div>
            </div>
            
            {/* Music Player Bar */}
            <div className="flex items-center gap-2 mt-2">
              <button className="text-white hover:scale-105 transition-transform flex-shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-white rounded-full" />
              </div>
              <span className="text-[10px] font-mono text-white/85">
                1:32 / 3:59
              </span>
            </div>
          </motion.div>

          {/* Card 4: On Loop */}
          <motion.div
            variants={stickerVariants}
            custom={0.32}
            animate={shouldReduceMotion ? { rotate: -2 } : {
              rotate: [-2.5, -1.5, -2.5],
              transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
            whileHover={{ y: -6, rotate: 0, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="bg-heroCyan text-white rounded-3xl p-5 shadow-sm md:absolute md:left-[6%] md:bottom-[4%] md:w-[300px] pointer-events-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-white/80 font-bold flex items-center gap-1.5 uppercase mb-3">
              ♻️ ONLOOP
            </span>
            <div className="flex flex-col gap-3">
              {[
                { title: 'Saturn', artist: 'SZA', art: 'https://i.scdn.co/image/ab67616d0000b27376a917b2f6ef539cc233d6b0' },
                { title: 'Somebody Else', artist: 'The 1975', art: 'https://i.scdn.co/image/ab67616d0000b273f08b340026e63283287313a5' },
                { title: 'Stick Season', artist: 'Noah Kahan', art: 'https://i.scdn.co/image/ab67616d0000b273b74b889a7f3408e06385cf83' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={item.art} alt={item.title} className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                  <div className="flex flex-col min-w-0 text-white">
                    <span className="font-bold text-xs truncate">{item.title}</span>
                    <span className="text-[10px] text-white/85 truncate mt-0.5">{item.artist}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 5: Shelf */}
          <motion.div
            variants={stickerVariants}
            custom={0.4}
            animate={shouldReduceMotion ? { rotate: -1.5 } : {
              rotate: [-2, -1, -2],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.0 }
            }}
            whileHover={{ y: -6, rotate: 0, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="bg-heroLime text-heroDark rounded-3xl p-5 shadow-sm md:absolute md:right-[12%] md:bottom-[6%] md:w-[300px] pointer-events-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-heroDark/70 font-bold flex items-center gap-1.5 uppercase mb-3">
              📖 SHELF
            </span>
            <div className="flex flex-col gap-3">
              {[
                { title: 'Atomic Habits', author: 'James Clear', art: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988390i/40121378.jpg' },
                { title: 'Deep Work', author: 'Cal Newport', art: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg' },
                { title: 'The Psychology of Money', author: 'Morgan Housel', art: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1584113775i/51884877.jpg' }
              ].map((book, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={book.art} alt={book.title} className="w-9 h-12 rounded object-cover border border-heroDark/10 shadow-2xs" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs truncate text-heroDark">{book.title}</span>
                    <span className="text-[10px] text-heroDark/80 truncate mt-0.5">{book.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-[720px] mx-auto w-full flex flex-col gap-16 mt-8">
        
        {/* Journey Section */}
        <section className="flex flex-col">
          <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
            My Journey
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-text2 leading-relaxed">
            <p>
              My journey into tech began at <LinkPreview url="https://www.srmist.edu.in" previewName="SRM Institute">SRM Institute of Science and Technology</LinkPreview>, specializing in Data Science.
              Early on, I realized I loved building tangible systems, which led to co-founding <LinkPreview url="https://github.com/geetikavasistha-01" previewName="Raphson Robotics">Raphsons Robotics</LinkPreview>,
              an incubator project where I wrote on-device ML scripts for quadruped robots.
            </p>
            <p>
              From robotics, I transitioned into high-performance web engineering and ML pipelines, doing internships at Havish M Consultancy where I designed document intelligence frameworks, and building data pipelines for <LinkPreview url="https://sentinels.copernicus.eu" previewName="Sentinel Satellites">Sentinel satellite</LinkPreview> telemetry.
            </p>
            <p>
              Besides building, I write technical memoirs and keep a micro-log diary of bugs, insights, and late-night compilation files.
            </p>
          </div>
        </section>

        {/* Skill Constellation Section */}
        <section className="flex flex-col">
          <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
            Skill Graph
          </h2>
          <SkillConstellation />
        </section>

        {/* Stack & Style Section */}
        <section className="flex flex-col">
          <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
            Stack & Style
          </h2>
          <div className="flex flex-col gap-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col border-b border-border/40 pb-3">
                <span className="text-[9px] tracking-[0.2em] font-semibold text-text3 mb-1.5 uppercase font-mono">
                  {group.label}
                </span>
                <p className="text-xs sm:text-sm text-text2 leading-normal">
                  {group.skills}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="flex flex-col mb-4">
          <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
            Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-text2 leading-relaxed mb-6">
            Engineering is not just writing code — it is organizing systems to resolve human ambiguities. These core anchors guide my building decisions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {philosophyCards.map((card) => (
              <div key={card.title} className="bg-surface border border-border rounded-xl p-5 select-none">
                <h3 className="text-xs sm:text-sm font-semibold text-text1 mb-1">
                  {card.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-text3 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
