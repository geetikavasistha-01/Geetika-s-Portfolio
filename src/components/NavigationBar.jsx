import React from 'react';
import './NavigationBar.css';

export default function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <div className="nav-logo">GEEKY KUNOICHI</div>
      <div className="nav-links">
        <a href="#about" className="active">ABOUT</a>
        <span>&middot;</span>
        <a href="#projects">PROJECTS</a>
        <span>&middot;</span>
        <a href="#skills">SKILLS</a>
        <span>&middot;</span>
        <a href="#contact">CONTACT</a>
      </div>
      <div className="nav-hamburger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
      <button className="hire-me-btn">HIRE ME</button>
    </nav>
  );
}
