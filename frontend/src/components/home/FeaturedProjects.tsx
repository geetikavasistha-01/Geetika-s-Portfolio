import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Project } from '../../types';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultProjects: Project[] = [
  {
    slug: 'plume',
    title: 'Plume',
    year: 2025,
    language: 'python',
    status: 'live',
    tags: ['ML / AI', 'DATA ENGINEERING', 'RESEARCH'],
    description: 'Satellite timeseries air quality prediction & hotspot detection.',
    stats: [
      { label: 'Prediction accuracy', value: '0.975 Pearson r' },
      { label: 'Loss Metrics', value: '6.44 MAE' },
      { label: 'Ingestion Speedup', value: '5x throughput' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/Plume',
    liveUrl: '',
    featured: true,
    order: 1
  },
  {
    slug: 'distributed-rate-limiter',
    title: 'Distributed Rate Limiter',
    year: 2025,
    language: 'rust',
    status: 'live',
    tags: ['SYSTEMS', 'BACKEND', 'DISTRIBUTED'],
    description: 'A high-performance distributed token bucket rate limiter built for low-latency API throttling.',
    stats: [
      { label: 'throughput', value: '>100k req/sec' },
      { label: 'p99 latency', value: '<1.2ms' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/Distributed-Rate-Limiter',
    liveUrl: '',
    featured: true,
    order: 2
  },
  {
    slug: 'teachers-mate',
    title: "Teachers' Mate",
    year: 2024,
    language: 'typescript',
    status: 'live',
    tags: ['FULL STACK', 'DATABASE'],
    description: 'Role-based assignment organization & automated grading analytics.',
    stats: [
      { label: 'Evaluation Overhead', value: '-50% manual extraction time' },
      { label: 'Active Workflows', value: '70% on-time task completion' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/Teachers-Mate-Frontend',
    liveUrl: '',
    featured: true,
    order: 3
  },
  {
    slug: 'isotherm',
    title: 'Isotherm',
    year: 2025,
    language: 'python',
    status: 'live',
    tags: ['ML / AI', 'RESEARCH', 'FULL STACK'],
    description: 'Urban heat island detection & physics-informed cooling intervention.',
    stats: [
      { label: 'Temperature prediction', value: '2.0°C RMSE' },
      { label: 'Model serving latency', value: '<85ms inference' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/Isotherm',
    liveUrl: '',
    featured: true,
    order: 4
  }
];

interface ProjectWithStars extends Project {
  stars?: number;
}

export default function FeaturedProjects() {
  const { data: projects } = useQuery<ProjectWithStars[]>({
    queryKey: ['projects-featured'],
    queryFn: async () => {
      let baseProjects = defaultProjects;
      try {
        const res = await api.get('/projects?featured=true');
        const fetched = res.data || [];
        if (fetched.length > 0) {
          // Sync orders
          baseProjects = fetched;
        }
      } catch {
        // Fallback to default
      }

      // Enrich with GitHub API stats
      const enriched = await Promise.all(
        baseProjects.map(async (proj) => {
          if (!proj.githubUrl) return proj;
          try {
            const match = proj.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (match) {
              const owner = match[1];
              const repo = match[2];
              const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
              if (ghRes.ok) {
                const data = await ghRes.json();
                return {
                  ...proj,
                  description: data.description || proj.description,
                  language: data.language || proj.language,
                  stars: data.stargazers_count
                };
              }
            }
          } catch (e) {
            console.error("Error fetching GitHub data for project: " + proj.title, e);
          }
          return proj;
        })
      );
      return enriched;
    },
    initialData: defaultProjects
  });

  // Ensure projects are sorted by order
  const sortedProjects = [...projects].sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <div className="w-full mt-6 select-none flex flex-col gap-14">
      {sortedProjects.map((project, idx) => {
        const statsString = project.stats && project.stats.length > 0
          ? project.stats.map(stat => {
              const lbl = stat.label ? stat.label.trim() : '';
              const val = stat.value ? stat.value.trim() : '';
              if (!lbl || ['highlight', 'stat', 'stats', 'detail', 'details'].includes(lbl.toLowerCase())) {
                return val;
              }
              return `${lbl.toLowerCase()}: ${val}`;
            }).join(' · ')
          : '';

        return (
          <Link
            key={project.slug || idx}
            to={`/projects/${project.slug}`}
            className="group block relative w-full transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
              {/* Text Info */}
              <div className="flex-1 min-w-0">
                {/* Top Metadata */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-text3/70 mb-1.5 select-none lowercase">
                  <span>{project.year}</span>
                  <span>·</span>
                  <span>{project.language?.toLowerCase()}</span>
                  {project.stars !== undefined && (
                    <>
                      <span>·</span>
                      <span className="text-[#34908B] font-semibold">⭐ {project.stars}</span>
                    </>
                  )}
                  {project.status === 'wip' && (
                    <>
                      <span>·</span>
                      <span className="text-[#eab308] flex items-center gap-1 font-bold uppercase tracking-widest text-[9.5px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#eab308] animate-pulse" />
                        WIP
                      </span>
                    </>
                  )}
                </div>

                {/* Title & Diagonal Arrow */}
                <div className="flex justify-between items-baseline w-full mb-1">
                  <h3 className="font-serif text-3xl sm:text-[38px] font-normal text-text1 leading-tight group-hover:text-[#34908B] transition-colors tracking-wide">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    size={20}
                    className="text-text4 group-hover:text-text1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-4 md:hidden"
                  />
                </div>

                {/* Description */}
                <p className="font-sans text-text3 text-[14px] sm:text-[15px] leading-relaxed max-w-[640px] mb-4 font-light">
                  {project.description}
                </p>

                {/* Stats Block */}
                {statsString && (
                  <div className="border-l border-border/80 pl-4 font-mono text-[11px] sm:text-xs text-text3/70 py-1 leading-relaxed max-w-[700px]">
                    {statsString}
                  </div>
                )}
              </div>

              {/* Aspect Ratio Placeholder Image Card */}
              <div className="w-full md:w-56 h-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 relative border border-border/30 shadow-sm bg-gradient-to-tr from-teal/20 via-border/10 to-rose/10 flex items-center justify-center group-hover:shadow-md transition-all duration-300">
                <span className="text-[10px] font-mono font-medium tracking-widest text-text3 uppercase select-none p-4 text-center leading-snug">
                  {project.title}
                </span>
                {/* Overlay Diagonal Arrow on Desktop */}
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ArrowUpRight size={24} className="text-text1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
