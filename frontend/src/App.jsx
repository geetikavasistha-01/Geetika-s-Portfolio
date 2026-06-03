import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroCanvas from './components/hero/HeroCanvas';
import AboutMePage from './components/AboutMePage';
import ProjectsPage from './components/ProjectsPage';
import WorkLogPage from './components/WorkLogPage';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const home = document.getElementById('home');
      const about = document.getElementById('about');
      const projects = document.getElementById('projects');
      const worklog = document.getElementById('worklog');

      if (!home || !about) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      if (worklog && scrollPosition >= worklog.offsetTop) {
        setActiveSection('worklog');
      } else if (projects && scrollPosition >= projects.offsetTop) {
        setActiveSection('projects');
      } else if (scrollPosition >= about.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // run initially
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activeSection={activeSection} />
      <HeroCanvas />
      <AboutMePage />
      <ProjectsPage />
      <WorkLogPage />
    </div>
  );
}

export default App;
