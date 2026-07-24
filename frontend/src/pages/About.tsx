import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import SkillConstellation from '../components/about/SkillConstellation';
import kunoichi from '../assets/kunoichi.png';
import kunoichiDark from '../assets/kunoichi-dark.png';
import { useUIStore } from '../store/uiStore';
import { LinkPreview } from '../components/ui/LinkPreview';
import { motion } from 'framer-motion';
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
      staggerChildren: 0.1,
    }
  }
};

const stickerVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 }
  }
};

interface StickerProps {
  title: string;
  className: string;
  children: React.ReactNode;
}

function Sticker({ title, className, children }: StickerProps) {
  return (
    <motion.div
      variants={stickerVariants}
      className={`relative bg-surface border border-border/80 rounded-xl p-3 shadow-sm select-none transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-30 hover:border-green/45 w-full max-w-[280px] sm:max-w-[340px] md:max-w-none pointer-events-auto ${className}`}
    >
      {/* Tape Strip Accent */}
      <div 
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-text3/10 dark:bg-white/5 backdrop-blur-[1px] border border-text3/10 shadow-[0_1px_1px_rgba(0,0,0,0.03)] z-20 transform -rotate-3 select-none pointer-events-none"
        style={{ 
          clipPath: 'polygon(5% 0%, 95% 5%, 90% 95%, 10% 100%)',
        }} 
      />
      <div className="flex flex-col gap-1 mt-1">
        <span className="text-[9px] font-mono tracking-widest text-text4 uppercase font-bold">
          {title}
        </span>
        <div className="text-xs text-text2 leading-relaxed font-body">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { theme } = useUIStore();
  const currentAvatar = theme === 'dark' ? kunoichiDark : kunoichi;
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

      {/* Scattered Collage Hero */}
      <div className="flex flex-col items-center w-full md:relative md:h-[540px] md:flex-row md:justify-center md:items-center mt-12 mb-16">
        
        {/* Central Avatar card */}
        <div className="w-[240px] h-[240px] md:w-[330px] md:h-[330px] rounded-2xl overflow-hidden border border-border bg-surface shadow-md flex items-center justify-center z-10 transition-all duration-300 hover:scale-[1.01] mb-6 md:mb-0 relative">
          <img
            src={currentAvatar}
            alt="Geetika Vasistha"
            className="w-full h-full object-contain p-6"
          />
        </div>

        {/* Scattered Sticker Layer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 justify-center w-full md:absolute md:inset-0 md:pointer-events-none"
        >
          {/* Identity */}
          <Sticker title="👋 Identity" className="rotate-[-1.5deg] md:rotate-[-4deg] md:left-[2%] md:top-[5%] md:w-[200px]">
            <span className="font-semibold text-text1">Geetika Vasistha</span>
            <span className="block text-[10px] text-text3 font-mono mt-0.5">@geekykunoichi</span>
          </Sticker>

          {/* Location */}
          <Sticker title="📍 Location" className="rotate-[1deg] md:rotate-[4deg] md:right-[6%] md:bottom-[10%] md:w-[185px]">
            <span className="font-medium text-text1">Delhi NCR, India</span>
            <span className="block text-[10px] text-text4 mt-0.5">available worldwide</span>
          </Sticker>

          {/* Focus */}
          <Sticker title="✨ Focus" className="rotate-[2deg] md:rotate-[2deg] md:right-[-2%] md:top-[32%] md:w-[210px]">
            <span className="italic text-text2">"engineering intelligence, one model at a time"</span>
          </Sticker>

          {/* ML & DS Skills */}
          <Sticker title="🤖 ML & DS" className="rotate-[-2deg] md:rotate-[3deg] md:left-[-2%] md:top-[32%] md:w-[210px]">
            <span className="text-text2">Python, scikit-learn, XGBoost, LangChain, HuggingFace</span>
          </Sticker>

          {/* Frontend Skills */}
          <Sticker title="⚙️ Frontend" className="rotate-[1.5deg] md:rotate-[-5deg] md:right-[2%] md:top-[5%] md:w-[200px]">
            <span className="text-text2">React, TypeScript, Tailwind CSS, HTMX</span>
          </Sticker>

          {/* Now Playing */}
          <Sticker 
            title={track?.isPlaying ? '⚡ Now Playing' : '🎵 Last Played'} 
            className="rotate-[-1deg] md:rotate-[-3deg] md:left-[4%] md:bottom-[10%] md:w-[220px]"
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

          {/* Philosophy */}
          <Sticker title="💡 Philosophy" className="rotate-[0.5deg] md:rotate-[1deg] md:left-[32%] md:top-[-30px] md:w-[240px]">
            <span className="font-semibold text-text1 block">Precision over speed</span>
            <span className="text-[11px] text-text3 mt-0.5 block leading-normal">
              Stable systems are premium. Build things that work under pressure.
            </span>
          </Sticker>

          {/* Climate Tech */}
          <Sticker title="🌍 Climate Tech" className="rotate-[-2deg] md:rotate-[-2deg] md:left-[34%] md:bottom-[-30px] md:w-[240px]">
            <span className="text-text2">
              Urban heat island detection & physics-informed cooling intervention.
            </span>
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
