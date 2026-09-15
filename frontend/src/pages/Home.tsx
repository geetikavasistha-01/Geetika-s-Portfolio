import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/home/Hero';
import GitHubHeatmap from '../components/home/GitHubHeatmap';
import FeaturedProjects from '../components/home/FeaturedProjects';
import LabNotebook from '../components/home/LabNotebook';
import LatestWriting from '../components/home/LatestWriting';
import AMAPreview from '../components/home/AMAPreview';
import OnLoop from '../components/home/OnLoop';
import SectionHeader from '../components/ui/SectionHeader';
import { useUIStore } from '../store/uiStore';
import HomeEnvelopeFooter from '../components/home/HomeEnvelopeFooter';
import homeMeadowBg from '../assets/home-meadow-bg.jpg';

export default function Home() {
  const { recruiterMode } = useUIStore();

  return (
    <div className="w-full flex flex-col relative min-h-screen">
      {/* Fixed meadow background image */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none -z-10"
        style={{ backgroundImage: `url(${homeMeadowBg})` }}
      />
      {/* Subtle overlay to enhance contrast and harmonize with light/dark theme */}
      <div className="fixed inset-0 w-full h-full bg-bg/5 dark:bg-bg/20 pointer-events-none -z-10" />

      <PageWrapper>
        {/* Unified Continuous Filled Block Container From Top to Bottom */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-border shadow-sm mb-12 select-none">
          {/* 1. Hero Profile & Header */}
          <Hero />

          {/* 2. Content Sections Inside the Filled Block */}
          <div className="px-6 sm:px-8 pb-10 flex flex-col w-full select-text">
            {/* 6. Featured Projects */}
            <div id="featured-work" className="w-full mt-4">
              <h2 className="text-xl sm:text-2xl font-daffeniy text-text1 uppercase tracking-wider">
                Projects
              </h2>
              <SectionHeader
                className="mt-4"
                label="featured"
                rightElement={
                  <Link 
                    to="/projects" 
                    className="flex items-center gap-0.5 hover:text-text1 transition-colors uppercase tracking-widest text-[9.5px] font-mono"
                  >
                    view all &rarr;
                  </Link>
                }
                subtext="Things I've built that I'm proud of."
              />
              <FeaturedProjects />
            </div>

            <hr className="border-t border-border/40 my-14 w-full" />

            {/* 5. Contributions Heatmap */}
            <div className="w-full">
              <GitHubHeatmap />
            </div>

            <hr className="border-t border-border/40 my-14 w-full" />

            {/* 8. Latest Article */}
            <div className="w-full">
              <SectionHeader
                label="writing"
                rightElement={
                  <Link 
                    to="/blog" 
                    className="flex items-center gap-0.5 hover:text-text1 transition-colors uppercase tracking-widest text-[9.5px] font-mono"
                  >
                    view blog &rarr;
                  </Link>
                }
              />
              <LatestWriting />
            </div>

            <hr className="border-t border-border/40 my-14 w-full" />

            {/* 10. AMA Preview */}
            <div className="w-full">
              <SectionHeader
                label="questions & answers"
                labelClassName="font-daffeniy"
                rightElement={
                  <Link 
                    to="/ama" 
                    className="flex items-center gap-0.5 hover:text-text1 transition-colors uppercase tracking-widest text-[9.5px] font-mono"
                  >
                    ask questions &rarr;
                  </Link>
                }
              />
              <AMAPreview />
            </div>

            {/* 11. Anime / Recreation shelf - Hidden in recruiter mode */}
            {!recruiterMode && (
              <>
                <hr className="border-t border-border/40 my-14 w-full" />
                <div className="w-full">
                  <OnLoop limit={3} />
                </div>
              </>
            )}
          </div>
        </div>
      </PageWrapper>
      <HomeEnvelopeFooter />
    </div>
  );
}
