import React from 'react';
import './FloatingOverlays.css';

export default function FloatingOverlays() {
  return (
    <>
      <div className="floating-overlay animated sticky-agentic">
        Agentic Systems
      </div>

      <div className="floating-overlay animated poster-climate">
        <div className="poster-title">CODE FOR CLIMATE</div>
        <div className="poster-sub">DEPLOYING MODELS.</div>
      </div>

      <div className="floating-overlay animated sticker-python">
        PYTHON
      </div>

      <div className="floating-overlay animated poster-data">
        DATA IS THE<br/>NEW SOIL
      </div>

      <div className="floating-overlay animated label-big-data">
        BIG DATA
      </div>

      <div className="floating-overlay animated label-algorithms">
        ALGORITHMS
      </div>

      <div className="floating-overlay animated sticky-github">
        push to GitHub
      </div>
    </>
  );
}
