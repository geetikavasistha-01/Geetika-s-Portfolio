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
  
  // Modal Details
  authors?: string;
  metadata?: string;
  tags?: string[];
  explanation?: string;
  amazonUrl?: string;
  goodreadsUrl?: string;
  arxivUrl?: string;
  paperUrl?: string;
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
      {
        title: 'Designing Machine Learning Systems',
        author: 'HUYEN',
        color: 'bg-teal-800 text-teal-100 border-teal-700',
        height: 'h-[190px]',
        authors: 'Chip Huyen',
        metadata: 'O\'Reilly Media · 2022',
        tags: ['Data Science', 'Machine Learning', 'Systems Design'],
        explanation: 'An excellent overview of the end-to-end engineering of ML production pipelines, from training data generation to monitoring.',
        amazonUrl: 'https://www.amazon.com/s?k=Designing+Machine+Learning+Systems+Chip+Huyen',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Designing+Machine+Learning+Systems+Chip+Huyen'
      },
      {
        title: 'Hands-On Machine Learning',
        author: 'GERON',
        color: 'bg-emerald-900 text-emerald-100 border-emerald-800',
        height: 'h-[195px]',
        authors: 'Aurélien Géron',
        metadata: 'O\'Reilly Media · 2019',
        tags: ['Machine Learning', 'TensorFlow', 'Scikit-Learn'],
        explanation: 'A hands-on guide to building intelligent systems using Python\'s core ML libraries and deep learning architectures.',
        amazonUrl: 'https://www.amazon.com/s?k=Hands-On+Machine+Learning+Aurelien+Geron',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Hands-On+Machine+Learning+Aurelien+Geron'
      },
      {
        title: 'Generative Agents: Interactive Simulacra',
        publisher: 'STANFORD',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Joon Sung Park, Joseph C. O\'Hanlon, Carrie J. Cai, et al.',
        metadata: 'Stanford & Google · 2023',
        tags: ['Agentic AI', 'Generative Agents', 'Human Behavior'],
        explanation: 'A landmark paper demonstrating how LLM agents can interact dynamically and maintain believable social behaviors in sandbox environments.',
        arxivUrl: 'https://arxiv.org/abs/2304.03442'
      },
      {
        title: 'ReAct: Synergizing Reasoning & Acting',
        publisher: 'GOOGLE',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Shunyu Yao, Jeffrey Zhao, Dian Yu, et al.',
        metadata: 'Google Research · 2023',
        tags: ['Agentic AI', 'Reasoning', 'LLM Agents'],
        explanation: 'Introduces the ReAct framework, demonstrating how combining reasoning loops with tool-use action execution boosts model capabilities.',
        arxivUrl: 'https://arxiv.org/abs/2210.03629'
      },
      {
        title: 'Constitutional AI: A Feedback Approach',
        publisher: 'ANTHROPIC',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Yuntao Bai, Saurav Kadavath, Sandipan Kundu, et al.',
        metadata: 'Anthropic · 2022',
        tags: ['LLM Alignment', 'AI Safety', 'Anthropic'],
        explanation: 'Introduces Constitutional AI, training language models to align with written guidelines without human feedback overhead.',
        arxivUrl: 'https://arxiv.org/abs/2212.08073'
      }
    ]
  },
  {
    name: 'Claude & LLM Research Papers',
    books: [
      {
        title: 'Scaling Laws for Neural Language Models',
        publisher: 'ANTHROPIC',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Jared Kaplan, Sam McCandlish, Tom Henighan, et al.',
        metadata: 'Anthropic · 2020',
        tags: ['LLM Research', 'Scaling Laws', 'Anthropic'],
        explanation: 'Identifies clean power-law scaling relationships between parameter count, compute budgets, and dataset sizes.',
        arxivUrl: 'https://arxiv.org/abs/2001.08361'
      },
      {
        title: 'Model-Written Evaluations of AI Abilities',
        publisher: 'ANTHROPIC',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Ethan Perez, Sam Ringer, Kamilė Lukošiūtė, et al.',
        metadata: 'Anthropic · 2022',
        tags: ['AI Evaluation', 'Safety', 'Anthropic'],
        explanation: 'Details how automated agents can generate diagnostic test suites to evaluate alignment and capabilities.',
        arxivUrl: 'https://arxiv.org/abs/2212.09251'
      },
      {
        title: 'Many-Shot In-Context Learning',
        publisher: 'ANTHROPIC',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Rishabh Agarwal, Avi Singh, Lei M. Zhang, et al.',
        metadata: 'Anthropic · 2024',
        tags: ['In-Context Learning', 'Anthropic', 'LLM Research'],
        explanation: 'Explores how LLMs perform when presented with hundreds of contextual examples at runtime.',
        arxivUrl: 'https://arxiv.org/abs/2404.11018'
      },
      {
        title: 'Claude 3 Model Card & Architecture',
        publisher: 'ANTHROPIC',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Anthropic Research Team',
        metadata: 'Anthropic · 2024',
        tags: ['Claude 3', 'Model Card', 'Anthropic'],
        explanation: 'Details the capabilities, safety features, and training benchmarks of the Claude 3 model family.',
        paperUrl: 'https://www-files.anthropic.com/production/images/Model-Card-Claude-3.pdf'
      }
    ]
  },
  {
    name: 'Systems & Infrastructure',
    books: [
      {
        title: 'DDIA',
        author: 'KLEPPMANN',
        color: 'bg-[#1e40af] text-blue-100 border-blue-800',
        height: 'h-[195px]',
        authors: 'Martin Kleppmann',
        metadata: 'O\'Reilly Media · 2017',
        tags: ['Distributed Systems', 'Databases', 'System Design'],
        explanation: 'The gold standard textbook for understanding the trade-offs of modern data-intensive systems.',
        amazonUrl: 'https://www.amazon.com/s?k=Designing+Data-Intensive+Applications+Martin+Kleppmann',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Designing+Data-Intensive+Applications+Martin+Kleppmann'
      },
      {
        title: 'Database Internals',
        author: 'PETROV',
        color: 'bg-[#0f172a] text-slate-200 border-slate-900',
        height: 'h-[185px]',
        authors: 'Alex Petrov',
        metadata: 'O\'Reilly Media · 2019',
        tags: ['Storage Engines', 'B-Trees', 'Distributed Systems'],
        explanation: 'An in-depth look at storage engines, data layouts, and consensus protocols in modern databases.',
        amazonUrl: 'https://www.amazon.com/s?k=Database+Internals+Alex+Petrov',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Database+Internals+Alex+Petrov'
      },
      {
        title: 'WebRTC for the Curious',
        author: 'ZHUKOV',
        color: 'bg-[#475569] text-zinc-200 border-zinc-700',
        height: 'h-[180px]',
        authors: 'Sean DuBois, WebRTC Contributors',
        metadata: 'Open Source · 2021',
        tags: ['Networking', 'WebRTC', 'Media Streams'],
        explanation: 'A thorough, open-source guide explaining the mechanics of WebRTC connections.',
        amazonUrl: 'https://www.amazon.com/s?k=WebRTC+for+the+Curious',
        goodreadsUrl: 'https://www.goodreads.com/search?q=WebRTC+for+the+Curious'
      },
      {
        title: 'The Google File System',
        publisher: 'GOOGLE',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Sanjay Ghemawat, Howard Gobioff, Shun-Tak Leung',
        metadata: 'Google Research · 2003',
        tags: ['Distributed Systems', 'Storage', 'Google Infra'],
        explanation: 'Describes the design of GFS, a highly-fault-tolerant distributed file system built on commodity hardware.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf'
      },
      {
        title: 'MapReduce: Simplified Data Proc...',
        publisher: 'GOOGLE',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Jeffrey Dean, Sanjay Ghemawat',
        metadata: 'Google Research · 2004',
        tags: ['Data Processing', 'Google Infra', 'Distributed Systems'],
        explanation: 'Introduces the MapReduce model for distributed processing of massive datasets.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf'
      },
      {
        title: 'Volcano - An Extensible and Par...',
        publisher: 'IEEE',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Goetz Graefe',
        metadata: 'IEEE · 1994',
        tags: ['Query Engine', 'Database Internals', 'Execution Model'],
        explanation: 'Introduces the Volcano iterator model, the fundamental execution paradigm for modern query engines.',
        paperUrl: 'https://paperzz.com/doc/7112959/volcano-an-extensible-and-parallel-query-evaluation'
      },
      {
        title: 'Dynamo: Amazon\'s Highly Availab...',
        publisher: 'AMAZON/COOP',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Giuseppe DeCandia, Madan Jampani, et al.',
        metadata: 'Amazon · 2007',
        tags: ['Distributed Systems', 'Key-Value', 'NoSQL'],
        explanation: 'Pioneered the masterless Dynamo ring architecture, using consistent hashing for eventual consistency.',
        paperUrl: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf'
      },
      {
        title: 'Bigtable: A Distributed Storage...',
        publisher: 'GOOGLE',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Fay Chang, Jeffrey Dean, Sanjay Ghemawat, et al.',
        metadata: 'Google Research · 2006',
        tags: ['Distributed Systems', 'Storage', 'Database'],
        explanation: 'Best Paper award winner. Foundation for understanding large-scale storage systems.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf'
      },
      {
        title: 'Spanner: Google\'s Globally-Dist...',
        publisher: 'GOOGLE',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'James C. Corbett, Jeffrey Dean, et al.',
        metadata: 'Google Research · 2012',
        tags: ['Distributed Systems', 'NewSQL', 'Consensus'],
        explanation: 'Google\'s global transaction database using TrueTime (GPS & Atomic Clocks) for external consistency.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi12.pdf'
      },
      {
        title: 'The Tail at Scale',
        publisher: 'COMMUNICATIONS',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Jeffrey Dean, Luiz André Barroso',
        metadata: 'Google Research · 2013',
        tags: ['Latency', 'Systems Design', 'High Throughput'],
        explanation: 'Discusses techniques to mitigate tail latency in massive, interactive distributed systems.',
        paperUrl: 'https://cacm.acm.org/research/the-tail-at-scale/'
      },
      {
        title: 'Paxos Made Simple',
        publisher: 'ACM',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Leslie Lamport',
        metadata: 'ACM · 2001',
        tags: ['Consensus', 'Distributed Systems', 'Theory'],
        explanation: 'Lamport\'s clean formulation explaining the Paxos consensus protocol in straightforward terms.',
        paperUrl: 'https://lamport.azurewebsites.net/pubs/paxos-simple.pdf'
      },
      {
        title: 'The Chubby Lock Service for Lo...',
        publisher: 'GOOGLE',
        color: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Mike Burrows',
        metadata: 'Google Research · 2006',
        tags: ['Consensus', 'Lock Service', 'Paxos'],
        explanation: 'Describes Chubby, Google\'s Paxos-backed lock service used for master election and configuration storage.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/chubby-osdi06.pdf'
      }
    ]
  },
  {
    name: 'Languages & CS',
    books: [
      {
        title: 'The Rust Programming Language',
        author: 'NICHOLS',
        color: 'bg-[#9a3412] text-orange-100 border-orange-950',
        height: 'h-[195px]',
        authors: 'Steve Klabnik, Carol Nichols',
        metadata: 'No Starch Press · 2018',
        tags: ['Rust', 'Systems Programming', 'Memory Safety'],
        explanation: 'The official comprehensive guide to learning the Rust programming language.',
        amazonUrl: 'https://www.amazon.com/s?k=The+Rust+Programming+Language+Steve+Klabnik',
        goodreadsUrl: 'https://www.goodreads.com/search?q=The+Rust+Programming+Language+Steve+Klabnik'
      },
      {
        title: 'The Go Programming Language',
        author: 'KERNIGHAN',
        color: 'bg-[#1e3a8a] text-sky-100 border-blue-950',
        height: 'h-[190px]',
        authors: 'Alan A. A. Donovan, Brian W. Kernighan',
        metadata: 'Addison-Wesley · 2015',
        tags: ['Go', 'Concurrency', 'Systems Programming'],
        explanation: 'An authoritative and elegantly written guide to writing concurrent, efficient Go code.',
        amazonUrl: 'https://www.amazon.com/s?k=The+Go+Programming+Language+Alan+Donovan',
        goodreadsUrl: 'https://www.goodreads.com/search?q=The+Go+Programming+Language+Alan+Donovan'
      },
      {
        title: 'Types and Programming Languages',
        author: 'PIERCE',
        color: 'bg-[#7f1d1d] text-rose-100 border-rose-950',
        height: 'h-[185px]',
        authors: 'Benjamin C. Pierce',
        metadata: 'MIT Press · 2002',
        tags: ['PL Theory', 'Type Systems', 'Compilers'],
        explanation: 'The definitive guide to type systems and foundational programming language concepts.',
        amazonUrl: 'https://www.amazon.com/s?k=Types+and+Programming+Languages+Benjamin+Pierce',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Types+and+Programming+Languages+Benjamin+Pierce'
      },
      {
        title: 'Rust for Rustaceans',
        author: 'GJENGSET',
        color: 'bg-[#7c2d12] text-amber-100 border-amber-950',
        height: 'h-[188px]',
        authors: 'Jon Gjengset',
        metadata: 'No Starch Press · 2021',
        tags: ['Rust', 'Systems Programming', 'Advanced Rust'],
        explanation: 'A deep-dive book for intermediate Rust programmers to master concurrency, lifetimes, and unsafe code.',
        amazonUrl: 'https://www.amazon.com/s?k=Rust+for+Rustaceans+Jon+Gjengset',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Rust+for+Rustaceans+Jon+Gjengset'
      },
      {
        title: 'Compilers: Principles, Techniques',
        author: 'ULLMAN',
        color: 'bg-[#1e40af] text-blue-100 border-blue-900',
        height: 'h-[192px]',
        authors: 'Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman',
        metadata: 'Pearson · 2006',
        tags: ['Compilers', 'Parser', 'Lexer'],
        explanation: 'The legendary \'Dragon Book\' covering compilation, lexical analysis, parsers, and code generation.',
        amazonUrl: 'https://www.amazon.com/s?k=Compilers+Principles+Techniques+and+Tools+Aho',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Compilers+Principles+Techniques+and+Tools+Aho'
      },
      {
        title: 'Understanding and Using C Pointers',
        author: 'REESE',
        color: 'bg-[#14532d] text-emerald-100 border-emerald-950',
        height: 'h-[180px]',
        authors: 'Richard M. Reese',
        metadata: 'O\'Reilly Media · 2013',
        tags: ['C Programming', 'Pointers', 'Memory Management'],
        explanation: 'A highly targeted guide to mastering pointers and memory layouts in C.',
        amazonUrl: 'https://www.amazon.com/s?k=Understanding+and+Using+C+Pointers+Reese',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Understanding+and+Using+C+Pointers+Reese'
      },
      {
        title: 'Writing A Compiler from Scratch',
        author: 'SANDLER',
        color: 'bg-[#881337] text-pink-100 border-rose-950',
        height: 'h-[187px]',
        authors: 'Thorsten Ball',
        metadata: 'Self-published · 2018',
        tags: ['Compilers', 'Go', 'Virtual Machine'],
        explanation: 'A hands-on walkthrough building a custom compiler and bytecode virtual machine in pure Go.',
        amazonUrl: 'https://www.amazon.com/s?k=Writing+A+Compiler+In+Go+Thorsten+Ball',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Writing+A+Compiler+In+Go+Thorsten+Ball'
      },
      {
        title: 'Rust Atomics and Locks',
        author: 'BOS',
        color: 'bg-[#064e3b] text-teal-100 border-teal-950',
        height: 'h-[189px]',
        authors: 'Mara Bos',
        metadata: 'O\'Reilly Media · 2023',
        tags: ['Rust', 'Concurrency', 'Atomics', 'Operating Systems'],
        explanation: 'An excellent book explaining the memory model, atomics, and locks in modern systems programming.',
        amazonUrl: 'https://www.amazon.com/s?k=Rust+Atomics+and+Locks+Mara+Bos',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Rust+Atomics+and+Locks+Mara+Bos'
      },
      {
        title: 'Operating Systems: Three Easy Pieces',
        author: 'ARPACI-DUSSEAU',
        color: 'bg-[#581c87] text-purple-100 border-purple-950',
        height: 'h-[195px]',
        authors: 'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau',
        metadata: 'Arpaci-Dusseau Books · 2018',
        tags: ['Operating Systems', 'Virtualization', 'Concurrency', 'Persistence'],
        explanation: 'An outstanding textbook introducing virtualization, concurrency, and persistence in operating systems.',
        amazonUrl: 'https://www.amazon.com/s?k=Operating+Systems+Three+Easy+Pieces+Arpaci-Dusseau',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Operating+Systems+Three+Easy+Pieces+Arpaci-Dusseau'
      }
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
  const [selectedItem, setSelectedItem] = useState<Book | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
                          onClick={() => setSelectedItem(book)}
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
                          onClick={() => setSelectedItem(book)}
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

      {/* Modal Dialog Backdrop */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          {/* Modal Container */}
          <div 
            className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 w-full max-w-[420px] flex flex-col relative select-none animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ESC close hint */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors font-mono text-[10px]"
            >
              esc
            </button>

            {/* Type Header */}
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              {selectedItem.isPaper ? 'PAPER' : 'BOOK'}
            </span>

            {/* Title */}
            <h2 className="font-serif text-xl sm:text-2xl text-zinc-100 font-normal leading-snug mt-3">
              {selectedItem.title}
            </h2>

            {/* Authors */}
            {selectedItem.authors && (
              <span className="text-zinc-400 text-xs sm:text-sm mt-2 block">
                {selectedItem.authors}
              </span>
            )}

            {/* Publisher Metadata */}
            {selectedItem.metadata && (
              <span className="text-zinc-500 font-mono text-[10px] sm:text-[11px] mt-1.5 block">
                {selectedItem.metadata}
              </span>
            )}

            {/* Divider */}
            <div className="border-b border-zinc-800/80 my-4 w-full" />

            {/* Tags badges */}
            {selectedItem.tags && selectedItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-[9px] sm:text-[10px] tracking-wide font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Explanation / Caption description */}
            {selectedItem.explanation && (
              <p className="text-zinc-300 font-serif italic text-[11px] sm:text-xs leading-relaxed mt-1 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/40">
                "{selectedItem.explanation}"
              </p>
            )}

            {/* Footer Links */}
            <div className="border-b border-zinc-800/80 my-4 w-full" />
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              {selectedItem.isPaper ? (
                <>
                  {(selectedItem.arxivUrl || selectedItem.paperUrl) && (
                    <a
                      href={selectedItem.arxivUrl || selectedItem.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors underline decoration-sky-950 hover:decoration-sky-400"
                    >
                      <span>Read Paper</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </>
              ) : (
                <>
                  {selectedItem.amazonUrl && (
                    <a
                      href={selectedItem.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-amber-500 hover:text-amber-400 transition-colors underline decoration-amber-950 hover:decoration-amber-500"
                    >
                      <span>Order on Amazon</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {selectedItem.goodreadsUrl && (
                    <a
                      href={selectedItem.goodreadsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 transition-colors underline decoration-emerald-950 hover:decoration-emerald-500"
                    >
                      <span>Read on Goodreads</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
