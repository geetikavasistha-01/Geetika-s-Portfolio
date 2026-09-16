import React, { useState } from 'react';
import Scene1OpeningField from './Scene1OpeningField';
import Scene2Curiosity from './Scene2Curiosity';
import Scene3Workshop from './Scene3Workshop';
import Scene4Experience from './Scene4Experience';
import Scene5ConnectedSystems from './Scene5ConnectedSystems';
import Scene6GoldenHour from './Scene6GoldenHour';
import Scene7NightFinale from './Scene7NightFinale';
import StoryRecruiterView from './StoryRecruiterView';
import { Zap, BookOpen } from 'lucide-react';

export default function ScrollStoryContainer() {
  const [recruiterFastMode, setRecruiterFastMode] = useState(false);

  // Fast Recruiter Mode bypass
  if (recruiterFastMode) {
    return (
      <div className="relative w-full min-h-screen pt-28 pb-16">
        {/* Fixed Ambient Background Atmosphere */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center -z-20 opacity-30 pointer-events-none"
          style={{ backgroundImage: 'url(/images/story/scene-1-opening-field.webp)' }}
        />
        <div className="fixed top-24 right-6 z-50">
          <button
            onClick={() => setRecruiterFastMode(false)}
            className="px-4 py-2 rounded-full bg-surface/95 backdrop-blur-md border border-border shadow-md text-xs font-mono font-bold text-text1 hover:text-accent flex items-center gap-1.5 transition-all"
          >
            <BookOpen size={13} />
            <span>Return to Story Mode</span>
          </button>
        </div>
        <StoryRecruiterView />
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col scroll-smooth">
      {/* Recruiter Fast Mode Switcher (Floating Top Right) */}
      <div className="fixed top-24 right-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setRecruiterFastMode(true)}
          className="px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border/60 shadow-sm text-[11px] font-mono font-bold text-text2 hover:text-accent flex items-center gap-1.5 transition-all select-none"
          title="Switch to instant scannable recruiter view"
        >
          <Zap size={12} className="text-amber-500" />
          <span>Recruiter View</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* SCENE 1: The Opening Field (Hero / Prologue)                */}
      {/* ============================================================ */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex items-center justify-center py-28 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none select-none">
          <picture className="w-full h-full">
            <source srcSet="/images/story/scene-1-opening-field.webp" type="image/webp" />
            <img
              src="/images/story/scene-1-opening-field.jpg"
              alt="The Opening Field"
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover object-[center_55%] sm:object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/15 via-transparent to-bg/30 dark:from-black/40 dark:via-black/15 dark:to-black/50 pointer-events-none" />
        </div>

        <Scene1OpeningField />
      </section>

      {/* ============================================================ */}
      {/* SCENE 2: Curiosity & Craft (About / What I Build)           */}
      {/* ============================================================ */}
      <section
        id="about"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none select-none">
          <picture className="w-full h-full">
            <source srcSet="/images/story/scene-2-curiosity.webp" type="image/webp" />
            <img
              src="/images/story/scene-2-curiosity.jpg"
              alt="Curiosity & Craft"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_55%] sm:object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/30 dark:from-black/40 dark:via-black/15 dark:to-black/50 pointer-events-none" />
        </div>

        <Scene2Curiosity />
      </section>

      {/* ============================================================ */}
      {/* SCENE 3: The Workshop (Featured Projects)                   */}
      {/* ============================================================ */}
      <section
        id="projects"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none select-none">
          <picture className="w-full h-full">
            <source srcSet="/images/story/scene-3-workshop.webp" type="image/webp" />
            <img
              src="/images/story/scene-3-workshop.jpg"
              alt="The Workshop"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_55%] sm:object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/30 dark:from-black/40 dark:via-black/15 dark:to-black/50 pointer-events-none" />
        </div>

        <Scene3Workshop />
      </section>

      {/* ============================================================ */}
      {/* SCENE 4: The Growing World (Experience & Roles)             */}
      {/* ============================================================ */}
      <section
        id="experience"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none select-none">
          <picture className="w-full h-full">
            <source srcSet="/images/story/scene-4-growing-world.webp" type="image/webp" />
            <img
              src="/images/story/scene-4-growing-world.jpg"
              alt="The Growing World"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_55%] sm:object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/30 dark:from-black/40 dark:via-black/15 dark:to-black/50 pointer-events-none" />
        </div>

        <Scene4Experience />
      </section>

      {/* ============================================================ */}
      {/* SCENE 5: Connected Systems (Systems Thinking)               */}
      {/* ============================================================ */}
      <section
        id="systems"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none select-none">
          <picture className="w-full h-full">
            <source srcSet="/images/story/scene-5-connected-systems.webp" type="image/webp" />
            <img
              src="/images/story/scene-5-connected-systems.jpg"
              alt="Connected Systems"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_55%] sm:object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/30 dark:from-black/40 dark:via-black/15 dark:to-black/50 pointer-events-none" />
        </div>

        <Scene5ConnectedSystems />
      </section>

      {/* ============================================================ */}
      {/* SCENE 6: Golden Hour & Values (Principles)                  */}
      {/* ============================================================ */}
      <section
        id="values"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none select-none">
          <picture className="w-full h-full">
            <source srcSet="/images/story/scene-6-golden-hour.webp" type="image/webp" />
            <img
              src="/images/story/scene-6-golden-hour.jpg"
              alt="Golden Hour"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_55%] sm:object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/30 dark:from-black/40 dark:via-black/15 dark:to-black/50 pointer-events-none" />
        </div>

        <Scene6GoldenHour />
      </section>

      {/* ============================================================ */}
      {/* SCENE 7: The Night Sky & Finale (Contact & Epilogue)        */}
      {/* ============================================================ */}
      <section
        id="contact"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none select-none">
          <picture className="w-full h-full">
            <source srcSet="/images/story/scene-7-night.webp" type="image/webp" />
            <img
              src="/images/story/scene-7-night.jpg"
              alt="The Night Sky"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_55%] sm:object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/30 dark:from-black/40 dark:via-black/15 dark:to-black/50 pointer-events-none" />
        </div>

        <Scene7NightFinale />
      </section>
    </div>
  );
}
