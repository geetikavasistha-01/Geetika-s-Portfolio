import React from 'react';

export interface PlaylistEmbedProps {
  playlistId: string;
}

export default function PlaylistEmbed({ playlistId }: PlaylistEmbedProps) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-border/40 bg-white dark:bg-zinc-900 p-2">
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="w-full border-0 rounded-xl"
      />
    </div>
  );
}
