import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ProjectItem {
  name: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: ProjectItem[] = [
  {
    name: 'kunoichi database',
    slug: 'kunoichi-database',
    description: 'An optimized distributed lookup cache and metadata pipeline supporting fast non-coding variant indexes.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=350&q=80',
    tags: ['Rust', 'Tokio', 'gRPC']
  },
  {
    name: 'renge engine',
    slug: 'renge-engine',
    description: 'A telemetry parser and stream processor for processing live weather patterns and satellite files.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=350&q=80',
    tags: ['Python', 'FastAPI', 'Pandas']
  }
];

export default function ProjectsGrid() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.name}
            className="group bg-[#111318] border border-border/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
          >
            {/* Aspect image container */}
            <div className="aspect-[16/9] w-full bg-zinc-800 overflow-hidden relative border-b border-border/10">
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            
            {/* Info panel */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-editorial text-lg italic font-normal text-text1 lowercase leading-tight mb-2">
                  {proj.name}
                </h3>
                <p className="text-xs text-text3 font-body leading-relaxed line-clamp-2 select-text">
                  {proj.description}
                </p>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between mt-4 select-none">
                <Link
                  to={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-body font-bold text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors"
                >
                  View Project <ArrowUpRight size={13} />
                </Link>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(t => (
                    <span
                      key={t}
                      className="bg-zinc-800/60 text-text3 text-[8px] tracking-wider uppercase px-2 py-0.5 rounded font-body"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link
          to="/projects"
          className="inline-flex items-center justify-center px-5 py-2 border border-[#38bdf8]/60 hover:border-[#38bdf8] text-[#38bdf8] hover:text-[#38bdf8]/85 text-xs font-body font-semibold rounded-full bg-transparent transition-colors shadow-sm"
        >
          Explore all projects &rarr;
        </Link>
      </div>
    </div>
  );
}
