import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { ArrowUpRight } from 'lucide-react';

interface Book {
  title: string;
  author?: string;
  publisher?: string;
  color: string; // Tailwind background & text classes
  height: string; // Tailwind height class
  isPaper?: boolean;
}

interface ShelfCategory {
  name: string;
  books: Book[];
}

interface BlogRead {
  platform: string;
  title: string;
  description: string;
  url: string;
}

const booksData: ShelfCategory[] = [
  {
    name: 'Agentic AI & Data Science',
    books: [
      { title: 'Designing Machine Learning Systems', author: 'HUYEN', color: 'bg-teal-800 text-teal-100 border-teal-700', height: 'h-[190px]' },
      { title: 'Hands-On Machine Learning', author: 'GERON', color: 'bg-emerald-900 text-emerald-100 border-emerald-800', height: 'h-[195px]' },
      { title: 'Generative Agents: Interactive Simulacra', publisher: 'STANFORD', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'ReAct: Synergizing Reasoning & Acting', publisher: 'GOOGLE', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Constitutional AI: A Feedback Approach', publisher: 'ANTHROPIC', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true }
    ]
  },
  {
    name: 'Claude & LLM Research Papers',
    books: [
      { title: 'Scaling Laws for Neural Language Models', publisher: 'ANTHROPIC', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Model-Written Evaluations of AI Abilities', publisher: 'ANTHROPIC', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Many-Shot In-Context Learning', publisher: 'ANTHROPIC', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Claude 3 Model Card & Architecture', publisher: 'ANTHROPIC', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true }
    ]
  },
  {
    name: 'Systems & Infrastructure',
    books: [
      { title: 'DDIA', author: 'KLEPPMANN', color: 'bg-[#1e40af] text-blue-100 border-blue-800', height: 'h-[195px]' },
      { title: 'Database Internals', author: 'PETROV', color: 'bg-[#0f172a] text-slate-200 border-slate-900', height: 'h-[185px]' },
      { title: 'WebRTC for the Curious', author: 'ZHUKOV', color: 'bg-[#475569] text-zinc-200 border-zinc-700', height: 'h-[180px]' },
      { title: 'The Google File System', publisher: 'GOOGLE', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'MapReduce: Simplified Data Proc...', publisher: 'GOOGLE', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Volcano - An Extensible and Par...', publisher: 'IEEE', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Dynamo: Amazon\'s Highly Availab...', publisher: 'AMAZON/COOP', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Bigtable: A Distributed Storage...', publisher: 'GOOGLE', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Spanner: Google\'s Globally-Dist...', publisher: 'GOOGLE', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'The Tail at Scale', publisher: 'COMMUNICATIONS', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'Paxos Made Simple', publisher: 'ACM', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true },
      { title: 'The Chubby Lock Service for Lo...', publisher: 'GOOGLE', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', height: 'h-[175px]', isPaper: true }
    ]
  },
  {
    name: 'Languages & CS',
    books: [
      { title: 'The Rust Programming Language', author: 'NICHOLS', color: 'bg-[#9a3412] text-orange-100 border-orange-950', height: 'h-[195px]' },
      { title: 'The Go Programming Language', author: 'KERNIGHAN', color: 'bg-[#1e3a8a] text-sky-100 border-blue-950', height: 'h-[190px]' },
      { title: 'Types and Programming Languages', author: 'PIERCE', color: 'bg-[#7f1d1d] text-rose-100 border-rose-950', height: 'h-[185px]' },
      { title: 'Rust for Rustaceans', author: 'GJENGSET', color: 'bg-[#7c2d12] text-amber-100 border-amber-950', height: 'h-[188px]' },
      { title: 'Compilers: Principles, Techniques', author: 'ULLMAN', color: 'bg-[#1e40af] text-blue-100 border-blue-900', height: 'h-[192px]' },
      { title: 'Understanding and Using C Pointers', author: 'REESE', color: 'bg-[#14532d] text-emerald-100 border-emerald-950', height: 'h-[180px]' },
      { title: 'Writing A Compiler from Scratch', author: 'SANDLER', color: 'bg-[#881337] text-pink-100 border-rose-950', height: 'h-[187px]' },
      { title: 'Rust Atomics and Locks', author: 'BOS', color: 'bg-[#064e3b] text-teal-100 border-teal-950', height: 'h-[189px]' },
      { title: 'Operating Systems: Three Easy Pieces', author: 'ARPACI-DUSSEAU', color: 'bg-[#581c87] text-purple-100 border-purple-950', height: 'h-[195px]' }
    ]
  }
];

const blogsData: BlogRead[] = [
  {
    platform: 'DROPBOX',
    title: 'Infrastructure Messaging System Model: Async Platform Evolution',
    description: 'Asynchronous task execution platform handling tens of millions of tasks per minute.',
    url: 'https://dropbox.tech/infrastructure/asynchronous-task-execution-platform-architecture'
  },
  {
    platform: 'LINKEDIN',
    title: 'Engineering LinkedIn\'s Job Ingestion System at Scale',
    description: 'Multi-source ingestion pipelines processing tens of terabytes daily with quality guarantees.',
    url: 'https://engineering.linkedin.com/blog/2024/job-ingestion-at-scale'
  },
  {
    platform: 'NETFLIX',
    title: 'Netflix\'s Real-Time Distributed Graph (Part 1)',
    description: 'Real-time distributed graph ingestion and processing at internet-scale data volumes.',
    url: 'https://netflixtechblog.com/netflixs-real-time-distributed-graph-part-1'
  },
  {
    platform: 'META',
    title: 'TAO: Facebook\'s Distributed Data Store for the Social Graph',
    description: 'A look at the social graph store scaling to billions of reads per second.',
    url: 'https://engineering.fb.com/data-infrastructure/tao/'
  },
  {
    platform: 'UBER',
    title: 'Uber\'s Real-time Push Platform at Scale',
    description: 'Connecting millions of drivers and riders concurrently via WebSocket connections.',
    url: 'https://www.uber.com/blog/real-time-push-platform/'
  }
];

export default function Shelf() {
  const [selectedTab, setSelectedTab] = useState<'books' | 'blogs'>('books');

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-8 select-none">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>SHELF</span>
          <span>
            {selectedTab === 'books' 
              ? `${booksData.reduce((acc, cat) => acc + cat.books.length, 0)} entries` 
              : `${blogsData.length} reads`}
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6 font-serif italic lowercase">
          the reading rack.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          {selectedTab === 'books' 
            ? 'books and papers, currently on the rack.' 
            : 'engineering blogs from teams building at serious scale.'}
        </p>
      </div>

      {/* Toggles */}
      <div className="flex gap-2 w-full mt-4 mb-12">
        <button
          onClick={() => setSelectedTab('books')}
          className={`rounded-full px-5 py-2 text-[10px] tracking-wider uppercase font-semibold transition-all border ${
            selectedTab === 'books'
              ? 'bg-text1 text-bg border-text1'
              : 'border-border text-text3 hover:border-text3 hover:text-text1'
          }`}
        >
          Books
        </button>
        <button
          onClick={() => setSelectedTab('blogs')}
          className={`rounded-full px-5 py-2 text-[10px] tracking-wider uppercase font-semibold transition-all border ${
            selectedTab === 'blogs'
              ? 'bg-text1 text-bg border-text1'
              : 'border-border text-text3 hover:border-text3 hover:text-text1'
          }`}
        >
          Blogs
        </button>
      </div>

      {selectedTab === 'books' ? (
        <div className="flex flex-col gap-12 w-full mt-4">
          {booksData.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col w-full select-none">
              {/* Category Header */}
              <div className="flex items-baseline gap-2 mb-6">
                <h3 className="font-serif text-lg text-text1 font-normal">
                  {category.name}
                </h3>
                <span className="text-[10px] font-mono text-text3">
                  {category.books.length}
                </span>
              </div>

              {/* Wooden Shelf Container */}
              <div className="relative w-full flex flex-col items-start bg-zinc-950/20 dark:bg-black/20 rounded-xl p-4 pb-0 pt-8 border border-border/30">
                {/* Book rows container with horizontal scroll */}
                <div className="flex items-end gap-2 overflow-x-auto w-full min-h-[220px] pb-1 px-4 z-20 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                  {category.books.map((book, bookIdx) => {
                    if (book.isPaper) {
                      return (
                        <div
                          key={bookIdx}
                          className={`relative flex flex-col justify-between w-[44px] sm:w-[58px] ${book.height} bg-zinc-200/90 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-t-md shadow-[2px_2px_4px_0px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.4)] cursor-pointer py-4 px-2 flex-shrink-0`}
                        >
                          {/* Paper tab */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-sky-500/20 border border-sky-400/40 text-sky-400 rounded px-1 py-0.5 text-[6px] tracking-widest uppercase font-mono font-bold z-10">
                            PAPER
                          </div>

                          {/* Paper Title (wrap horizontally) */}
                          <div className="text-[8px] font-sans font-medium text-zinc-700 dark:text-zinc-300 leading-normal text-center break-words line-clamp-4 mt-2">
                            {book.title}
                          </div>

                          {/* Publisher */}
                          <div className="text-[7px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-wider text-center mt-auto">
                            {book.publisher}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={bookIdx}
                          className={`relative flex flex-col justify-between w-[36px] sm:w-[48px] ${book.height} ${book.color} rounded-t-sm shadow-[2px_2px_5px_0px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[5px_5px_10px_2px_rgba(0,0,0,0.5)] cursor-pointer border-t border-l border-r py-5 px-1.5 flex-shrink-0 overflow-hidden`}
                        >
                          {/* 3D cylindrical spine shading overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-white/5 to-black/25 pointer-events-none" />

                          {/* Vertically oriented title */}
                          <div 
                            style={{ writingMode: 'vertical-rl' }}
                            className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-wider text-center uppercase mx-auto select-none max-h-[120px] overflow-hidden truncate"
                          >
                            {book.title}
                          </div>

                          {/* Author at bottom */}
                          {book.author && (
                            <div className="text-[7px] sm:text-[8px] font-sans font-bold tracking-widest text-center mt-auto z-10 opacity-80 uppercase">
                              {book.author}
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>

                {/* Wooden Board floor */}
                <div className="h-3.5 bg-gradient-to-b from-[#854d0e] to-[#713f12] border-t border-[#a16207] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)] rounded-md w-full mt-[-2px] relative z-10" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8 w-full mt-4 select-none">
          <p className="text-sm text-text3 italic leading-relaxed max-w-[620px]">
            I pick engineering blogs from companies building at serious scale and read them thoroughly — taking notes, digging into the design decisions, and if something's cool enough, implementing it myself. This is my running list.
          </p>

          <div className="flex flex-col mt-4 w-full">
            {blogsData.map((blog, idx) => (
              <div
                key={idx}
                className="group flex flex-col py-6 border-b border-border w-full"
              >
                {/* Platform Label */}
                <span className="text-[9px] font-mono tracking-widest text-text3 uppercase mb-2">
                  {blog.platform}
                </span>

                {/* Blog Title */}
                <h4 className="text-base font-semibold text-text1 group-hover:text-text3 transition-colors mb-2">
                  {blog.title}
                </h4>

                {/* Summary */}
                <p className="text-xs italic text-text2 leading-relaxed mb-4">
                  {blog.description}
                </p>

                {/* Action Link */}
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-mono text-text3 hover:text-text1 transition-colors underline decoration-border hover:decoration-text1 self-start"
                >
                  <span>Article</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
