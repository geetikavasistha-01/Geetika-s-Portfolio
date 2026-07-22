import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { ProductDropCard, DropItem } from '../ui/product-drop-card';

import tedLasso from '../../assets/ted-lasso.jpg';
import enolaHolmes from '../../assets/enola-holmes.jpg';
import brooklyn99 from '../../assets/brooklyn-99.png';
import renge from '../../assets/renge.jpg';

const loopItems: DropItem[] = [
  {
    time: "MOVIE · SUSPENSE",
    name: "Enola Holmes",
    collection: "A clever, fast-paced detective mystery full of wit and sisterly rebellion.",
    imageSrc: enolaHolmes
  },
  {
    time: "ANIME · LEGENDARY",
    name: "One Piece",
    collection: "An epic tale of freedom, dreams, and companionship across the grand line.",
    imageSrc: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg"
  },
  {
    time: "ANIME · COMFORT ZONE",
    name: "Non Non Biyori",
    collection: "Nyanpasu! A heartwarming, peaceful slice-of-life comedy in the Japanese countryside.",
    imageSrc: renge
  },
  {
    time: "SERIES · COMFORT ZONE",
    name: "Ted Lasso",
    collection: "Believing in believe, leadership with kindness, and mental health in sports.",
    imageSrc: tedLasso
  },
  {
    time: "SERIES · COMEDY",
    name: "Brooklyn Nine-Nine",
    collection: "Nine-nine! Peak workplace humor, outstanding characters, and hot damn cold opens.",
    imageSrc: brooklyn99
  },
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
