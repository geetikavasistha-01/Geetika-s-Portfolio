import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { BlogPost } from '../types';
import { Search, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultPosts: BlogPost[] = [
  {
    slug: 'understanding-attention-mechanisms',
    title: 'Attention Is All You Need (To Understand)',
    excerpt: 'A deep, mathematical deep-dive into self-attention matrices and sequence-to-sequence weights without the corporate hype.',
    tags: ['ML', 'TRANSFORMERS'],
    category: 'RESEARCH',
    published: true,
    featured: true,
    readTime: 8,
    createdAt: '2026-06-20T00:00:00.000Z'
  },
  {
    slug: 'spatial-netcdf4-sentinel-pipeline',
    title: 'Spatial NetCDF4 pipelines for Sentinel-5P Satellite Data',
    excerpt: 'How we parse, spatial-bin, and model spatial mixing ratios of nitrogen precursors from ESA Copernicus instruments.',
    tags: ['DATA ENGINEERING', 'SPATIAL'],
    category: 'TUTORIAL',
    published: true,
    featured: false,
    readTime: 12,
    createdAt: '2026-06-05T00:00:00.000Z'
  },
  {
    slug: 'low-latency-gait-controllers-quadrupeds',
    title: 'Building low-latency gait controllers for Quadruped Locomotion',
    excerpt: 'Mathematical walk through Bezier curves trot trajectories running on-edge inside embedded micro-threads.',
    tags: ['ROBOTICS', 'C++'],
    category: 'ROBOTICS',
    published: true,
    featured: false,
    readTime: 15,
    createdAt: '2026-05-18T00:00:00.000Z'
  }
];

const categories = ['ALL', 'RESEARCH', 'TUTORIAL', 'ROBOTICS'];

export default function Blog() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      try {
        const res = await api.get('/blog');
        return res.data;
      } catch {
        return defaultPosts;
      }
    },
    initialData: defaultPosts
  });

  const filteredPosts = posts.filter((post) => {
    const catMatch = selectedFilter === 'ALL' || post.category.toUpperCase() === selectedFilter;
    const text = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
    const searchMatch = text.includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Sort filtered posts by creation date to accurately pull the latest featured post
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
  );

  const featuredPost = sortedPosts[0];
  const archivePosts = sortedPosts.slice(1);

  return (
    <PageWrapper>
      {/* 1. Hero Header */}
      <div className="flex flex-col mb-12 select-none">
        <span className="text-[10px] font-mono tracking-widest text-text3 uppercase mb-3 block">
          WRITING
        </span>
        <h1 className="text-5xl sm:text-6xl font-display font-light text-text1 leading-tight mt-2">
          Geetika's <span className="italic font-normal">blog</span>.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          engineering lessons, in plain words.
        </p>
      </div>

      {/* 5. Filter and Search */}
      <div className="flex flex-col gap-4 mt-4 w-full">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-[9px] tracking-wider uppercase transition-all border ${
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

        <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surface w-full mt-2">
          <Search size={14} className="text-text3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search articles by title, tag, or content..."
            className="bg-transparent border-none outline-none w-full text-xs text-text2 placeholder-text4"
          />
        </div>
      </div>

      {/* 2. Latest Featured Section */}
      {featuredPost && (
        <div className="w-full mt-12">
          <SectionHeader label="LATEST" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-6">
            {/* Left Column: Post Details */}
            <div className="md:col-span-7 flex flex-col items-start min-w-0">
              <span className="text-[10px] font-mono tracking-widest text-text3 uppercase mb-3">
                {featuredPost.category} · {formatDate(featuredPost.createdAt)} · {featuredPost.readTime} min read
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-normal text-text1 hover:text-text3 transition-colors leading-tight">
                <Link to={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h3>
              <p className="text-sm sm:text-base text-text2 italic mt-4 leading-relaxed max-w-[580px]">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {featuredPost.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono border border-border/60 text-text3 px-2 py-0.5 rounded">
                    {tag.toLowerCase()}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-text3 hover:text-text1 transition-colors uppercase tracking-wider mt-6 font-semibold"
              >
                READ &rarr;
              </Link>
            </div>
            
            {/* Right Column: Visual Gradient Placeholder Image */}
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="md:col-span-5 w-full aspect-[4/3] rounded-2xl overflow-hidden relative border border-border/30 shadow-sm bg-gradient-to-tr from-teal/20 via-border/10 to-rose/10 flex items-center justify-center hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-xs font-mono font-medium tracking-widest text-text3 uppercase select-none p-4 text-center leading-snug">
                {featuredPost.category}
              </span>
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-text1 font-bold text-xs uppercase tracking-widest">read</span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* 3. Archive Section */}
      {archivePosts.length > 0 && (
        <div className="w-full mt-16">
          <SectionHeader 
            label="ARCHIVE" 
            rightElement={<span>{archivePosts.length} articles</span>} 
          />
          <div className="flex flex-col gap-10 mt-8 w-full">
            {archivePosts.map((post, idx) => {
              // Alternating layout and styling modifiers
              const isTinted = (idx + 1) % 3 === 0 || (idx + 1) % 3 === 2;
              const isReverse = idx % 2 === 1;

              return (
                <article
                  key={post.slug || idx}
                  className={`w-full group transition-all duration-300 ${
                    isTinted 
                      ? 'bg-surface2/30 dark:bg-surface/45 border border-border/20 rounded-2xl p-6 hover:shadow-sm' 
                      : 'border-b border-border/40 pb-8 last:border-none'
                  }`}
                >
                  <div className={`flex flex-col md:flex-row gap-6 items-center justify-between w-full ${
                    isReverse ? 'md:flex-row-reverse' : ''
                  }`}>
                    {/* Text block */}
                    <div className="flex-1 min-w-0 flex flex-col items-start">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-text3 uppercase mb-2.5">
                        <span>{post.category}</span>
                        <span>·</span>
                        <span>{formatDate(post.createdAt)}</span>
                        <span>·</span>
                        <span>{post.readTime} min</span>
                      </div>
                      <h3 className="text-2xl font-display font-normal text-text1 group-hover:text-text3 transition-colors leading-tight">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-text2 italic leading-relaxed mt-2.5 max-w-[620px]">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[8.5px] font-mono border border-border/40 text-text3/80 px-1.5 py-0.5 rounded lowercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-xs font-mono text-[#34908B] hover:text-text1 transition-colors uppercase font-medium"
                        >
                          Read Article &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Thumbnail Image block */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="w-full md:w-44 h-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 relative border border-border/30 shadow-sm bg-gradient-to-tr from-teal/20 via-border/10 to-rose/10 flex items-center justify-center group-hover:shadow-md transition-all duration-300"
                    >
                      <span className="text-[9px] font-mono font-medium tracking-widest text-text3 uppercase select-none p-3 text-center leading-snug">
                        {post.category}
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. External Blog Promotion & Footer Links */}
      <div className="w-full bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-16 select-none relative overflow-hidden group">
        <div className="absolute inset-0 bg-text3/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="flex flex-col min-w-0 z-10">
          <span className="text-[9px] font-mono tracking-widest text-text3 uppercase mb-1.5">EXTERNAL JOURNALS</span>
          <h2 className="text-xl sm:text-2xl font-display font-normal text-text1">GeekyKunoichi Blog</h2>
          <p className="text-xs sm:text-sm text-text2 italic mt-1.5 max-w-[500px]">
            My external technical writeups. You can find me sharing thoughts, systems engineering deep-dives, and tutorials across these publications:
          </p>
          {/* Expanded link row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-[11px] font-mono text-text3">
            <a href="https://geekykunoichi.onrender.com/" target="_blank" rel="noopener noreferrer" className="hover:text-text1 transition-colors underline decoration-border/60 hover:decoration-text1">
              Main Site
            </a>
            <span>·</span>
            <a href="https://medium.com/@geetikavasistha13" target="_blank" rel="noopener noreferrer" className="hover:text-text1 transition-colors underline decoration-border/60 hover:decoration-text1">
              Medium
            </a>
            <span>·</span>
            <a href="https://hashnode.com/@ai-for-all" target="_blank" rel="noopener noreferrer" className="hover:text-text1 transition-colors underline decoration-border/60 hover:decoration-text1">
              Hashnode
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 z-10">
          <a
            href="https://geekykunoichi.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center gap-2 bg-text1 text-bg hover:bg-text3 transition-colors px-4 py-2.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase"
          >
            <span>Read on Blog</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://geetikavasistha.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center gap-1.5 text-[9.5px] font-mono tracking-widest text-text3 hover:text-text1 transition-colors uppercase border border-border/80 rounded-full px-4 py-2"
          >
            Subscribe to Substack &rarr;
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
