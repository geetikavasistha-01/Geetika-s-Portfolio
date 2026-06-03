import React from 'react';

export default function ProjectsPage() {
  return (
    <div id="projects" className="bg-limeade h-screen max-h-screen overflow-hidden flex flex-col font-body-m text-on-surface relative">
      {/* Halftone Overlay */}
      <div className="absolute inset-0 halftone-bg opacity-10 pointer-events-none z-0"></div>
      
      {/* Main Content Area */}
      <main className="relative z-10 w-full h-screen max-h-screen overflow-hidden flex flex-col items-center justify-between pt-4 pb-0">
        {/* Massive Title */}
        <div className="absolute top-[60px] left-1/2 -translate-x-1/2 flex items-center justify-center w-full z-10 pointer-events-none">
          <h1 className="text-[60px] md:text-[100px] leading-none flex tracking-tighter">
            <span className="font-bubbly title-outline">PRO</span>
            <span className="font-pixel text-royal-blue ml-1">JECTS</span>
          </h1>
        </div>
        
        {/* Decorative Elements Background */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <span className="material-symbols-outlined absolute top-[208px] right-[15%] text-canary text-5xl rotate-45">star</span>
          <span className="material-symbols-outlined absolute bottom-[70%] left-[20%] text-primary text-3xl">code</span>
          <div className="absolute top-[30%] right-[10%] w-16 h-16 border-4 border-royal-blue rotate-12 flex items-center justify-center bg-surface">
            <span className="material-symbols-outlined text-emerald">grass</span>
          </div>
        </div>

        {/* PROJECTS.ZIP label */}
        <div className="absolute top-[198px] right-[7%] bg-royal-blue border-[3px] border-royal-blue px-4 py-2 rotate-[2deg] z-10 pointer-events-none shadow-[4px_4px_0_#E7DD6A]">
          <span className="font-label-sm text-canary text-xs uppercase tracking-widest">
            PROJECTS.ZIP
          </span>
        </div>

        {/* Swipe sticky note */}
        <div className="absolute top-[203px] left-[7%] bg-canary border-[3px] border-royal-blue px-3 py-2 rotate-[-3deg] z-10 pointer-events-none shadow-[4px_4px_0_#2B4789]">
          <span className="font-note-handwritten text-royal-blue text-sm">
            swipe cards for source code &rarr;
          </span>
        </div>

        {/* Extra sparkles */}
        <span className="absolute top-[158px] left-[12%] text-watermelon text-3xl rotate-[15deg] pointer-events-none z-10">✦</span>
        <span className="absolute top-[163px] right-[18%] text-canary text-2xl pointer-events-none z-10">★</span>
        <span className="absolute top-[153px] left-[45%] text-limeade text-xl rotate-[-8deg] pointer-events-none z-10 opacity-60">✷</span>
        
        {/* The Folder Container */}
        <div className="w-[85%] md:w-[75%] max-w-[1000px] relative z-20 flex flex-col justify-end mt-[220px] h-[calc(100vh-280px)] max-h-[calc(100vh-280px)] min-h-0">
          {/* Folder Back Layer */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%+20px)] h-[calc(100%+10px)] bg-dark-pink border-4 border-royal-blue rounded-b-[16px] z-10">
            {/* Folder Tab */}
            <div className="absolute -top-12 left-12 bg-dark-pink px-8 h-12 border-4 border-b-0 border-royal-blue rounded-t-[12px] flex items-center justify-center z-10">
              <span className="font-headline-lg-mobile md:font-headline-lg text-paper text-lg whitespace-nowrap">GEETIKA / PROJECTS</span>
            </div>
          </div>
          
          {/* Stuffed Files Container */}
          <div className="absolute top-6 left-0 w-full h-[calc(100%-56px)] pointer-events-none z-20 flex justify-center items-end gap-2 md:gap-4 px-4 md:px-8 pb-16">
            {/* Project 1 */}
            <div className="card-hover-group relative h-full w-full max-w-[220px] pointer-events-auto">
              <div className="project-card absolute bottom-[-40px] left-0 w-full bg-paper border-4 border-royal-blue hard-shadow-sm p-4 transition-all duration-300 transform -rotate-3 z-10 hover:z-50 h-[300px]">
                <div className="font-headline-lg-mobile text-royal-blue mb-2">Teachers-Mate</div>
                <p className="font-body-m text-sm text-royal-blue mb-4 font-bold">JavaScript · React · Node.js · Express.js · MongoDB</p>
                <p className="font-body-m text-sm opacity-0 transition-opacity duration-300">Full-stack teaching assistant platform. Streamlines classroom workflows and resource management for educators.</p>
                <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 border-2 border-royal-blue bg-surface px-4 py-1 font-label-sm text-royal-blue hover:bg-royal-blue hover:text-surface transition-colors opacity-0 inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  Source
                </a>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="card-hover-group relative h-full w-full max-w-[220px] pointer-events-auto hidden sm:block">
              <div className="project-card absolute bottom-[-35px] left-0 w-full bg-canary border-4 border-royal-blue hard-shadow-sm p-4 transition-all duration-300 transform rotate-2 z-10 hover:z-50 h-[310px]">
                <div className="font-headline-lg-mobile text-royal-blue mb-2">CivilLens</div>
                <p className="font-body-m text-sm text-royal-blue mb-4 font-bold">JavaScript · DOM Analysis · PDF Miner</p>
                <p className="font-body-m text-sm opacity-0 transition-opacity duration-300 text-royal-blue">Converts complex government documents into structured, searchable, visual insights. Chat with dense policy documents intuitively.</p>
                <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 border-2 border-royal-blue bg-surface px-4 py-1 font-label-sm text-royal-blue hover:bg-royal-blue hover:text-surface transition-colors opacity-0 inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  Source
                </a>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="card-hover-group relative h-full w-full max-w-[220px] pointer-events-auto">
              <div className="project-card absolute bottom-[-30px] left-0 w-full bg-royal-blue border-4 border-royal-blue hard-shadow-sm p-4 transition-all duration-300 transform -rotate-6 z-10 hover:z-50 h-[290px]">
                <div className="font-headline-lg-mobile text-paper mb-2">DRL-v1.0</div>
                <p className="font-body-m text-sm text-paper mb-4 font-bold">Go · Redis · Prometheus</p>
                <p className="font-body-m text-sm opacity-0 transition-opacity duration-300 text-paper">High-performance distributed rate limiting in Go. Per-client API quotas across horizontally scaled nodes using atomic Redis Lua scripts.</p>
                <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 border-2 border-paper bg-royal-blue px-4 py-1 font-label-sm text-paper hover:bg-paper hover:text-royal-blue transition-colors opacity-0 inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  Source
                </a>
              </div>
            </div>
            
            {/* Project 4 */}
            <div className="card-hover-group relative h-full w-full max-w-[220px] pointer-events-auto hidden lg:block">
              <div className="project-card absolute bottom-[-38px] left-0 w-full bg-emerald border-4 border-royal-blue hard-shadow-sm p-4 transition-all duration-300 transform rotate-4 z-10 hover:z-50 h-[300px]">
                <div className="font-headline-lg-mobile text-royal-blue mb-2">Ethical Twin</div>
                <p className="font-body-m text-sm text-royal-blue mb-4 font-bold">HTML5 · JavaScript</p>
                <p className="font-body-m text-sm opacity-0 transition-opacity duration-300 text-royal-blue">Dual-agent AI governance framework. Decision + oversight agents detect bias, assess ethical risk, and enforce policy compliance.</p>
                <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 border-2 border-royal-blue bg-surface px-4 py-1 font-label-sm text-royal-blue hover:bg-royal-blue hover:text-surface transition-colors opacity-0 inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  Source
                </a>
              </div>
            </div>
            
            {/* Project 5 */}
            <div className="card-hover-group relative h-full w-full max-w-[220px] pointer-events-auto hidden xl:block">
              <div className="project-card absolute bottom-[-32px] left-0 w-full bg-paper border-4 border-royal-blue hard-shadow-sm p-4 transition-all duration-300 transform -rotate-2 z-10 hover:z-50 h-[280px]">
                <div className="font-headline-lg-mobile text-royal-blue mb-2">GreenTrack</div>
                <p className="font-body-m text-sm text-royal-blue mb-4 font-bold">Python · PyTorch · PostgreSQL · Docker</p>
                <p className="font-body-m text-sm opacity-0 transition-opacity duration-300">Deep learning waste classifier (ResNet) with 90% accuracy. Quantization + pruning for production. Clean-tech sustainability pipeline.</p>
                <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 border-2 border-royal-blue bg-surface px-4 py-1 font-label-sm text-royal-blue hover:bg-royal-blue hover:text-surface transition-colors opacity-0 inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  Source
                </a>
              </div>
            </div>
          </div>
          
          {/* Folder Front */}
          <div className="bg-watermelon border-4 border-royal-blue hard-shadow w-full h-full relative z-30 rounded-b-[16px] border-t-[2px] border-t-white/20">
            {/* Paperclip */}
            <div className="absolute -top-8 right-12 z-40 rotate-[10deg]">
              <svg width="44" height="90" viewBox="0 0 44 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 70V22C32 12.6 25 5 16 5C7 5 0 12.6 0 22V72C0 82.5 8.5 90 19 90C29.5 90 38 82.5 38 72V18" stroke="#94A3B8" strokeWidth="7" strokeLinecap="round"/>
                <path d="M32 70V22C32 12.6 25 5 16 5C7 5 0 12.6 0 22V72C0 82.5 8.5 90 19 90C29.5 90 38 82.5 38 72V18" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            
            {/* Stickers */}
            <div className="absolute top-4 left-8 rotate-[-6deg] bg-canary sticker-border p-3 md:p-4 hard-shadow-sm inline-block z-10">
              <span className="font-nav-bold text-royal-blue uppercase tracking-wider text-sm md:text-base">YOU KNOW WHAT? I BUILD THINGS</span>
            </div>
            <div className="absolute top-4 right-16 rotate-[8deg] bg-surface sticker-border p-2 md:p-3 hard-shadow-sm inline-block z-10">
              <span className="font-nav-bold text-primary uppercase text-xs md:text-sm">IIT DELHI TRYST WINNER</span>
              <span className="material-symbols-outlined text-primary align-middle ml-1">trophy</span>
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 rotate-[-4deg] bg-emerald sticker-border p-3 md:p-4 hard-shadow-sm inline-block whitespace-nowrap hidden sm:block z-10">
              <span className="font-nav-bold text-surface uppercase text-sm md:text-base">AI ENGINEER OR MY SPECIAL INTEREST</span>
            </div>
            <div className="absolute bottom-14 right-12 rotate-[12deg] bg-secondary-container sticker-border p-2 md:p-3 hard-shadow-sm inline-block hidden lg:block z-10">
              <span className="font-nav-bold text-on-surface uppercase text-sm">DISTRIBUTED SYSTEMS</span>
            </div>
            <div className="absolute bottom-14 left-1/3 rotate-[3deg] bg-canary sticker-border p-3 hard-shadow-sm inline-block z-10 hidden md:block">
              <span className="font-nav-bold text-royal-blue uppercase text-sm tracking-wider">
                LIVE · BUILD · DEPLOY CLIMATE TECH
              </span>
            </div>

            {/* Hand-drawn scribbles */}
            <div className="absolute bottom-14 left-12 font-note-handwritten text-royal-blue text-xl -rotate-12 opacity-80 hidden md:block">
              do not open unless authorized -&gt;
            </div>
            
            {/* Tech Manifest */}
            <div className="absolute bottom-2 left-3 right-3 md:left-6 md:right-6 bg-surface border-4 border-royal-blue h-10 flex items-center overflow-hidden z-10">
              <div className="bg-royal-blue text-canary font-headline-lg-mobile text-xs md:text-sm h-full px-4 flex items-center border-r-4 border-royal-blue shrink-0 z-10 uppercase">
                  CORE_TECHNOLOGIES.MANIFEST
              </div>
              <div className="flex-grow flex items-center overflow-hidden relative h-full">
                <div className="flex items-center gap-8 whitespace-nowrap font-headline-lg-mobile text-royal-blue text-xs md:text-sm marquee absolute left-0">
                  <span>/// PYTHON</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>TYPESCRIPT</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>REACT</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>DOCKER</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>PYTORCH</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>AWS</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>GO</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>PYTHON</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>TYPESCRIPT</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>REACT</span>
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  <span>DOCKER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full flex flex-row justify-between items-center px-8 py-2 relative z-50 text-royal-blue font-label-sm text-xs flex-shrink-0">
        <div className="font-nav-bold">
          ©199X GEETIKA VASISTHA. ALL RIGHTS RESERVED. POWERED BY LO-FI BOTANICS.
        </div>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">Archives</a>
          <a className="hover:text-primary transition-colors" href="#">RSS</a>
          <a className="hover:text-primary transition-colors" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
