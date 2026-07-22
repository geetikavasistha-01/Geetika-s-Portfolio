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
  },
  {
    time: "ANIME · LEGENDARY",
    name: "One Piece",
    collection: "An epic tale of freedom, dreams, and companionship across the grand line.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg"
  },
  {
    time: "SERIES · COMFORT ZONE",
    name: "Ted Lasso",
    collection: "Believing in believe, leadership with kindness, and mental health in sports.",
    imageSrc: "https://images.unsplash.com/photo-1508847154043-be12a3bc4b1a?auto=format&fit=crop&w=300&h=450&q=80"
  },
  {
    time: "MOVIE · SUSPENSE",
    name: "Enola Holmes",
    collection: "A clever, fast-paced detective mystery full of wit and sisterly rebellion.",
    imageSrc: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&h=450&q=80"
  },
  {
    time: "SERIES · COMEDY",
    name: "Brooklyn Nine-Nine",
    collection: "Nine-nine! Peak workplace humor, outstanding characters, and hot damn cold opens.",
    imageSrc: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=300&h=450&q=80"
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
