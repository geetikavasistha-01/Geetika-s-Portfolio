import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/home/Hero';
import LogCards from '../components/home/LogCards';
import GitHubHeatmap from '../components/home/GitHubHeatmap';
import FeaturedProjects from '../components/home/FeaturedProjects';
import LabNotebook from '../components/home/LabNotebook';
import LatestWriting from '../components/home/LatestWriting';
import AMAPreview from '../components/home/AMAPreview';
import OnLoop from '../components/home/OnLoop';
import SectionHeader from '../components/ui/SectionHeader';
import { useUIStore } from '../store/uiStore';
import InteractiveEnvelope from '../components/ui/InteractiveEnvelope';

export default function Home() {
  const { recruiterMode } = useUIStore();

  return (
    <PageWrapper>
      {/* 1. Hero Profile */}
      <Hero />

      {/* 6. Featured Projects */}
      <div id="featured-work">
        <SectionHeader
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

      {/* 4. Log Cards (Micro-journal) - Hidden in recruiter mode */}
      {!recruiterMode && (
        <>
          <SectionHeader
            label="log journal"
            rightElement={<span>micro drops</span>}
            subtext="Stray thoughts, technical discoveries, and things I chew on."
          />
          <LogCards />
        </>
      )}

      {/* 5. Contributions Heatmap */}
      <GitHubHeatmap />

      {/* 7. Lab Notebook screenshots - Hidden in recruiter mode */}
      {!recruiterMode && (
        <>
          <SectionHeader
            label="lab notebook"
            rightElement={<span>snapshots</span>}
            subtext="Working drafts, terminal printouts, and visual notes."
          />
          <LabNotebook />
        </>
      )}

      {/* 8. Latest Article */}
      <SectionHeader
        label="writing"
        rightElement={<span>blog feed</span>}
      />
      <LatestWriting />



      {/* 10. AMA Preview */}
      <SectionHeader
        label="questions & answers"
        rightElement={<span>ama preview</span>}
      />
      <AMAPreview />

      {/* 11. Anime / Recreation shelf - Hidden in recruiter mode */}
      {!recruiterMode && (
        <div className="mt-16">
          <OnLoop />
        </div>
      )}
      <InteractiveEnvelope />
    </PageWrapper>
  );
}
