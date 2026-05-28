import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import BackgroundIllustration from './components/BackgroundIllustration';
import MonitorHero from './components/MonitorHero';
import IdentityTagBar from './components/IdentityTagBar';
import FloatingOverlays from './components/FloatingOverlays';

function App() {
  return (
    <>
      <BackgroundIllustration />
      <div className="halftone-overlay"></div>
      <FloatingOverlays />
      <MonitorHero />
      <IdentityTagBar />
      <NavigationBar />
    </>
  );
}

export default App;
