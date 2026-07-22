import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Music, Heart } from 'lucide-react';
import { SpotifyTrack } from '../../types';

const defaultTrack: SpotifyTrack = {
  title: 'Nothing playing right now',
  artist: '',
  albumArt: '',
  url: 'https://spotify.com',
  isPlaying: false
};

export default function SpotifyWidget() {
  const { data: track, isLoading } = useQuery<SpotifyTrack>({
    queryKey: ['spotify-now-playing'],
    queryFn: async () => {
      try {
        const res = await api.get('/spotify/now-playing');
        return res.data;
      } catch {
        return defaultTrack;
      }
    },
    refetchInterval: 10000,
  });

  const displayTrack = track || defaultTrack;
  const isMusicPlaying = displayTrack.isPlaying;

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-surface shadow-sm select-none max-w-xs mt-6 transition-all duration-300">
      {/* Small Album Art / Music Icon */}
      <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-surface2 border border-border flex-shrink-0 flex items-center justify-center">
        {isLoading ? (
          <div className="w-full h-full bg-surface2 animate-pulse" />
        ) : displayTrack.albumArt ? (
          <img
            src={displayTrack.albumArt}
            alt="Album Art"
            className="w-full h-full object-cover"
          />
        ) : (
          <Music size={14} className="text-text3" />
        )}
        {isMusicPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="flex gap-0.5 items-end justify-center h-3.5 w-3.5">
              <span className="w-0.5 h-2 bg-green animate-bounce [animation-delay:0.1s]" />
              <span className="w-0.5 h-3 bg-green animate-bounce [animation-delay:0.3s]" />
              <span className="w-0.5 h-1.5 bg-green animate-bounce [animation-delay:0.5s]" />
            </span>
          </div>
        )}
      </div>

      {/* Info text */}
      <div className="flex flex-col min-w-0">
        <span className="text-[8px] font-mono tracking-widest text-text4 uppercase flex items-center gap-1 select-none">
          <span className={`w-1 h-1 rounded-full ${isMusicPlaying ? 'bg-green animate-pulse' : 'bg-text4'}`} />
          {isMusicPlaying ? 'Now Playing' : 'Last Played'}
        </span>
        {displayTrack.title === 'Nothing playing right now' ? (
          <span className="text-xs text-text3 truncate select-none">
            Nothing playing right now.
          </span>
        ) : (
          <a
            href={displayTrack.url || 'https://spotify.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-text1 hover:underline transition-colors truncate max-w-[180px]"
          >
            {displayTrack.title} {displayTrack.artist && `· ${displayTrack.artist}`}
          </a>
        )}
      </div>
    </div>
  );
}
