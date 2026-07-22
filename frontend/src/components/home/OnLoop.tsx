import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { ProductDropCard, DropItem } from '../ui/product-drop-card';

const loopItems: DropItem[] = [
  {
    time: "THE HOUR · EP 24",
    name: "Code Geass R2",
    collection: "lelouch sets the stage for zero requiem. still my favourite hour of television.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/4/9391.jpg"
  },
  {
    time: "ON LOOP",
    name: "Steins;Gate",
    collection: "gets better every rewatch. el psy congroo.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/15/24184.jpg"
  },
  {
    time: "COMFORT CHARACTERS",
    name: "Kazuma & Takuma",
    collection: "the twins from gakuen babysitters. if you know, you know.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/11/89497.jpg"
  }
];

export default function OnLoop() {
  const { recruiterMode } = useUIStore();

  if (recruiterMode) return null;

  return (
    <div className="w-full py-6">
      <ProductDropCard
        title="On Loop"
        subtitle="What I keep coming back to."
        items={loopItems}
      />
    </div>
  );
}
