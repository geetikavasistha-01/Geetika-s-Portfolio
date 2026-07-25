import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';

export default function Footer() {
  const { setCliOpen } = useUIStore();
  const [copied, setCopied] = useState(false);

  const handleCliClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCliOpen(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact.geetikavasistha@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <footer className="w-full bg-bg text-text2 py-8 px-6 mt-16 border-t border-border/20 select-none font-sans text-xs">
      {/* Top link row */}
      <div className="max-w-[880px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-6 text-text3">
        <a
          href="https://geetikavasistha.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text1 transition-colors flex items-center gap-1"
        >
          Newsletter <span className="text-[10px]">&rarr;</span>
        </a>
        <Link
          to="/contact"
          className="hover:text-text1 transition-colors flex items-center gap-1"
        >
          Get in touch <span className="text-[10px]">&rarr;</span>
        </Link>
        <button
          onClick={handleCopyEmail}
          className="hover:text-text1 transition-colors flex items-center gap-1.5"
        >
          Email {copied ? <Check size={12} className="text-[#34908B]" /> : <Copy size={11} />}
        </button>
        <button
          onClick={handleCliClick}
          className="hover:text-text1 transition-colors flex items-center gap-1 font-mono text-[11px]"
        >
          {`>_`} CLI <span className="text-[10px]">&rarr;</span>
        </button>
      </div>

      {/* Horizontal Divider Line */}
      <div className="max-w-[880px] mx-auto border-t border-border/20 my-4" />

      {/* Bottom Row */}
      <div className="max-w-[880px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-text4 pt-2">
        <span>© 2026 Geetika Vasistha. All rights reserved.</span>
        <div className="flex gap-6 text-text3">
          <a
            href="https://github.com/geetikavasistha-01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text1 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com/GeetikaVasistha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text1 transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/geetikavasisthampy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text1 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
