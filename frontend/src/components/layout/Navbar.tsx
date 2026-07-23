import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../lib/utils';
import { api } from '../../lib/api';
import { ThemeToggle } from '../ui/ThemeToggle';
import kunoichi from '../../assets/kunoichi.png';
import kunoichiDark from '../../assets/kunoichi-dark.png';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Briefcase,
  User,
  Folder,
  BookOpen,
  Layers,
  MessageSquare,
  Mail,
  Calendar,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface NowPlayingTrack {
  title: string;
  artist: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
}

export default function Navbar() {
  const { theme, toggleTheme, recruiterMode, clockDialogOpen, setClockDialogOpen } = useUIStore();
  const currentMascot = theme === 'dark' ? kunoichiDark : kunoichi;
  const [time, setTime] = useState(new Date());
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [track, setTrack] = useState<NowPlayingTrack | null>(null);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live Now Playing Last.fm track
  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await api.get('/spotify/now-playing');
        setTrack(res.data);
      } catch (err) {
        console.error('Error fetching now playing track:', err);
      }
    };
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000); // 10s poll
    return () => clearInterval(interval);
  }, []);

  // Close dialog on clicking outside
  useEffect(() => {
    if (!clockDialogOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.clock-container')) {
        setClockDialogOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [clockDialogOpen]);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const getGreeting = (date: Date) => {
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) return 'good morning';
    if (hours >= 12 && hours < 17) return 'good afternoon';
    if (hours >= 17 && hours < 22) return 'good evening';
    return 'good night';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Work', path: '/work', icon: Briefcase },
    { name: 'About', path: '/about', icon: User },
    { name: 'Projects', path: '/projects', icon: Folder },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    ...(!recruiterMode ? [{ name: 'Shelf', path: '/shelf', icon: Layers }] : []),
    { name: 'AMA', path: '/ama', icon: MessageSquare },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  return (
    <>
      <header className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-[880px] px-6 md:px-0">
        <motion.div
          className="flex items-center justify-between w-full px-5 py-2.5 rounded-full border border-border/80 bg-navbar shadow-xl backdrop-blur-lg relative transition-all duration-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {/* Live Clock & Spotify Dialog Box Trigger (Left) */}
          <div className="relative clock-container">
            <div
              onClick={() => setClockDialogOpen(!clockDialogOpen)}
              className="text-[11px] font-mono font-medium text-text2 select-none cursor-pointer hover:text-text1 transition-colors flex items-center gap-1.5"
            >
              {formatTime(time)}
              {track?.isPlaying && (
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-teal animate-pulse" />
                  <span className="max-w-[70px] sm:max-w-[100px] truncate text-[9px] text-text3">
                    · {track.title}
                  </span>
                </span>
              )}
            </div>

            <AnimatePresence>
              {clockDialogOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-[-20px] top-[48px] w-[260px] bg-surface border border-border rounded-[24px] shadow-2xl p-4 z-[10000] text-left"
                >
                  {/* Header: Greeting & Time */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-text1 select-none">
                      {getGreeting(time)}
                    </h3>
                    <span className="text-[10px] font-mono text-text2">
                      {formatTime(time)}
                    </span>
                  </div>

                  {/* Subheader: Date */}
                  <div className="text-[10px] text-text3 font-medium select-none mt-0.5">
                    {formatDate(time)}
                  </div>

                  <div className="h-px bg-border/60 my-2.5" />

                  {/* Now Playing Area */}
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono tracking-widest text-text4 uppercase font-semibold">
                      {track?.isPlaying ? '⚡ Now Playing' : '🎵 Last Played'}
                    </span>
                    <a
                      href={track?.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 mt-2 bg-surface2/30 hover:bg-surface2/50 transition-colors p-2 rounded-xl border border-border/45"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-border/50 bg-surface flex-shrink-0">
                        <img
                          src={track?.albumArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80'}
                          alt={track?.title || 'White Ferrari'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-text1 truncate">
                          {track?.title || 'White Ferrari'}
                        </span>
                        <span className="text-[9px] text-text3 truncate mt-0.5">
                          {track?.artist || 'Frank Ocean'}
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="h-px bg-border/60 my-2.5" />

                  {/* Footer: Social Icons & Theme Toggler */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/geetikavasistha-01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-text3 hover:text-text1 hover:bg-surface2 transition-all flex items-center justify-center"
                        title="GitHub"
                      >
                        <FaGithub size={12} />
                      </a>
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-text3 hover:text-text1 hover:bg-surface2 transition-all flex items-center justify-center"
                        title="Twitter"
                      >
                        <FaXTwitter size={12} />
                      </a>
                      <a
                        href="https://linkedin.com/in/geetikavasisthampy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-text3 hover:text-text1 hover:bg-surface2 transition-all flex items-center justify-center"
                        title="LinkedIn"
                      >
                        <FaLinkedin size={12} />
                      </a>
                      <Link
                        to="/contact"
                        className="p-1 rounded-md text-text3 hover:text-text1 hover:bg-surface2 transition-all"
                        title="Contact"
                        onClick={() => setClockDialogOpen(false)}
                      >
                        <Mail size={12} />
                      </Link>
                      <Link
                        to="/work"
                        className="p-1 rounded-md text-text3 hover:text-text1 hover:bg-surface2 transition-all"
                        title="Calendar"
                        onClick={() => setClockDialogOpen(false)}
                      >
                        <Calendar size={12} />
                      </Link>
                    </div>

                    <ThemeToggle
                      variant="circle-blur"
                      start="top-right"
                      className="p-1 rounded-md text-text3 hover:text-text1 hover:bg-surface2 transition-all flex items-center justify-center"
                      iconClassName="w-3.5 h-3.5"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const cleanPath = location.pathname.replace(/\/$/, '') || '/';
              const isActive = cleanPath === item.path;
              const isHovered = hoveredTab === item.name;

              // Find current active item from navItems list to get target mascot tab
              const activeItem = navItems.find((nav) => {
                const p = location.pathname.replace(/\/$/, '') || '/';
                return p === nav.path;
              });
              const targetMascotTab = hoveredTab || activeItem?.name;
              const shouldRenderMascot = item.name === targetMascotTab;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative cursor-pointer text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300",
                    "text-text2 hover:text-text1",
                    isActive && "text-text1"
                  )}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.03, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Soft sage glow backgrounds */}
                      <div className="absolute inset-0 bg-text3/15 rounded-full blur-md" />
                      <div className="absolute inset-[-4px] bg-text3/10 rounded-full blur-xl" />
                      <div className="absolute inset-[-8px] bg-text3/5 rounded-full blur-2xl" />
                    </motion.div>
                  )}

                  <span className="relative z-10">{item.name}</span>

                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-surface2/60 rounded-full -z-10"
                      />
                    )}
                  </AnimatePresence>

                  {shouldRenderMascot && !clockDialogOpen && (
                    <motion.div
                      layoutId="anime-mascot"
                      className="absolute -top-[44px] left-1/2 -translate-x-1/2 pointer-events-none z-[9999]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <motion.img
                          src={currentMascot}
                          alt="Kunoichi Mascot"
                          className="w-11 h-11 object-contain drop-shadow-md translate-x-[4.5px]"
                          animate={
                            hoveredTab ? {
                              scale: [1, 1.15, 1],
                              rotate: [0, -10, 10, 0],
                              y: [0, -4, 0],
                              transition: {
                                duration: 0.5,
                                ease: "easeInOut"
                              }
                            } : {
                              y: [0, -3, 0],
                              transition: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }
                          }
                        />

                        {/* Sparkles */}
                        <AnimatePresence>
                          {hoveredTab && (
                            <>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute -top-1 -right-1 w-2 h-2 text-amber"
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                                className="absolute -top-2 left-0 w-2 h-2 text-amber"
                              >
                                ✨
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Toggles & Menu */}
          <div className="flex items-center gap-3">
            {/* Recruiter indicator */}
            {recruiterMode && (
              <span className="hidden sm:inline text-[9px] font-mono uppercase bg-amber/10 border border-amber/30 text-text1 px-2 py-0.5 rounded-full font-semibold">
                Recruiter Mode
              </span>
            )}

            {/* Dark / Light Toggle */}
            <ThemeToggle
              variant="circle-blur"
              start="top-right"
              className="p-1.5 rounded-full text-text2 hover:text-text1 hover:bg-surface2 transition-all flex items-center justify-center"
              iconClassName="w-3.5 h-3.5"
            />

            {/* Hamburger for mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-text2 hover:text-text1 hover:bg-surface2 transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl border border-border/85 bg-navbar shadow-xl flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm px-4 py-2.5 rounded-xl text-text2 transition-colors hover:text-text1 hover:bg-surface2 flex items-center justify-between",
                    isActive && "text-text1 bg-surface2 font-bold"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={16} />
                    {item.name}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-text1"></span>}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
