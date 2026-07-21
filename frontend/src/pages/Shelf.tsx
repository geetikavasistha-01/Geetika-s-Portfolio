import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { ShelfItem } from '../types';
import { useUIStore } from '../store/uiStore';
import { Navigate } from 'react-router-dom';

const defaultShelf: ShelfItem[] = [
  {
    title: 'Sousou no Frieren',
    type: 'anime',
    label: 'EPISODE 28 · ON LOOP',
    caption: 'Quiet melancholy and beautiful pacing.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&h=450&q=80',
    order: 1
  },
  {
    title: 'The Gita & Krishnamurti',
    type: 'book',
    label: 'READING · CH 12',
    caption: 'Dialogue on action without attachment.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=450&q=80',
    order: 2
  },
  {
    title: 'Cyberpunk Edgerunners OST',
    type: 'music',
    label: 'SPOTIFY ROTATION',
    caption: 'Melodic synths and raw emotional drive.',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&h=450&q=80',
    order: 3
  },
  {
    title: 'Genshin Impact',
    type: 'game',
    label: 'ON LOOP',
    caption: 'Fascinating orchestral OST scores.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=300&h=450&q=80',
    order: 4
  }
];

const types = ['ALL', 'ANIME', 'BOOK', 'MUSIC', 'GAME'];

export default function Shelf() {
  const [selectedType, setSelectedType] = useState('ALL');
  const { recruiterMode } = useUIStore();

  // If recruiter mode is enabled, hide the shelf page by redirecting to home
  if (recruiterMode) {
    return <Navigate to="/" replace />;
  }

  const { data: shelf } = useQuery<ShelfItem[]>({
    queryKey: ['shelf-items'],
    queryFn: async () => {
      try {
        const res = await api.get('/shelf');
        return res.data;
      } catch {
        return defaultShelf;
      }
    },
    initialData: defaultShelf
  });

  const filteredShelf = shelf.filter(
    (item) => selectedType === 'ALL' || item.type.toUpperCase() === selectedType
  );

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>SHELF</span>
          <span>{shelf.length} entries</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          On Loop.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          Media, books, music, and art that I keep coming back to when the monitors go dark.
        </p>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 mt-4 w-full">
        {types.map((t) => {
          const isActive = selectedType === t;
          return (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`rounded-full px-4 py-1.5 text-[9px] tracking-wider uppercase transition-all border ${
                isActive
                  ? 'bg-text1 text-bg border-text1'
                  : 'border-border text-text3 hover:border-text3 hover:text-text1'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Shelf Grid */}
      <SectionHeader label="media grid" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 w-full">
        {filteredShelf.map((item, idx) => (
          <div
            key={item._id || idx}
            className="flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg select-none cursor-pointer"
          >
            {/* Poster Image */}
            <div className="aspect-[2/3] w-full overflow-hidden bg-surface2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Footer */}
            <div className="p-4 flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] tracking-widest text-text3 font-semibold font-mono uppercase truncate">
                {item.type} · {item.label}
              </span>
              <h3 className="text-xs sm:text-sm font-semibold text-text1 mt-1 truncate">
                {item.title}
              </h3>
              <p className="text-[10px] sm:text-xs italic text-text2 mt-0.5 truncate">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
