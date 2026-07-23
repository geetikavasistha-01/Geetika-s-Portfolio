import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { Project, SideExperiment } from '../types';
import { Search, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const filterCategories = ['ALL', 'DISTRIBUTED SYSTEMS', 'STORAGE ENGINES', 'DATABASE', 'BACKEND', 'FULL STACK', 'ML / AI', 'RESEARCH'];

const defaultFeatured: Project[] = [
  {
    slug: 'plume',
    title: 'Plume',
    subtitle: 'Satellite timeseries air quality prediction & hotspot detection.',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['ML / AI', 'DATA ENGINEERING', 'RESEARCH'],
    description: 'Built a CNN-LSTM model on satellite time series data (Sentinel-5P, INSAT-3D, ERA5) to predict air quality and detect pollution hotspots across India. Sped up the Google Earth Engine ingestion pipeline 5x and containerized with a scheduled pre-caching service for production.',
    statsHighlight: 'MAE 6.44 · 5x ingestion speedup with scheduled GEE pre-caching',
    stats: [
      { label: 'Prediction accuracy', value: '0.975 Pearson r' },
      { label: 'Loss Metrics', value: '6.44 MAE' },
      { label: 'Ingestion Speedup', value: '5x throughput' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/Plume',
    liveUrl: '',
    featured: true,
    order: 1,
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=450&q=80'
  },
  {
    slug: 'teachers-mate',
    title: "Teachers' Mate",
    subtitle: 'Role-based assignment organization & automated grading analytics.',
    year: 2024,
    language: 'TypeScript',
    status: 'live',
    tags: ['FULL STACK', 'DATABASE'],
    description: 'Built a full-stack platform with a React frontend and Node.js/Express REST API backend, including role-based access control and usage analytics. Streamlines assignment distribution and automated evaluation metrics for educators.',
    statsHighlight: 'Role-based workflows with 70% improvement in task completion rate',
    stats: [
      { label: 'Evaluation Overhead', value: '-50% manual extraction time' },
      { label: 'Active Workflows', value: '70% on-time task completion' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/teachers-mate',
    liveUrl: '',
    featured: true,
    order: 2,
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=450&q=80'
  },
  {
    slug: 'isotherm',
    title: 'Isotherm',
    subtitle: 'Urban heat island detection & physics-informed cooling intervention.',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['ML / AI', 'RESEARCH', 'FULL STACK'],
    description: 'Built a physics-informed PyTorch CNN-LSTM pipeline constrained by Surface Energy Balance loss to predict Land Surface Temperature within 2.0°C RMSE. Shipped a cooling-intervention recommender via a PERN-stack web app with a FastAPI model-serving layer.',
    statsHighlight: 'Physics-informed CNN-LSTM constrained by Surface Energy Balance loss',
    stats: [
      { label: 'Temperature prediction', value: '2.0°C RMSE' },
      { label: 'Model serving latency', value: '<85ms inference' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/isotherm',
    liveUrl: '',
    featured: true,
    order: 3,
    featuredImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&h=450&q=80'
  }
];

const defaultMoreWork: Project[] = [
  {
    slug: 'tokenlens',
    title: 'TokenLens',
    year: 2025,
    language: 'Python',
    status: 'wip',
    tags: ['ML / AI', 'DATA ENGINEERING'],
    description: 'A token intelligence SaaS platform for LLM usage tracking and forecasting.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/tokenlens',
    liveUrl: 'https://tokenlens.dev',
    featured: false,
    order: 4
  },
  {
    slug: 'isro-sentinel-pipeline',
    title: 'ISRO Sentinel AQI Pipeline',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['ML / AI', 'DATA ENGINEERING', 'RESEARCH'],
    description: 'CNN-LSTM satellite pipeline digesting Sentinel-5P/TROPOMI datasets for real-time HCHO/NO2 mapping.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: 'https://isro.gov.in',
    featured: false,
    order: 5
  },
  {
    slug: 'ethicaltwin-governance',
    title: 'EthicalTwin Research',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['ML / AI', 'RESEARCH'],
    description: 'XGBoost dual-agent AI governance framework to audit model decision parameters against compliance templates.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 6
  },
  {
    slug: 'distributed-rate-limiter',
    title: 'DistributedRateLimiter',
    year: 2025,
    language: 'Go',
    status: 'live',
    tags: ['DATA ENGINEERING'],
    description: 'Four algorithms, Prometheus monitoring, Nginx reverse proxy load balancer integration.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 7
  },
  {
    slug: 'geekykunoichi-blog',
    title: 'GeekyKunoichi Blog',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['FULL STACK'],
    description: 'FastAPI driven markdown portfolio blog engine with SSR and SQLite cache layers.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 8
  }
];

const defaultExperiments: SideExperiment[] = [
  {
    repoName: 'raphson-quadruped',
    description: 'Locomotion gait controllers implementing forward kinematics and trot sequence loops.',
    githubUrl: 'https://github.com/geetikavasistha-01',
    order: 1
  },
  {
    repoName: 'tokenlens-sdk',
    description: 'Python client wrapper supporting request hooks, JWT tokens, and background async buffers.',
    githubUrl: 'https://github.com/geetikavasistha-01',
    order: 2
  },
  {
    repoName: 'lstm-forecaster',
    description: 'Standalone LSTM sequences model helper optimized for spatial air quality datasets.',
    githubUrl: 'https://github.com/geetikavasistha-01',
    order: 3
  }
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [experimentIdx, setExperimentIdx] = useState(0);

  const { data: featured } = useQuery<Project[]>({
    queryKey: ['projects-featured-page'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects/featured');
        return res.data;
      } catch {
        return defaultFeatured;
      }
    },
    initialData: defaultFeatured
  });

  const { data: moreWork } = useQuery<Project[]>({
    queryKey: ['projects-more-page'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects/more');
        return res.data;
      } catch {
        return defaultMoreWork;
      }
    },
    initialData: defaultMoreWork
  });

  const { data: experiments } = useQuery<SideExperiment[]>({
    queryKey: ['projects-experiments-page'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects/experiments');
        return res.data;
      } catch {
        return defaultExperiments;
      }
    },
    initialData: defaultExperiments
  });

  const filterProjects = <T extends Project>(list: T[]): T[] => {
    return list.filter((p) => {
      // Category match
      const catMatch =
        selectedFilter === 'ALL' ||
        p.tags.some((t) => t.toUpperCase() === selectedFilter);

      // Search match
      const text = `${p.title} ${p.description} ${p.language} ${p.tags.join(' ')}`.toLowerCase();
      const searchMatch = text.includes(searchQuery.toLowerCase());

      return catMatch && searchMatch;
    });
  };

  const filteredFeatured = filterProjects(featured);
  const filteredMoreWork = filterProjects(moreWork);

  const getPaddedNumber = (idx: number) => {
    const num = idx + 1;
    return `Nº${num < 10 ? '0' + num : num}`;
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>PROJECTS</span>
          <span>{featured.length + moreWork.length} entries</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          Things I've built.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          ML pipelines, SaaS platforms, robotics firmware, and the engineering details in between.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 mt-4 w-full">
        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-200 border ${
                  isActive
                    ? 'bg-text1 text-bg border-text1'
                    : 'border-border text-text3 hover:border-text3 hover:text-text1'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surface w-full mt-2">
          <Search size={14} className="text-text3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search projects, languages, tags..."
            className="bg-transparent border-none outline-none w-full text-xs text-text2 placeholder-text4"
          />
        </div>
      </div>

      {/* Featured Section */}
      <SectionHeader label="featured" />
      <div className="flex flex-col gap-20 mt-8 w-full">
        {filteredFeatured.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={project.slug || idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center border-b border-border/40 pb-16 w-full"
            >
              {/* Text Column (on left for even, on right for odd) */}
              <div className={`md:col-span-7 flex flex-col ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                {/* Metadata row */}
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-text3 uppercase mb-3">
                  <span className="font-serif italic text-base text-text3/50 mr-1">{getPaddedNumber(idx)}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                  <span>·</span>
                  <span>{project.language}</span>
                  {project.status === 'wip' && (
                    <>
                      <span>·</span>
                      <span className="text-amber flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                        WIP
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-display font-normal text-text1 group hover:text-text3 mb-3 flex items-center gap-2">
                  <Link to={`/projects/${project.slug}`} className="hover:underline flex items-center gap-1.5 font-sans font-semibold">
                    {project.title} <ArrowUpRight size={18} className="text-text4 group-hover:text-text1 transition-colors" />
                  </Link>
                </h3>

                {/* Tagline / Subtitle */}
                {project.subtitle && (
                  <p className="text-base font-serif italic text-text2 mb-4 leading-relaxed">
                    {project.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-text3 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Highlight Stats Block */}
                {project.statsHighlight && (
                  <div className="bg-amber-500/5 dark:bg-amber-400/5 border-l-2 border-amber-500 text-amber-800 dark:text-amber-300 p-3 rounded-r-lg font-mono text-[10px] leading-relaxed mb-4">
                    {project.statsHighlight}
                  </div>
                )}

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-surface2 text-text3 rounded-md px-2 py-0.5 text-[9px] tracking-wider font-mono">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* GitHub link line */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-text3 hover:text-text1 transition-colors mt-1"
                  >
                    <span className="text-text4">
                      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v5.256a2.251 2.251 0 1 0 1.5 0V5.372Zm8 5.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0-2.122a2.25 2.25 0 1 0-1.5 0V5.372a2.251 2.251 0 1 0 1.5 0v3.256ZM11 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </span>
                    <span>{project.githubUrl.replace('https://github.com/', '')} ↗</span>
                  </a>
                )}
              </div>

              {/* Image Column (on right for even, on left for odd) */}
              <div className={`md:col-span-5 w-full ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                {project.featuredImage && (
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-surface shadow-md hover:shadow-lg transition-all duration-300">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover filter saturate-[0.85] hover:saturate-100 transition-all duration-300"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* More Work flat list */}
      <SectionHeader label="more work" />
      <div className="flex flex-col mt-4 w-full">
        {filteredMoreWork.map((project, idx) => (
          <Link
            key={project.slug || idx}
            to={`/projects/${project.slug}`}
            className="group flex justify-between items-start py-5 border-b border-border hover:bg-surface/30 px-3 -mx-3 rounded-lg transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-text1 group-hover:text-text3 transition-colors">
                {project.title}
              </span>
              <span className="text-xs italic text-text3 mt-1 truncate max-w-[280px] sm:max-w-[450px]">
                {project.description}
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-text3 text-right uppercase">
              {project.year && `${project.year} · `}{project.language}
            </div>
          </Link>
        ))}
      </div>

      {/* Side Experiments Carousel */}
      <SectionHeader
        label="side experiments"
        rightElement={
          <div className="flex gap-2">
            <button
              onClick={() => setExperimentIdx((prev) => (prev - 1 + experiments.length) % experiments.length)}
              className="p-1 rounded border border-border bg-surface hover:bg-surface2 transition-all"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={() => setExperimentIdx((prev) => (prev + 1) % experiments.length)}
              className="p-1 rounded border border-border bg-surface hover:bg-surface2 transition-all"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        }
        subtext="Smaller implementations, snippets, and scripts not worthy of full case studies."
      />
      <div className="flex gap-4 overflow-x-auto w-full mt-4 pb-4 select-none">
        {experiments.map((exp, idx) => {
          const isActive = idx === experimentIdx;
          return (
            <a
              key={exp._id || idx}
              href={exp.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-[260px] flex-shrink-0 bg-surface border rounded-xl p-5 hover:border-text2 transition-all duration-300 ${
                isActive ? 'border-purple-500/30' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
                  <FaGithub size={14} />
                  <span>{exp.repoName}</span>
                </div>
                <ArrowUpRight size={12} className="text-text4" />
              </div>
              <p className="text-xs text-text3 mt-3 leading-relaxed">
                {exp.description}
              </p>
            </a>
          );
        })}
      </div>
    </PageWrapper>
  );
}
