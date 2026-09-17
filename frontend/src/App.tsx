import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUIStore } from './store/uiStore';

// Layout & Global Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StarField from './components/ui/StarField';
import CLITerminal from './components/ui/CLITerminal';
import CommandPalette from './components/ui/CommandPalette';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectPage from './pages/ProjectPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Shelf from './pages/Shelf';
import AMA from './pages/AMA';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Human from './pages/Human';
import Me from './pages/Me';
import Story from './pages/Story';

const queryClient = new QueryClient();

function ConditionalFooter() {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname === '/story' || location.pathname === '/world') return null;
  return <Footer />;
}

function AppLayout() {
  const location = useLocation();
  const isHuman = location.pathname === '/human';
  const isHome = location.pathname === '/';
  const isStory = location.pathname === '/story' || location.pathname === '/world';

  return (
    <div className={`flex flex-col min-h-screen relative text-text1 ${isHuman || isHome || isStory ? 'bg-transparent' : 'bg-bg'}`}>
      {/* Ambient particle canvas (on pages other than personal side with video & home with custom background) */}
      {!isHuman && !isHome && !isStory && <StarField />}

      {/* Navigation bar */}
      <Navbar />

      {/* Page Routing */}
      <main className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/world" element={<Story />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/shelf" element={<Shelf />} />
          <Route path="/ama" element={<AMA />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/human" element={<Human />} />
          <Route path="/me" element={<Me />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Shared footer */}
      <ConditionalFooter />

      {/* Interactive overlays */}
      <CLITerminal />
      <CommandPalette />
    </div>
  );
}

export default function App() {
  const { initTheme } = useUIStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
