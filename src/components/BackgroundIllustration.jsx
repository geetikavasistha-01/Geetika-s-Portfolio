import React from 'react';
import './BackgroundIllustration.css';

// TODO: Replace this URL with the path to the background image.
// You can find the generated image in the artifacts directory.
// Save it to public/background.png and change this to '/background.png'
const bgImageUrl = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2000&auto=format&fit=crop';

export default function BackgroundIllustration() {
  return (
    <div 
      className="background-illustration"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    />
  );
}
