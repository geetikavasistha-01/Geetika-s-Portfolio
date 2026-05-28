import React from 'react';
import './MonitorHero.css';

export default function MonitorHero() {
  return (
    <div className="monitor-container">
      <div className="monitor-screen">
        <div className="monitor-avatar"></div>
        <div className="monitor-text">GEETIKA'S</div>
        <div className="monitor-text">
          PORTFOLIO<span className="blinking-cursor">|</span>
        </div>
      </div>
      <div className="os-taskbar">
        <button className="taskbar-btn-start">⊞ Start</button>
        <button className="taskbar-tab active">About</button>
        <button className="taskbar-tab">Projects</button>
      </div>
    </div>
  );
}
