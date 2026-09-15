import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { BlogPost } from '../../types';

const defaultPost: BlogPost = {
  slug: 'understanding-attention-mechanisms',
  title: 'Attention Is All You Need (To Understand)',
  excerpt: 'A deep, mathematical deep-dive into self-attention matrices and sequence-to-sequence weights without the corporate hype.',
  content: '',
  tags: ['ML', 'TRANSFORMERS'],
  category: 'RESEARCH',
  published: true,
  featured: true,
  readTime: 8,
  createdAt: '2026-06-20T00:00:00.000Z'
};

export default function LatestWriting() {
  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ['blog-latest'],
    queryFn: async () => {
      try {
        const res = await api.get('/blog?limit=1');
        return res.data;
      } catch {
        return [defaultPost];
      }
    },
    initialData: [defaultPost]
  });

  const post = posts[0] || defaultPost;

  return (
    <div className="w-full mt-6 select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
        {/* Left Side: Article Info */}
        <div className="flex-1 min-w-0 flex flex-col items-start">
          <span className="text-[10px] font-mono tracking-widest text-text3 uppercase mb-3">
            {post.category || 'ARTICLE'} · {post.readTime} min read
          </span>
          <h3 className="text-2xl font-display font-normal text-text1 hover:text-accent transition-colors leading-tight">
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <p className="text-base sm:text-lg text-text2 italic mt-3 leading-relaxed">
            {post.excerpt}
          </p>
          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-mono text-text3 hover:text-text1 transition-colors uppercase tracking-wider mt-5"
          >
            Read Post &rarr;
          </Link>
        </div>

        {/* Right Side: Gradient Placeholder Image */}
        <Link
          to={`/blog/${post.slug}`}
          className="w-full md:w-56 h-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 relative border border-border/30 shadow-sm bg-gradient-to-tr from-teal/20 via-border/10 to-rose/10 flex items-center justify-center hover:shadow-md transition-all duration-300 group"
        >
          <span className="text-[10px] font-mono font-medium tracking-widest text-text3 uppercase select-none p-4 text-center leading-snug">
            {post.category || 'ARTICLE'}
          </span>
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-text1 font-bold text-xs uppercase tracking-widest">read</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
