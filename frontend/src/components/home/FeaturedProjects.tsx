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
    githubUrl: 'https://github.com/geetikavasistha-01/teachers-mate',
    liveUrl: '',
    featured: true,
    order: 2
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
    githubUrl: 'https://github.com/geetikavasistha-01/isotherm',
    liveUrl: '',
    featured: true,
    order: 3
  }
];

export default function FeaturedProjects() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['projects-featured'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects?featured=true');
        const fetched = res.data || [];
        return fetched.length > 0 ? fetched : defaultProjects;
      } catch {
        return defaultProjects;
      }
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
            {/* Top Metadata */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-text3/70 mb-1.5 select-none lowercase">
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.language?.toLowerCase()}</span>
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
              <h3 className="font-serif text-3xl sm:text-[38px] font-normal text-text1 leading-tight group-hover:text-text3 transition-colors tracking-wide">
                {project.title}
              </h3>
              <ArrowUpRight
                size={20}
                className="text-text4 group-hover:text-text1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-4"
              />
            </div>

            {/* Description */}
            <p className="font-serif italic text-text3 text-[15px] sm:text-[17px] leading-relaxed max-w-[640px] mb-4 font-light">
              {project.description}
            </p>

            {/* Stats Block */}
            {statsString && (
              <div className="border-l border-border/80 pl-4 font-mono text-[11px] sm:text-xs text-text3/70 py-1 leading-relaxed max-w-[700px]">
                {statsString}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
