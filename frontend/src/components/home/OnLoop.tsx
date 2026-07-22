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
    time: "ANIME · ON LOOP",
    name: "Sousou no Frieren",
    collection: "Quiet melancholy, beautiful pacing, and an outstanding soundtrack.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/1015/138025.jpg"
  },
  {
    time: "ANIME · CLASSIC",
    name: "Neon Genesis Evangelion",
    collection: "Deconstructing mech conventions, psychological depths, and human instrumentation.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/1314/111762.jpg"
  },
  {
    time: "MANGA · SUSPENSE",
    name: "Monster",
    collection: "A masterclass in psychological tension, morality, and character writing.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/10/18793.jpg"
  },
  {
    time: "ANIME · COMFORT ZONE",
    name: "Haikyuu!!",
    collection: "Unmatched team chemistry, growth, and high-energy animation.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/7/76014.jpg"
  },
  {
    time: "ANIME · COMEDY",
    name: "Gintama",
    collection: "Peak satire, heart-wrenching serious arcs, and absolute character love.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/3/28761.jpg"
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
