import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageInfo {
  name: string;
  path: string;
}

const ALL_PAGES: PageInfo[] = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Shelf', path: '/shelf' },
  { name: 'AMA', path: '/ama' },
  { name: 'Contact', path: '/contact' }
];

export default function PagePagination() {
  const { pathname } = useLocation();
  const recruiterMode = useUIStore((state) => state.recruiterMode);

  // Filter shelf out if recruiter mode is enabled
  const pages = ALL_PAGES.filter(
    (page) => !(page.path === '/shelf' && recruiterMode)
  );

  const currentIndex = pages.findIndex((page) => page.path === pathname);

  // If page is not in the tracked list (e.g. blog post pages), don't show pagination
  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-border/40 flex items-center justify-between w-full select-none">
      {/* Previous Button */}
      <div className="flex-1 flex justify-start">
        {prevPage ? (
          <Link
            to={prevPage.path}
            className="flex items-center overflow-hidden rounded-xl border border-border bg-surface hover:bg-surface2 transition-all duration-300 shadow-sm"
          >
            <span className="p-3 border-r border-border bg-surface2 flex items-center justify-center">
              <ChevronLeft size={14} className="text-text2" />
            </span>
            <span className="px-4 py-2.5 text-[11px] font-mono tracking-wider font-semibold text-text2 uppercase">
              {prevPage.name}
            </span>
          </Link>
        ) : (
          <div className="opacity-0 pointer-events-none" />
        )}
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        {nextPage ? (
          <Link
            to={nextPage.path}
            className="flex items-center overflow-hidden rounded-xl border border-border bg-surface hover:bg-surface2 transition-all duration-300 shadow-sm"
          >
            <span className="px-4 py-2.5 text-[11px] font-mono tracking-wider font-semibold text-text2 uppercase">
              {nextPage.name}
            </span>
            <span className="p-3 border-l border-border bg-surface2 flex items-center justify-center">
              <ChevronRight size={14} className="text-text2" />
            </span>
          </Link>
        ) : (
          <div className="opacity-0 pointer-events-none" />
        )}
      </div>
    </div>
  );
}
