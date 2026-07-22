import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface LinkPreviewProps {
  children: React.ReactNode;
  url: string;
  imageSrc?: string;
  className?: string;
  previewName?: string;
}

export function LinkPreview({
  children,
  url,
  imageSrc,
  className,
  previewName = "Link Preview"
}: LinkPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, 150); // Small delay to prevent accidental triggers on swipe-by
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 200); // Small delay to prevent flicker when mouse leaves briefly
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "font-semibold border-b-2 border-teal/40 hover:border-teal text-text1 transition-all duration-300 pb-0.5",
          className
        )}
      >
        {children}
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-52 bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-[10005] pointer-events-none flex flex-col text-left"
          >
            {/* Aspect Ratio Box */}
            <span className="relative w-full h-28 bg-surface2 flex items-center justify-center overflow-hidden border-b border-border/50">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={previewName}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Visually neutral gradient placeholder */
                <span className="w-full h-full bg-gradient-to-tr from-teal/20 via-border/10 to-rose/10 flex items-center justify-center p-3 select-none">
                  <span className="text-[10px] font-mono font-medium tracking-wide text-text3 text-center uppercase leading-snug">
                    {previewName}
                  </span>
                </span>
              )}
            </span>

            {/* Caption Area */}
            <span className="p-2.5 flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-text1 truncate">
                {previewName}
              </span>
              <span className="text-[9px] font-mono text-text4 truncate">
                {url.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
