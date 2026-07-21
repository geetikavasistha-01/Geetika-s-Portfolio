import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../lib/utils';
import kunoichi from '../../assets/kunoichi.png';
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
  LucideIcon
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

export default function Navbar() {
  const { theme, toggleTheme, recruiterMode } = useUIStore();
  const [time, setTime] = useState(new Date());
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
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
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[880px] px-6 md:px-0">
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
          {/* Live Clock (Left) */}
          <div className="text-[11px] font-mono font-medium text-text2 select-none">
            {formatTime(time)}
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isHovered = hoveredTab === item.name;

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

                  {isActive && (
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
                          src={kunoichi}
                          alt="Kunoichi Mascot"
                          className="w-11 h-11 object-contain drop-shadow-md"
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
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-text2 hover:text-text1 hover:bg-surface2 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

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
