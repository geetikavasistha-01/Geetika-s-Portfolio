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
    collection: "clever & witty",
    imageSrc: enolaHolmes
  },
  {
    time: "ANIME · LEGENDARY",
    name: "One Piece",
    collection: "freedom & dreams",
    imageSrc: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg"
  },
  {
    time: "ANIME · COMFORT ZONE",
    name: "Non Non Biyori",
    collection: "peaceful comfort watch",
    imageSrc: renge
  },
  {
    time: "SERIES · COMFORT ZONE",
    name: "Ted Lasso",
    collection: "kindness in leadership",
    imageSrc: tedLasso
  },
  {
    time: "SERIES · COMEDY",
    name: "Brooklyn Nine-Nine",
    collection: "peak workplace comedy",
    imageSrc: brooklyn99
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
