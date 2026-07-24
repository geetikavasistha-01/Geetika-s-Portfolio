import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';

interface PostItem {
  title: string;
  slug: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const posts: PostItem[] = [
  {
    title: 'Optimizing Rust Futures & Memory Layouts',
    slug: 'optimizing-rust-futures',
    date: 'July 24, 2026',
    readingTime: '8 min',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=150&h=150&q=80',
    tags: ['Rust', 'Concurrency'],
    featured: true
  },
  {
    title: 'Building Observability Pipelines in Distributed Telemetry',
    slug: 'distributed-telemetry-observability',
    date: 'June 18, 2026',
    readingTime: '12 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&h=150&q=80',
    tags: ['Observability', 'Systems']
  }
];

export default function BlogList() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Post List */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.title}
            className={`flex items-center gap-4 bg-[#111318] border p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group ${
              post.featured 
                ? 'border-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.1)]' 
                : 'border-border/30'
            }`}
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0 border border-border/10">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Content info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-editorial text-sm sm:text-base font-normal text-text1 group-hover:text-[#38bdf8] transition-colors leading-snug line-clamp-1">
                {post.title}
              </h3>
              
              <div className="flex items-center gap-2 text-[10px] text-text3 font-body mt-1">
                <span>{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {post.readingTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2 select-none">
                {post.tags.map(t => (
                  <span
                    key={t}
                    className="bg-zinc-800/60 text-text3 text-[8px] tracking-wider uppercase px-2 py-0.5 rounded font-body"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right arrow */}
            <ArrowUpRight size={18} className="text-text4 group-hover:text-[#38bdf8] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 ml-2" />
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link
          to="/blog"
          className="inline-flex items-center justify-center px-5 py-2 border border-[#38bdf8]/60 hover:border-[#38bdf8] text-[#38bdf8] hover:text-[#38bdf8]/85 text-xs font-body font-semibold rounded-full bg-transparent transition-colors shadow-sm"
        >
          Read all posts &rarr;
        </Link>
      </div>

      {/* Pagination indicators (Decorative) */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
      </div>
    </div>
  );
}
