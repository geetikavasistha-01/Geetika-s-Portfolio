import React, { useState, useEffect } from 'react';

export default function WorkLogPage() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        const len = (prev.length + 1) % 4;
        return '.'.repeat(len);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="worklog" className="bg-[#2B4789] halftone-bg min-h-screen font-body-m text-on-surface selection:bg-secondary-container relative overflow-x-hidden">
      <style>{`
        .halftone-bg {
          background-color: #2B4789;
          background-image: radial-gradient(#E7DD6A 1px, transparent 0);
          background-size: 16px 16px;
        }
        .scan-lines {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.05) 50%,
            rgba(0, 0, 0, 0.05)
          );
          background-size: 100% 4px;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 1;
        }
        .speed-lines {
          background: repeating-linear-gradient(
            90deg,
            #E7DD6A,
            #E7DD6A 2px,
            transparent 2px,
            transparent 10px
          );
          height: 4px;
          width: 100px;
        }
        .torn-edge {
          clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 98% 100%, 95% 97%, 92% 100%, 88% 95%, 85% 100%, 80% 95%, 75% 100%, 70% 95%, 65% 100%, 60% 95%, 55% 100%, 50% 95%, 45% 100%, 40% 95%, 35% 100%, 30% 95%, 25% 100%, 20% 95%, 15% 100%, 10% 95%, 5% 100%, 0% 95%);
        }
        .pixel-border-yellow {
          border: 4px solid #E7DD6A;
          box-shadow: 6px 6px 0px 0px #E7DD6A;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .pixel-border-yellow:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 0px 0px #E7DD6A;
        }
        .timeline-spine-new {
          width: 3px;
          background: #E7DD6A;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          z-index: 0;
          transform-origin: top;
          animation: drawSpine 2s ease-out forwards;
        }
        .connector-left {
          position: absolute;
          right: -24px;
          top: 50%;
          width: 24px;
          height: 3px;
          background: #E7DD6A;
          z-index: 0;
        }
        .connector-right {
          position: absolute;
          left: -24px;
          top: 50%;
          width: 24px;
          height: 3px;
          background: #E7DD6A;
          z-index: 0;
        }
        .corner-bracket {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 3px solid #E7DD6A;
        }
        .cb-tl { top: -8px; left: -8px; border-right: none; border-bottom: none; }
        .cb-tr { top: -8px; right: -8px; border-left: none; border-bottom: none; }
        .cb-bl { bottom: -8px; left: -8px; border-right: none; border-top: none; }
        .cb-br { bottom: -8px; right: -8px; border-left: none; border-top: none; }
        
        @keyframes drawSpine {
          0% { transform: translateX(-50%) scaleY(0); }
          100% { transform: translateX(-50%) scaleY(1); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-left { opacity: 0; animation: slideInLeft 0.8s ease-out forwards; }
        .animate-right { opacity: 0; animation: slideInRight 0.8s ease-out forwards; }
        
        @media (max-width: 768px) {
          .timeline-spine-new { left: 32px; }
          .connector-left, .connector-right { display: none; }
        }
      `}</style>
      
      <div className="scan-lines"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-24 pt-20">
        {/* Hero Title Section */}
        <div className="mb-32 flex flex-col md:flex-row justify-between items-start gap-8 relative">
          <div className="relative z-20">
            <div className="flex items-center gap-4 mb-2">
              <div className="speed-lines"></div>
              <span className="text-[#E7DD6A] font-label-sm font-bold tracking-widest text-sm opacity-90">VER. 2025.LOG</span>
            </div>
            <h1 className="font-['Press_Start_2P'] text-4xl md:text-7xl text-[#E7DD6A] leading-tight drop-shadow-[6px_6px_0px_#10B183] mt-4">
              WORK LOG
            </h1>
            <div className="absolute -z-10 font-label-sm text-[#E7DD6A] opacity-10 text-8xl top-0 left-0 transform -translate-x-12 -translate-y-8 pointer-events-none">
              0x4749
            </div>
          </div>
          
          {/* Stacked Terminal Cards (Top Right) */}
          <div className="relative self-end md:absolute md:right-0 md:top-0 z-20">
            {/* Education Badge (Floating Sticker) */}
            <div className="bg-[#FAFAFA] border-4 border-[#2B4789] p-4 rotate-3 pixel-border absolute -top-8 -right-8 w-64 z-30 transform hover:rotate-0 transition-transform">
              <div className="absolute -top-4 -right-2 transform scale-150">
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                  <circle cx="12" cy="12" fill="#ba1a1a" r="10" stroke="#2B4789" strokeWidth="2"></circle>
                </svg>
              </div>
              <p className="font-label-sm text-[#2B4789] uppercase mb-1">Education.txt</p>
              <p className="font-nav-bold text-lg leading-tight text-[#2B4789]">SRM IST · CS Data Science</p>
              <div className="mt-2 inline-block bg-[#10B183] text-white px-2 py-1 text-xs font-bold border-2 border-[#2B4789]">GPA 8.3</div>
            </div>
            
            {/* Terminal Card */}
            <div className="bg-[#1a1c1c] text-[#10B183] p-6 font-label-sm w-80 torn-edge border-2 border-[#2B4789] z-20 -rotate-2 relative mt-16 md:mt-0 shadow-xl">
              <div className="flex justify-between border-b border-[#10B183] pb-2 mb-4">
                <span>EXPERIENCE.LOG</span>
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-error rounded-full"></span>
                  <span className="w-2 h-2 bg-[#E7DD6A] rounded-full"></span>
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                </span>
              </div>
              <div className="space-y-2 text-[10px] opacity-90 leading-relaxed">
                <p>&gt; LOADING CAREER_ASSETS...</p>
                <p>&gt; 4 NODES FOUND</p>
                <p>&gt; STYLES: NEO-BOTANICAL</p>
                <p>&gt; LOC: NOIDA / CHENNAI</p>
                <p className="animate-pulse">&gt; {dots}_</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="relative mt-20 pb-20">
          <div className="timeline-spine-new"></div>
          
          {/* Card 1 (Left) */}
          <div className="relative grid md:grid-cols-2 gap-8 mb-24 items-center">
            <div className="md:text-right md:pr-12 order-2 md:order-1 relative animate-left" style={{ animationDelay: '0.2s' }}>
              <div className="bg-[#FAFAFA] p-8 pixel-border-yellow relative group">
                <div className="connector-right hidden md:block"></div>
                <div className="corner-bracket cb-tl"></div>
                <div className="corner-bracket cb-tr"></div>
                <div className="corner-bracket cb-bl"></div>
                <div className="corner-bracket cb-br"></div>
                <div className="h-1 w-full bg-[#E36D9B] absolute top-0 left-0"></div>
                <div className="flex items-center gap-2 md:justify-end mb-4">
                  <span className="text-[#E36D9B] font-bold font-label-sm">01</span>
                  <span className="h-px w-8 bg-[#E36D9B]"></span>
                </div>
                <h3 className="font-headline-lg text-2xl mb-1 text-[#2B4789]">AI Engineering Intern</h3>
                <p className="font-nav-bold text-[#E36D9B] mb-4">Havish M Consultancy</p>
                <p className="font-body-m text-[#1a1c1c] text-sm mb-6 leading-relaxed">
                  "Designed ML-driven document intelligence platform for Landmark Group, transforming unstructured logistics data into actionable insights."
                </p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <span className="bg-[#2B4789] text-white px-3 py-1 text-xs font-bold border-2 border-[#E7DD6A]">-50% Processing Time</span>
                  <span className="bg-[#E36D9B] text-white px-3 py-1 text-xs font-bold border-2 border-[#E7DD6A]">+70% On-Time Delivery</span>
                </div>
              </div>
              <div className="absolute -z-10 font-label-sm text-[#E7DD6A] opacity-10 text-6xl bottom-0 right-0 transform translate-x-8 translate-y-8 pointer-events-none">
                NODE_01
              </div>
            </div>
            <div className="order-1 md:order-2 flex flex-col items-center md:items-start pl-8 md:pl-12 relative animate-right" style={{ animationDelay: '0.3s' }}>
              <div className="absolute left-[-28px] md:left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-[#2B4789] text-[#E7DD6A] flex items-center justify-center rounded-full border-4 border-[#E7DD6A] z-10 font-bold font-label-sm">25</div>
              <div className="font-label-sm text-[#2B4789] bg-[#E7DD6A] px-4 py-2 uppercase tracking-tighter">Jul - Dec 2025</div>
              <p className="font-label-sm text-[#E7DD6A] mt-2">नोएडा, Noida</p>
            </div>
          </div>
          
          {/* Card 2 (Right) */}
          <div className="relative grid md:grid-cols-2 gap-8 mb-24 items-center">
            <div className="flex flex-col items-center md:items-end pr-8 md:pr-12 relative animate-left" style={{ animationDelay: '0.4s' }}>
              <div className="absolute right-[-28px] md:right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-[#E7DD6A] text-[#2B4789] flex items-center justify-center rounded-full border-4 border-[#2B4789] z-10 font-bold font-label-sm">25</div>
              <div className="font-label-sm text-[#2B4789] bg-[#E7DD6A] px-4 py-2 uppercase tracking-tighter">Mar - Dec 2025</div>
              <p className="font-label-sm text-[#E7DD6A] mt-2">SRM IST, Incubated</p>
            </div>
            <div className="md:pl-12 relative animate-right" style={{ animationDelay: '0.5s' }}>
              <div className="bg-[#E7DD6A] p-8 pixel-border-yellow relative">
                <div className="connector-left hidden md:block"></div>
                <div className="corner-bracket cb-tl"></div>
                <div className="corner-bracket cb-tr"></div>
                <div className="corner-bracket cb-bl"></div>
                <div className="corner-bracket cb-br"></div>
                <div className="h-1 w-full bg-[#10B183] absolute top-0 left-0"></div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-8 bg-[#2B4789]"></span>
                  <span className="text-[#2B4789] font-bold font-label-sm">02</span>
                </div>
                <h3 className="font-headline-lg text-2xl mb-1 text-[#2B4789]">ML Engineer</h3>
                <p className="font-nav-bold text-[#10B183] mb-4">Raphsons Robotics Ltd</p>
                <p className="font-body-m text-[#2B4789] text-sm mb-6 leading-relaxed italic font-semibold">
                  "End-to-end data pipeline achieving 1000+ images/hour for robotic sorting systems. Leveraged heavy CV optimizations."
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white text-[#2B4789] px-3 py-1 text-xs font-bold border-2 border-[#2B4789]">1000+ img/hr</span>
                  <span className="bg-[#10B183] text-white px-3 py-1 text-xs font-bold border-2 border-[#2B4789]">+40% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 3 (Left) */}
          <div className="relative grid md:grid-cols-2 gap-8 mb-24 items-center">
            <div className="md:text-right md:pr-12 order-2 md:order-1 relative animate-left" style={{ animationDelay: '0.6s' }}>
              <div className="bg-[#E36D9B] p-8 pixel-border-yellow text-white relative">
                <div className="connector-right hidden md:block"></div>
                <div className="corner-bracket cb-tl"></div>
                <div className="corner-bracket cb-tr"></div>
                <div className="corner-bracket cb-bl"></div>
                <div className="corner-bracket cb-br"></div>
                <div className="h-1 w-full bg-[#E7DD6A] absolute top-0 left-0"></div>
                <div className="flex items-center gap-2 md:justify-end mb-4">
                  <span className="text-white font-bold font-label-sm">03</span>
                  <span className="h-px w-8 bg-white"></span>
                </div>
                <h3 className="font-headline-lg text-2xl mb-1">Backend / Design Intern</h3>
                <p className="font-nav-bold text-[#E7DD6A] mb-4">Aadi Art Marketplace</p>
                <p className="font-body-m text-lg mb-6 leading-relaxed">
                  Full-stack development for an indigenous art marketplace. Bridging the gap between tribal artisans and global collectors.
                </p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <span className="bg-[#2B4789] text-[#E7DD6A] px-3 py-1 text-xs font-bold border-2 border-[#E7DD6A]">MapLibre GL</span>
                  <span className="bg-white text-[#E36D9B] px-3 py-1 text-xs font-bold border-2 border-[#E7DD6A]">Django REST</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex flex-col items-center md:items-start pl-8 md:pl-12 relative animate-right" style={{ animationDelay: '0.7s' }}>
              <div className="absolute left-[-28px] md:left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-[#2B4789] text-[#E7DD6A] flex items-center justify-center rounded-full border-4 border-[#E7DD6A] z-10 font-bold font-label-sm">26</div>
              <div className="font-label-sm text-[#2B4789] bg-[#E7DD6A] px-4 py-2 uppercase tracking-tighter">Feb - Apr 2026</div>
              <p className="font-label-sm text-[#E7DD6A] mt-2">Marketplace Dev</p>
            </div>
          </div>
          
          {/* Card 4 (Right) */}
          <div className="relative grid md:grid-cols-2 gap-8 mb-24 items-center">
            <div className="flex flex-col items-center md:items-end pr-8 md:pr-12 relative animate-left" style={{ animationDelay: '0.8s' }}>
              <div className="absolute right-[-28px] md:right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-[#2B4789] text-[#E7DD6A] flex items-center justify-center rounded-full border-4 border-[#E7DD6A] z-10 font-bold font-label-sm">26</div>
              <div className="font-label-sm text-[#2B4789] bg-[#E7DD6A] px-4 py-2 uppercase tracking-tighter">Dec 2025 - Feb 2026</div>
              <p className="font-label-sm text-[#E7DD6A] mt-2">Bihar Incubated</p>
            </div>
            <div className="md:pl-12 relative animate-right" style={{ animationDelay: '0.9s' }}>
              <div className="bg-[#10B183] p-8 pixel-border-yellow relative">
                <div className="connector-left hidden md:block"></div>
                <div className="corner-bracket cb-tl"></div>
                <div className="corner-bracket cb-tr"></div>
                <div className="corner-bracket cb-bl"></div>
                <div className="corner-bracket cb-br"></div>
                <div className="h-1 w-full bg-[#E7DD6A] absolute top-0 left-0"></div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-8 bg-white"></span>
                  <span className="text-white font-bold font-label-sm">04</span>
                </div>
                <h3 className="font-headline-lg text-2xl mb-1 text-white">Backend Developer Intern</h3>
                <p className="font-nav-bold text-[#E7DD6A] mb-4">Sacred Gurukul</p>
                <p className="font-body-m text-white opacity-90 text-sm mb-6 leading-relaxed">
                  "Architecture of backend services for two live ed-tech products. Implementation of secure RBAC systems and scalable API endpoints."
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#2B4789] text-[#E7DD6A] px-3 py-1 text-xs font-bold border-2 border-[#E7DD6A]">2 Live Products</span>
                  <span className="bg-white text-[#10B183] px-3 py-1 text-xs font-bold border-2 border-[#E7DD6A]">RBAC Auth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Transparent Footer */}
      <footer className="bg-transparent border-t-2 border-[#E7DD6A] border-opacity-20 w-full px-8 py-4 gap-6 flex flex-col md:flex-row justify-between items-center relative z-20">
        <div className="font-nav-bold text-nav-bold text-[#E7DD6A]">GV_OS v1.0</div>
        <div className="font-label-sm text-[10px] text-[#E7DD6A] opacity-60 max-w-md text-center md:text-left">
          ©199X GEETIKA VASISTHA. ALL RIGHTS RESERVED. POWERED BY LO-FI BOTANICS.
        </div>
        <div className="flex gap-6">
          <a className="font-label-sm text-label-sm text-[#E7DD6A] opacity-80 hover:opacity-100 transition-colors cursor-crosshair" href="#">Archives</a>
          <a className="font-label-sm text-label-sm text-[#E7DD6A] opacity-80 hover:opacity-100 transition-colors cursor-crosshair" href="#">RSS</a>
          <a className="font-label-sm text-label-sm text-[#E7DD6A] opacity-80 hover:opacity-100 transition-colors cursor-crosshair" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
