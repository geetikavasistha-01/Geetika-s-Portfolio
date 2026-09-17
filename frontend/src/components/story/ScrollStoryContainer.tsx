import React from 'react';
import Scene1OpeningField from './Scene1OpeningField';
import Scene2Curiosity from './Scene2Curiosity';
import Scene3Workshop from './Scene3Workshop';
import Scene4Experience from './Scene4Experience';
import Scene5ConnectedSystems from './Scene5ConnectedSystems';
import Scene6GoldenHour from './Scene6GoldenHour';
import Scene7NightFinale from './Scene7NightFinale';

export default function ScrollStoryContainer() {
  return (
    <div className="relative w-full flex flex-col scroll-smooth">
      {/* ============================================================ */}
      {/* FIXED SINGLE PAGE-WIDE BACKGROUND (Scene 1 Illustration)     */}
      {/* ============================================================ */}
      <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none select-none overflow-hidden">
        <picture className="w-full h-full">
          <source srcSet="/images/story/scene-1-opening-field.webp" type="image/webp" />
          <img
            src="/images/story/scene-1-opening-field.jpg"
            alt="Story World Background"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-[center_top]"
          />
        </picture>
        {/* Subtle Ambient Contrast Overlay */}
        <div className="absolute inset-0 bg-[#FAF6EE]/15 dark:bg-black/30 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* SCENE 1: The Opening Field (Hero / Prologue)                */}
      {/* ============================================================ */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex items-center justify-center py-28 sm:py-32 px-4 sm:px-6"
      >
        <Scene1OpeningField />
      </section>

      {/* ============================================================ */}
      {/* SCENE 2: Curiosity & Craft (About / What I Build)           */}
      {/* ============================================================ */}
      <section
        id="about"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6"
      >
        <Scene2Curiosity />
      </section>

      {/* ============================================================ */}
      {/* SCENE 3: The Workshop (Featured Projects)                   */}
      {/* ============================================================ */}
      <section
        id="projects"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6"
      >
        <Scene3Workshop />
      </section>

      {/* ============================================================ */}
      {/* SCENE 4: The Growing World (Experience & Roles)             */}
      {/* ============================================================ */}
      <section
        id="experience"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6"
      >
        <Scene4Experience />
      </section>

      {/* ============================================================ */}
      {/* SCENE 5: Connected Systems (Systems Thinking)               */}
      {/* ============================================================ */}
      <section
        id="systems"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6"
      >
        <Scene5ConnectedSystems />
      </section>

      {/* ============================================================ */}
      {/* SCENE 6: Golden Hour & Values (Principles)                  */}
      {/* ============================================================ */}
      <section
        id="values"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6"
      >
        <Scene6GoldenHour />
      </section>

      {/* ============================================================ */}
      {/* SCENE 7: The Night Sky & Finale (Contact & Epilogue)        */}
      {/* ============================================================ */}
      <section
        id="contact"
        className="relative w-full min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6"
      >
        <Scene7NightFinale />
      </section>
    </div>
  );
}
