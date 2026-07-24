import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';

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
    name: 'Data Science & AI',
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
        color: 'bg-surface border-border text-text2',
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
        color: 'bg-surface border-border text-text2',
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
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Yuntao Bai, Saurav Kadavath, Sandipan Kundu, et al.',
        metadata: 'Anthropic · 2022',
        tags: ['LLM Alignment', 'AI Safety', 'Anthropic'],
        explanation: 'Introduces Constitutional AI, training language models to align with written guidelines without human feedback overhead.',
        arxivUrl: 'https://arxiv.org/abs/2212.08073'
      },
      {
        title: 'Scaling Laws for Neural Language Models',
        publisher: 'ANTHROPIC',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Jared Kaplan, Sam McCandlish, Tom Henighan, et al.',
        metadata: 'Anthropic · 2020',
        tags: ['LLM Research', 'Scaling Laws', 'Anthropic'],
        explanation: 'Identifies clean power-law scaling relationships between parameter count, compute budgets, and dataset sizes.',
        arxivUrl: 'https://arxiv.org/abs/2001.08361'
      },
      {
        title: 'Claude 3 Model Card & Architecture',
        publisher: 'ANTHROPIC',
        color: 'bg-surface border-border text-text2',
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
    name: 'Systems, Security & DevOps',
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
      },
      {
        title: 'Site Reliability Engineering',
        author: 'BETS/MUGUEL',
        color: 'bg-[#065f46] text-emerald-100 border-emerald-900',
        height: 'h-[192px]',
        authors: 'Niall Richard Murphy, Betsy Beyer, Chris Jones, Jennifer Petoff',
        metadata: 'O\'Reilly Media · 2016',
        tags: ['DevOps', 'SRE', 'Reliability'],
        explanation: 'Google\'s definitive guide to building, scaling, and monitoring resilient production systems.',
        amazonUrl: 'https://www.amazon.com/s?k=Site+Reliability+Engineering+Betsy+Beyer',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Site+Reliability+Engineering+Betsy+Beyer'
      },
      {
        title: 'Security Engineering',
        author: 'ANDERSON',
        color: 'bg-[#854d0e] text-amber-100 border-amber-900',
        height: 'h-[194px]',
        authors: 'Ross Anderson',
        metadata: 'Wiley · 2020',
        tags: ['Security', 'Cryptography', 'Systems Design'],
        explanation: 'The classic text on building systems that remain secure despite active malice and hardware/software failure.',
        amazonUrl: 'https://www.amazon.com/s?k=Security+Engineering+Ross+Anderson',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Security+Engineering+Ross+Anderson'
      },
      {
        title: 'The Web Application Hacker\'s Handbook',
        author: 'PINTO/STUTTARD',
        color: 'bg-[#991b1b] text-rose-100 border-rose-900',
        height: 'h-[190px]',
        authors: 'Dafydd Stuttard, Marcus Pinto',
        metadata: 'Wiley · 2011',
        tags: ['Security', 'Web Security', 'AppSec'],
        explanation: 'The definitive guide to finding and exploiting security flaws within web applications.',
        amazonUrl: 'https://www.amazon.com/s?k=The+Web+Application+Hacker%27s+Handbook+Stuttard',
        goodreadsUrl: 'https://www.goodreads.com/search?q=The+Web+Application+Hacker%27s+Handbook+Stuttard'
      },
      {
        title: 'Practical Cloud Native Security',
        author: 'CLAUSSEN',
        color: 'bg-[#1e3a8a] text-sky-100 border-blue-900',
        height: 'h-[188px]',
        authors: 'Courtney Claussen',
        metadata: 'O\'Reilly Media · 2023',
        tags: ['DevOps', 'Cloud Security', 'Kubernetes'],
        explanation: 'A hands-on engineering guide to securing microservices, container networks, and Kubernetes clusters.',
        amazonUrl: 'https://www.amazon.com/s?k=Practical+Cloud+Native+Security+Courtney+Claussen',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Practical+Cloud+Native+Security+Courtney+Claussen'
      },
      {
        title: 'The Google File System',
        publisher: 'GOOGLE',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Sanjay Ghemawat, Howard Gobioff, Shun-Tak Leung',
        metadata: 'Google Research · 2003',
        tags: ['Distributed Systems', 'Storage', 'Google Infra'],
        explanation: 'Describes the design of GFS, a highly-fault-tolerant distributed file system built on commodity hardware.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf'
      },
      {
        title: 'Dynamo: Amazon\'s Highly Availab...',
        publisher: 'AMAZON/COOP',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Giuseppe DeCandia, Madan Jampani, et al.',
        metadata: 'Amazon · 2007',
        tags: ['Distributed Systems', 'Key-Value', 'NoSQL'],
        explanation: 'Pioneered the masterless Dynamo ring architecture, using consistent hashing for eventual consistency.',
        paperUrl: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf'
      },
      {
        title: 'Spanner: Google\'s Globally-Dist...',
        publisher: 'GOOGLE',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'James C. Corbett, Jeffrey Dean, et al.',
        metadata: 'Google Research · 2012',
        tags: ['Distributed Systems', 'NewSQL', 'Consensus'],
        explanation: 'Google\'s global transaction database using TrueTime (GPS & Atomic Clocks) for external consistency.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi12.pdf'
      }
    ]
  },
  {
    name: 'Philosophy & Literature',
    books: [
      {
        title: 'Freedom From the Known',
        author: 'KRISHNAMURTI',
        color: 'bg-[#4a2c0a] text-orange-100 border-[#6b3f10]',
        height: 'h-[188px]',
        authors: 'Jiddu Krishnamurti',
        metadata: 'HarperOne · 1969',
        tags: ['Philosophy', 'Freedom', 'Self-inquiry'],
        explanation: 'Krishnamurti\'s radical invitation to free the mind from accumulated knowledge, fear, and psychological time — and to see life freshly in each moment.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/143877.Freedom_from_the_Known',
        amazonUrl: 'https://www.amazon.com/s?k=Freedom+from+the+Known+Krishnamurti'
      },
      {
        title: 'The Fountainhead',
        author: 'AYN RAND',
        color: 'bg-[#1a1a2e] text-slate-100 border-[#2d2d44]',
        height: 'h-[200px]',
        authors: 'Ayn Rand',
        metadata: 'Bobbs-Merrill · 1943',
        tags: ['Philosophy', 'Objectivism', 'Novel', 'Individualism'],
        explanation: 'Ayn Rand\'s seminal novel — a fierce defense of individualism through architect Howard Roark\'s uncompromising pursuit of creative integrity against a conformist world.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/2122.The_Fountainhead',
        amazonUrl: 'https://www.amazon.com/s?k=The+Fountainhead+Ayn+Rand'
      },
      {
        title: 'Atlas Shrugged',
        author: 'AYN RAND',
        color: 'bg-[#0d1b2a] text-sky-100 border-[#1a3346]',
        height: 'h-[205px]',
        authors: 'Ayn Rand',
        metadata: 'Random House · 1957',
        tags: ['Philosophy', 'Objectivism', 'Novel', 'Capitalism'],
        explanation: 'Rand\'s magnum opus — a philosophical novel exploring what happens when the world\'s greatest thinkers and creators go on strike, and the Objectivist philosophy behind their choice.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/9365.Atlas_Shrugged',
        amazonUrl: 'https://www.amazon.com/s?k=Atlas+Shrugged+Ayn+Rand'
      },
      {
        title: 'Karma: Why Everything You Know Is Wrong',
        author: 'A. PRASHANT',
        color: 'bg-[#14532d] text-green-100 border-[#166534]',
        height: 'h-[192px]',
        authors: 'Acharya Prashant',
        metadata: 'HarperCollins · 2021',
        tags: ['Vedanta', 'Philosophy', 'Spirituality', 'Self-inquiry'],
        explanation: 'Acharya Prashant dismantles popular misconceptions around karma using Vedanta and Upanishadic thought — calling for radical self-honesty rather than ritualistic action.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/57829766-karma',
        amazonUrl: 'https://www.amazon.com/s?k=Karma+Acharya+Prashant'
      },
      {
        title: 'Hamlet',
        author: 'SHAKESPEARE',
        color: 'bg-[#2d1b4e] text-violet-100 border-[#3d2460]',
        height: 'h-[195px]',
        authors: 'William Shakespeare',
        metadata: 'Globe Theatre · c. 1600–1601',
        tags: ['Drama', 'Classic Literature', 'Tragedy', 'Philosophy'],
        explanation: 'The most performed play in history — a meditation on mortality, revenge, moral paralysis, and the impossibility of certainty in a corrupt world.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/1420.Hamlet',
        amazonUrl: 'https://www.amazon.com/s?k=Hamlet+Shakespeare'
      },
      {
        title: 'The Tempest',
        author: 'SHAKESPEARE',
        color: 'bg-[#1e3a5f] text-blue-100 border-[#2a4f7a]',
        height: 'h-[188px]',
        authors: 'William Shakespeare',
        metadata: 'Globe Theatre · c. 1611',
        tags: ['Drama', 'Classic Literature', 'Magic', 'Colonialism'],
        explanation: 'Shakespeare\'s final romance — Prospero\'s island as a stage for power, forgiveness, and the act of letting go of control and vengeance.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/57538.The_Tempest',
        amazonUrl: 'https://www.amazon.com/s?k=The+Tempest+Shakespeare'
      },
      {
        title: 'Lyrical Ballads',
        author: 'WORDSWORTH',
        color: 'bg-[#713f12] text-yellow-100 border-[#92400e]',
        height: 'h-[190px]',
        authors: 'William Wordsworth & Samuel Taylor Coleridge',
        metadata: 'J. & A. Arch · 1798',
        tags: ['Poetry', 'Romanticism', 'Nature', 'Classic Literature'],
        explanation: 'The founding text of English Romanticism — Wordsworth and Coleridge\'s landmark collaboration exploring ordinary life, nature, and the supernatural with a new democratic poetic language.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/60041.Lyrical_Ballads',
        amazonUrl: 'https://www.amazon.com/s?k=Lyrical+Ballads+Wordsworth+Coleridge'
      },
      {
        title: 'The Prelude',
        author: 'WORDSWORTH',
        color: 'bg-[#7c4d00] text-amber-100 border-[#9a6100]',
        height: 'h-[185px]',
        authors: 'William Wordsworth',
        metadata: 'Edward Moxon · 1850',
        tags: ['Poetry', 'Autobiography', 'Romanticism', 'Nature'],
        explanation: 'Wordsworth\'s epic autobiographical poem — the growth of a poet\'s mind through encounters with nature, memory, and imagination across a lifetime.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/169203.The_Prelude',
        amazonUrl: 'https://www.amazon.com/s?k=The+Prelude+Wordsworth'
      },
      {
        title: 'Bhagavad Gita',
        author: 'VED VYASA',
        color: 'bg-[#7f1d1d] text-orange-50 border-[#991b1b]',
        height: 'h-[200px]',
        authors: 'Ved Vyasa (trans. Swami Prabhupada / various)',
        metadata: 'c. 400 BCE – 200 CE',
        tags: ['Vedanta', 'Philosophy', 'Spirituality', 'Hinduism'],
        explanation: 'The eternal dialogue between Arjuna and Krishna on the battlefield of Kurukshetra — a profound treatise on duty, the self, action without attachment, and the nature of ultimate reality.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/99944.Bhagavad_Gita_As_It_Is',
        amazonUrl: 'https://www.amazon.com/s?k=Bhagavad+Gita'
      },
      {
        title: 'Truth Love Beauty',
        author: 'A. PRASHANT',
        color: 'bg-[#0f4c3a] text-emerald-100 border-[#155232]',
        height: 'h-[192px]',
        authors: 'Acharya Prashant',
        metadata: 'HarperCollins · 2023',
        tags: ['Vedanta', 'Philosophy', 'Self-inquiry', 'Consciousness'],
        explanation: 'Acharya Prashant explores the three eternal values — Sat, Chit, Ananda — and how Truth, Love, and Beauty are not three separate things but one unified understanding of the liberated mind.',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Truth+Love+Beauty+Acharya+Prashant',
        amazonUrl: 'https://www.amazon.com/s?k=Truth+Love+Beauty+Acharya+Prashant'
      },
      {
        title: 'Bijak: The Witness',
        author: 'KABIR DAS',
        color: 'bg-[#312e81] text-indigo-100 border-[#3730a3]',
        height: 'h-[190px]',
        authors: 'Kabir Das (trans. Linda Hess & Shukdev Singh)',
        metadata: 'c. 15th century CE',
        tags: ['Poetry', 'Mysticism', 'Bhakti', 'Spirituality'],
        explanation: 'Kabir\'s verses — sharp, irreverent, deeply compassionate — cut through religious dogma and social hierarchy to point directly at the formless truth within every human being.',
        goodreadsUrl: 'https://www.goodreads.com/book/show/1315093.The_Bijak_of_Kabir',
        amazonUrl: 'https://www.amazon.com/s?k=Bijak+Kabir+Das'
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

const getNewHeight = (oldHeight: string) => {
  switch (oldHeight) {
    case 'h-[175px]': return 'h-[210px] sm:h-[250px]';
    case 'h-[180px]': return 'h-[215px] sm:h-[255px]';
    case 'h-[185px]': return 'h-[220px] sm:h-[260px]';
    case 'h-[187px]': return 'h-[222px] sm:h-[262px]';
    case 'h-[188px]': return 'h-[224px] sm:h-[264px]';
    case 'h-[189px]': return 'h-[226px] sm:h-[266px]';
    case 'h-[190px]': return 'h-[228px] sm:h-[268px]';
    case 'h-[192px]': return 'h-[230px] sm:h-[270px]';
    case 'h-[194px]': return 'h-[232px] sm:h-[272px]';
    case 'h-[195px]': return 'h-[235px] sm:h-[275px]';
    default: return 'h-[220px] sm:h-[260px]';
  }
};

const BookSpine = ({ 
  book, 
  idx, 
  onSelect 
}: { 
  book: Book; 
  idx: number; 
  onSelect: (book: Book) => void; 
}) => {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0.5);
  const rotateY = useTransform(x, [0, 1], book.isPaper ? [-8, 8] : [-10, 10]);

  // Seeded idle lean between -1.5deg and 1.5deg based on index
  const idleRotate = ((idx % 3) - 1) * 1.5;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    x.set(relativeX);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
  };

  // Entrance spring animation
  const spineVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      rotate: idleRotate + (idx % 2 === 0 ? 8 : -8)
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: idleRotate,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: idx * 0.04
      }
    }
  };

  // Pull effect state
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onSelect(book);
      setIsClicked(false);
    }, 180);
  };

  if (book.isPaper) {
    return (
      <motion.div
        variants={shouldReduceMotion ? undefined : spineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        whileHover={shouldReduceMotion ? undefined : {
          y: -12,
          scale: isClicked ? 1.08 : 1.02,
          z: 10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
        }}
        animate={shouldReduceMotion ? undefined : {
          scale: isClicked ? 1.08 : 1,
          y: isClicked ? -18 : 0,
          rotate: isClicked ? idleRotate * 0.5 : idleRotate
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 18
        }}
        onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
        onMouseLeave={shouldReduceMotion ? undefined : handleMouseLeave}
        onClick={handleClick}
        style={shouldReduceMotion ? undefined : {
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
        className={`relative flex flex-col justify-between w-[64px] sm:w-[92px] ${getNewHeight(book.height)} bg-surface border border-border rounded-t-md shadow-[2px_2px_4px_0px_rgba(0,0,0,0.15)] dark:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.4)] cursor-pointer py-4 px-2.5 flex-shrink-0 origin-bottom select-none`}
      >
        {/* Paper tab */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-sky-500/10 dark:bg-sky-500/20 border border-sky-400/30 text-sky-600 dark:text-sky-400 rounded px-1.5 py-0.5 text-[6.5px] sm:text-[7.5px] tracking-widest uppercase font-mono font-bold z-10 font-sans">
          PAPER
        </div>

        {/* Paper Title (wrap horizontally) */}
        <div className="text-[8.5px] sm:text-[11px] font-sans font-medium text-text2 leading-normal text-center break-words line-clamp-5 mt-2">
          {book.title}
        </div>

        {/* Publisher */}
        <div className="text-[7.5px] sm:text-[9px] font-mono font-bold text-text4 tracking-wider text-center mt-auto">
          {book.publisher}
        </div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        variants={shouldReduceMotion ? undefined : spineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        whileHover={shouldReduceMotion ? undefined : {
          y: -16,
          scale: isClicked ? 1.08 : 1.02,
          z: 15,
          boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.4), 0 15px 15px -5px rgba(0, 0, 0, 0.25)"
        }}
        animate={shouldReduceMotion ? undefined : {
          scale: isClicked ? 1.08 : 1,
          y: isClicked ? -22 : 0,
          rotate: isClicked ? idleRotate * 0.5 : idleRotate
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 18
        }}
        onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
        onMouseLeave={shouldReduceMotion ? undefined : handleMouseLeave}
        onClick={handleClick}
        style={shouldReduceMotion ? undefined : {
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
        className={`relative flex flex-col justify-between w-[48px] sm:w-[68px] ${getNewHeight(book.height)} ${book.color} rounded-t-sm shadow-[2px_2px_5px_0px_rgba(0,0,0,0.4)] cursor-pointer border-t border-l border-r py-5 px-2 flex-shrink-0 overflow-hidden origin-bottom select-none`}
      >
        {/* 3D cylindrical spine shading overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-white/5 to-black/25 pointer-events-none" />

        {/* Vertically oriented title */}
        <div 
          style={{ writingMode: 'vertical-rl' }}
          className="text-[10px] sm:text-[12px] font-sans font-semibold tracking-wider text-center uppercase mx-auto select-none max-h-[145px] sm:max-h-[185px] overflow-hidden truncate"
        >
          {book.title}
        </div>

        {/* Author at bottom */}
        {book.author && (
          <div className="text-[8px] sm:text-[10px] font-sans font-bold tracking-widest text-center mt-auto z-10 opacity-90 uppercase">
            {book.author}
          </div>
        )}
      </motion.div>
    );
  }
};

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
    <PageWrapper maxClassName="max-w-[1150px]">
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
        <h1 className="text-4xl sm:text-5xl font-typewriter font-normal text-text1 mt-6 uppercase tracking-widest">
          the reading rack.
        </h1>
        <p className="text-sm italic font-typewriter text-text3 mt-4 max-w-[540px] leading-relaxed">
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
                <h3 className="font-typewriter text-base text-text1 font-normal uppercase tracking-widest">
                  {category.name}
                </h3>
                <span className="text-[10px] font-mono text-text3">
                  {category.books.length}
                </span>
              </div>

              {/* Wooden Shelf Container */}
              <div className="relative w-full flex flex-col items-start bg-zinc-950/20 dark:bg-black/20 rounded-xl p-4 pb-0 pt-8 border border-border/30">
                {/* Book rows container with horizontal scroll */}
                <div className="flex items-end gap-2.5 overflow-x-auto w-full min-h-[260px] sm:min-h-[300px] pb-1 px-4 z-20 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                  {category.books.map((book, bookIdx) => (
                    <BookSpine
                      key={bookIdx}
                      book={book}
                      idx={bookIdx}
                      onSelect={setSelectedItem}
                    />
                  ))}
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
                <h4 className="text-lg font-serifClassic text-text1 group-hover:text-text3 transition-colors mb-2">
                  {blog.title}
                </h4>

                {/* Summary */}
                <p className="text-xs italic font-serifClassic text-text2 leading-relaxed mb-4">
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
            className="bg-surface border border-border rounded-2xl p-6 w-full max-w-[420px] flex flex-col relative select-none animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ESC close hint */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-text4 hover:text-text2 transition-colors font-mono text-[10px]"
            >
              esc
            </button>

            {/* Type Header */}
            <span className="text-[10px] font-mono tracking-widest text-text3 uppercase">
              {selectedItem.isPaper ? 'PAPER' : 'BOOK'}
            </span>

            {/* Title */}
            <h2 className="font-body text-xl sm:text-2xl text-text1 font-semibold leading-snug mt-3">
              {selectedItem.title}
            </h2>

            {/* Authors */}
            {selectedItem.authors && (
              <span className="text-text2 text-xs sm:text-sm mt-2 block font-medium">
                {selectedItem.authors}
              </span>
            )}

            {/* Publisher Metadata */}
            {selectedItem.metadata && (
              <span className="text-text3 font-mono text-[10px] sm:text-[11px] mt-1.5 block">
                {selectedItem.metadata}
              </span>
            )}

            {/* Divider */}
            <div className="border-b border-border/60 my-4 w-full" />

            {/* Tags badges */}
            {selectedItem.tags && selectedItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface2 border border-border text-text3 px-2 py-0.5 rounded text-[9px] sm:text-[10px] tracking-wide font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Explanation / Caption description */}
            {selectedItem.explanation && (
              <p className="text-text2 bg-bg p-3.5 rounded-xl border border-border font-serifClassic italic text-[11px] sm:text-xs leading-relaxed mt-1">
                "{selectedItem.explanation}"
              </p>
            )}

            {/* Footer Links */}
            <div className="border-b border-border/60 my-4 w-full" />
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              {selectedItem.isPaper ? (
                <>
                  {(selectedItem.arxivUrl || selectedItem.paperUrl) && (
                    <a
                      href={selectedItem.arxivUrl || selectedItem.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-colors underline decoration-sky-900/40 dark:decoration-sky-950 hover:decoration-sky-600 dark:hover:decoration-sky-400"
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
                      className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors underline decoration-amber-900/40 dark:decoration-amber-950 hover:decoration-amber-600 dark:hover:decoration-amber-500"
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
                      className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors underline decoration-emerald-900/40 dark:decoration-emerald-950 hover:decoration-emerald-600 dark:hover:decoration-emerald-500"
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
