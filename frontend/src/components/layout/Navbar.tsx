import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../lib/utils';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme, recruiterMode } = useUIStore();
  const [time, setTime] = useState(new Date());
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

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    ...(!recruiterMode ? [{ label: 'Shelf', path: '/shelf' }] : []),
    { label: 'AMA', path: '/ama' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[880px] px-6 md:px-0">
        <div className="flex items-center justify-between w-full px-5 py-2.5 rounded-full border border-border/80 bg-navbar shadow-xl backdrop-blur-lg transition-all duration-300">
          
          {/* Live Clock (Left) */}
          <div className="text-[11px] font-mono font-medium text-text2 select-none">
            {formatTime(time)}
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-xs px-3 py-1 rounded-full text-text2 transition-colors hover:text-text1 hover:bg-surface2/60",
                    isActive && "text-text1 bg-surface2 font-semibold shadow-sm"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Section: Toggles & Menu */}
          <div className="flex items-center gap-3">
            {/* Recruiter indicator */}
            {recruiterMode && (
              <span className="hidden sm:inline text-[9px] font-mono uppercase bg-amber/10 border border-amber/30 text-amber px-2 py-0.5 rounded-full">
                Recruiter Mode
              </span>
            )}

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-text3 hover:text-text1 hover:bg-surface2 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Hamburger for mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 rounded-full text-text3 hover:text-text1 hover:bg-surface2 transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl border border-border bg-surface/90 backdrop-blur-lg shadow-xl flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-sm px-4 py-2.5 rounded-xl text-text3 transition-colors hover:text-text1 hover:bg-surface2 flex items-center justify-between",
                    isActive && "text-text1 bg-surface2 font-medium"
                  )
                }
              >
                {item.label}
                {location.pathname === item.path && <span className="w-1.5 h-1.5 rounded-full bg-text1"></span>}
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
