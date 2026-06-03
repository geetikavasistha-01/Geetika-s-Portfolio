import React from 'react';
import LeftClutter from './LeftClutter';
import RightClutter from './RightClutter';
import CRTMonitor from './CRTMonitor';

export default function HeroCanvas() {
  return (
    <main id="home" className="w-full h-screen max-h-screen relative overflow-hidden page-wrapper flex justify-center items-center">
      {/* Background Image with a minute blur effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-top bg-no-repeat scale-105 blur-[3px] overflow-hidden z-0"
        style={{ backgroundImage: "url('/Background.png')" }}
      />
      
      {/* Content Layer */}
      <div className="absolute inset-0 top-[52px] overflow-hidden pointer-events-none z-10">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          <LeftClutter />
          <CRTMonitor />
          <RightClutter />
        </div>
      </div>
    </main>
  );
}
