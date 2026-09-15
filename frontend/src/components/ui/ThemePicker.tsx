import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Laptop } from 'lucide-react';
import { useUIStore, THEMES, ThemeName } from '../../store/uiStore';

const themeKeys: ThemeName[] = ['linen', 'mist', 'midnight', 'harbor'];

interface ThemePickerProps {
  className?: string;
}

export function ThemePicker({ className }: ThemePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentTheme, followSystem, setTheme, setFollowSystem } = useUIStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const activeThemeMeta = THEMES[currentTheme] || THEMES.linen;

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Select color theme"
        title={`Theme: ${followSystem ? 'Follow System' : activeThemeMeta.name}`}
        className={`p-1.5 rounded-full border border-border/70 bg-surface/80 hover:bg-surface2 text-text hover:text-accent transition-all flex items-center justify-center relative shadow-sm ${className || ''}`}
      >
        <Palette size={15} />
        {/* Subtle accent color pip */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-surface"
          style={{ backgroundColor: activeThemeMeta.accent }}
        />
      </button>

      {/* Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-[270px] sm:w-[290px] p-3.5 rounded-2xl border border-border bg-surface shadow-2xl backdrop-blur-xl z-[9999] select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-1 mb-3">
              <span className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase font-semibold">
                Color Theme
              </span>
              <span className="text-[9px] font-mono tracking-wider uppercase text-accent font-semibold px-2 py-0.5 rounded-full bg-surface2 border border-border/50">
                {followSystem ? 'Auto (OS)' : activeThemeMeta.name}
              </span>
            </div>

            {/* 2-Column Theme Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {themeKeys.map((key) => {
                const theme = THEMES[key];
                const isSelected = currentTheme === key && !followSystem;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setTheme(key);
                    }}
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: isSelected ? theme.accent : theme.border,
                    }}
                    className={`group relative flex flex-col p-2.5 rounded-xl border transition-all duration-200 text-left hover:scale-[1.02] active:scale-[0.98] ${
                      isSelected
                        ? 'ring-2 ring-offset-2 shadow-sm'
                        : 'hover:border-text-muted/60 opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Top row: Accent dot */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-[8.5px] font-mono tracking-widest uppercase opacity-60" style={{ color: theme.textMuted }}>
                        {theme.type}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                        style={{ backgroundColor: theme.accent }}
                        title={`${theme.name} accent`}
                      />
                    </div>

                    {/* Preview: Two stacked text lines */}
                    <div
                      className="p-2 rounded-lg border w-full flex flex-col gap-1.5 mb-2"
                      style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      }}
                    >
                      <div
                        className="h-1.5 w-3/4 rounded-full transition-colors"
                        style={{ backgroundColor: theme.text }}
                      />
                      <div
                        className="h-1.5 w-1/2 rounded-full transition-colors"
                        style={{ backgroundColor: theme.textMuted }}
                      />
                    </div>

                    {/* Theme name in uppercase letter-spaced small text */}
                    <div className="flex items-center justify-between w-full mt-0.5">
                      <span
                        className="text-[10px] font-mono tracking-[0.18em] uppercase font-bold"
                        style={{ color: theme.text }}
                      >
                        {theme.name}
                      </span>
                      {isSelected && (
                        <Check
                          size={12}
                          className="stroke-[3]"
                          style={{ color: theme.accent }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-border/60 my-3" />

            {/* Follow System Toggle Button */}
            <button
              type="button"
              onClick={() => setFollowSystem(!followSystem)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
                followSystem
                  ? 'bg-surface2/80 border-accent/60 text-text font-semibold shadow-sm'
                  : 'bg-surface2/30 hover:bg-surface2 border-border/60 text-text-muted hover:text-text'
              }`}
            >
              <div className="flex items-center gap-2">
                <Laptop size={13} className={followSystem ? 'text-accent' : 'text-text-muted'} />
                <span>Follow System</span>
              </div>
              {followSystem ? (
                <Check size={14} className="text-accent stroke-[2.5]" />
              ) : (
                <span className="text-[9px] uppercase tracking-wider text-text-muted opacity-70">
                  Off
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemePicker;
