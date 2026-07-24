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

interface StickerProps {
  title: string;
  className: string;
  children: React.ReactNode;
  styleType?: 'default' | 'note' | 'bracket';
  baseRotate: number;
  customDelay: number;
}

function Sticker({ title, className, children, styleType = 'default', baseRotate, customDelay }: StickerProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Staggered spring entrance, plus subtle continuous idle sway
  const swayAnimation = shouldReduceMotion
    ? { rotate: baseRotate }
    : {
        rotate: [baseRotate - 0.8, baseRotate + 0.8, baseRotate - 0.8],
        transition: {
          duration: 5 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 1.5
        }
      };

  // Lifts, scales up slightly, and straightens to 0 degrees on hover
  const hoverAnimation = shouldReduceMotion ? {} : {
    y: -6,
    rotate: 0,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  const getStyleClasses = () => {
    switch (styleType) {
      case 'note':
        return 'bg-amber-50/90 dark:bg-amber-950/15 border border-amber-200/50 dark:border-amber-900/30 rounded-lg p-3.5 shadow-sm text-text1';
      case 'bracket':
        return 'bg-surface border-l-4 border-l-teal border-y border-r border-border/80 rounded-r-xl rounded-l-sm p-3 shadow-sm text-text2';
      default:
        return 'bg-surface border border-border/80 rounded-xl p-3 shadow-sm text-text2';
    }
  };

  const getTapeAccent = () => {
    if (styleType === 'note') {
      // Washi-tape strip
      return (
        <div 
          className="absolute -top-3 left-1/4 w-12 h-3.5 bg-teal/20 dark:bg-teal/15 border-x border-dashed border-teal/30 transform rotate-[-4deg] z-10 select-none pointer-events-none"
          style={{ clipPath: 'polygon(5% 0%, 95% 2%, 90% 98%, 10% 100%)' }}
        />
      );
    }
    if (styleType === 'bracket') {
      // Folded corner style
      return (
        <div 
          className="absolute -top-2.5 right-2 w-8 h-2.5 bg-rose/25 dark:bg-rose/15 border-y border-dashed border-rose/30 transform rotate-[15deg] z-10 select-none pointer-events-none"
        />
      );
    }
    // Default tape strip
    return (
      <div 
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-text3/10 dark:bg-white/5 backdrop-blur-[1px] border border-text3/10 shadow-[0_1px_1px_rgba(0,0,0,0.03)] z-10 transform -rotate-3 select-none pointer-events-none"
        style={{ clipPath: 'polygon(5% 0%, 95% 5%, 90% 95%, 10% 100%)' }}
      />
    );
  };

  return (
    <motion.div
      custom={customDelay}
      variants={stickerVariants}
      animate={swayAnimation}
      whileHover={hoverAnimation}
      className={`relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-none md:absolute transition-shadow duration-300 hover:shadow-md hover:border-green/45 pointer-events-auto ${getStyleClasses()} ${className}`}
    >
      {getTapeAccent()}
      <div className="flex flex-col gap-1 mt-1">
        <span className="text-[9px] font-mono tracking-widest text-text4 uppercase font-bold">
          {title}
        </span>
        <div className="text-xs leading-relaxed font-body">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Decorative background collage elements
function AccentStar({ className, shouldReduceMotion }: { className: string; shouldReduceMotion: boolean }) {
  return (
    <motion.svg
      animate={shouldReduceMotion ? {} : {
        rotate: 360,
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`hidden md:block absolute w-4 h-4 text-amber/60 pointer-events-none ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </motion.svg>
  );
}

function AccentSquiggle({ className, shouldReduceMotion }: { className: string; shouldReduceMotion: boolean }) {
  return (
    <motion.svg
      animate={shouldReduceMotion ? {} : {
        y: [0, -3, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`hidden md:block absolute w-8 h-4 text-teal/40 pointer-events-none ${className}`}
      viewBox="0 0 24 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M2 5c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
    </motion.svg>
  );
}

function AccentHeart({ className, shouldReduceMotion }: { className: string; shouldReduceMotion: boolean }) {
  return (
    <motion.svg
      animate={shouldReduceMotion ? {} : {
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`hidden md:block absolute w-4 h-4 text-rose/60 pointer-events-none ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </motion.svg>
  );
}

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

      {/* Scattered Collage Hero / Zine Ref Sheet */}
      <div className="flex flex-col items-center w-full md:relative md:h-[640px] md:flex-row md:justify-center md:items-center mt-12 mb-16 overflow-visible">
        
        {/* Accent squiggles and stars */}
        <AccentStar className="left-[23%] top-[10%]" shouldReduceMotion={shouldReduceMotion} />
        <AccentSquiggle className="left-[22%] bottom-[15%]" shouldReduceMotion={shouldReduceMotion} />
        <AccentHeart className="right-[22%] top-[8%]" shouldReduceMotion={shouldReduceMotion} />
        <AccentStar className="right-[24%] bottom-[12%]" shouldReduceMotion={shouldReduceMotion} />

        {/* Central Avatar card */}
        <motion.div
          animate={avatarFloat.animate}
          className="w-[240px] h-[240px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden border border-border bg-surface shadow-md flex items-center justify-center z-10 transition-all duration-300 hover:scale-[1.01] mb-6 md:mb-0 relative"
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
              className="w-full h-full object-contain p-6"
            />
          </AnimatePresence>
        </motion.div>

        {/* Scattered Sticker Layer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 justify-center w-full md:absolute md:inset-0 md:pointer-events-none"
        >
          {/* Identity */}
          <Sticker 
            title="👋 Identity" 
            className="rotate-[-1.5deg] md:rotate-[-4deg] md:left-[2%] md:top-[2%] md:w-[190px]"
            baseRotate={-4}
            customDelay={0.08}
          >
            <span className="font-semibold text-text1">Geetika Vasistha</span>
            <span className="block text-[10px] text-text3 font-mono mt-0.5">@geekykunoichi</span>
          </Sticker>

          {/* Focus */}
          <Sticker 
            title="✨ Focus" 
            className="rotate-[2deg] md:rotate-[2deg] md:left-[3%] md:top-[17%] md:w-[200px]"
            styleType="note"
            baseRotate={2}
            customDelay={0.16}
          >
            <span className="italic text-text2">"engineering intelligence, one model at a time"</span>
          </Sticker>

          {/* ML & DS Skills */}
          <Sticker 
            title="🤖 ML & DS" 
            className="rotate-[-2deg] md:rotate-[3deg] md:left-[1%] md:top-[38%] md:w-[210px]"
            baseRotate={3}
            customDelay={0.24}
          >
            <span className="text-text2">Python, scikit-learn, XGBoost, LangChain, HuggingFace</span>
          </Sticker>

          {/* Currently Listening */}
          <Sticker 
            title={track?.isPlaying ? '⚡ Now Playing' : '🎵 Last Played'} 
            className="rotate-[-1deg] md:rotate-[-3deg] md:left-[3%] md:bottom-[4%] md:w-[210px]"
            baseRotate={-3}
            customDelay={0.32}
          >
            <a
              href={track?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group/track"
            >
              <img
                src={track?.albumArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80'}
                alt={track?.title || 'White Ferrari'}
                className="w-8 h-8 rounded object-cover border border-border"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-text1 truncate group-hover/track:text-green group-hover/track:underline transition-colors text-[11px]">
                  {track?.title || 'White Ferrari'}
                </span>
                <span className="text-[10px] text-text3 truncate">
                  {track?.artist || 'Frank Ocean'}
                </span>
              </div>
            </a>
          </Sticker>

          {/* On Loop Favorites */}
          <Sticker 
            title="🎬 On Loop" 
            className="rotate-[-2deg] md:rotate-[-2deg] md:left-[26%] md:top-[2%] md:w-[180px]"
            styleType="bracket"
            baseRotate={-2}
            customDelay={0.4}
          >
            <ul className="flex flex-col gap-1 text-[11px] text-text2 font-sans list-none">
              <li>🎬 Enola Holmes</li>
              <li>🏴‍☠️ One Piece</li>
              <li>⚽ Ted Lasso</li>
              <li>⏱️ Steins;Gate</li>
            </ul>
          </Sticker>

          {/* Reading / Shelf List */}
          <Sticker 
            title="📚 On the Shelf" 
            className="rotate-[1deg] md:rotate-[3deg] md:right-[26%] md:top-[2%] md:w-[200px]"
            baseRotate={3}
            customDelay={0.48}
          >
            <ul className="flex flex-col gap-1 text-[10px] text-text2 font-sans list-none leading-tight">
              <li>• Designing ML Systems</li>
              <li>• Designing Data-Intensive Apps</li>
              <li>• Generative Agents Paper</li>
            </ul>
          </Sticker>

          {/* Frontend Skills */}
          <Sticker 
            title="⚙️ Frontend" 
            className="rotate-[1.5deg] md:rotate-[-5deg] md:right-[2%] md:top-[5%] md:w-[195px]"
            baseRotate={-5}
            customDelay={0.56}
          >
            <span className="text-text2">React, TypeScript, Tailwind CSS, HTMX</span>
          </Sticker>

          {/* Philosophy Card */}
          <Sticker 
            title="💡 Philosophy" 
            className="rotate-[0.5deg] md:rotate-[2deg] md:right-[1%] md:top-[21%] md:w-[210px]"
            styleType="note"
            baseRotate={2}
            customDelay={0.64}
          >
            <span className="font-semibold text-text1 block">Precision over speed</span>
            <span className="text-[11px] text-text3 mt-0.5 block leading-normal">
              Stable systems are premium. Build things that work under pressure.
            </span>
          </Sticker>

          {/* Climate Tech */}
          <Sticker 
            title="🌍 Climate Tech" 
            className="rotate-[-2deg] md:rotate-[-2deg] md:right-[1%] md:top-[43%] md:w-[210px]"
            baseRotate={-2}
            customDelay={0.72}
          >
            <span className="text-text2">
              Urban heat island detection & physics-informed cooling intervention.
            </span>
          </Sticker>

          {/* Location */}
          <Sticker 
            title="📍 Location" 
            className="rotate-[1deg] md:rotate-[4deg] md:right-[4%] md:bottom-[4%] md:w-[190px]"
            baseRotate={4}
            customDelay={0.8}
          >
            <span className="font-medium text-text1">Delhi NCR, India</span>
            <span className="block text-[10px] text-text4 mt-0.5 font-mono">available worldwide</span>
          </Sticker>
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
