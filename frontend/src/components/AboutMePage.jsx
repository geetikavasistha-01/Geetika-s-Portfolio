import React from 'react';

export default function AboutMePage() {
  return (
    <div id="about" className="page-wrapper font-sans relative overflow-hidden h-screen max-h-screen p-[12px] box-border flex items-center justify-center">
      {/* LEFT DECORATIONS */}
      <div className="deco-left absolute top-0 left-0 h-screen max-h-screen overflow-hidden pointer-events-none w-[calc((100vw-1100px)/2)]">
        <div style={{ position: 'absolute', bottom: 0, left: '-10px', fontSize: '120px', lineHeight: 1, transform: 'rotate(-8deg)', '--r': '-8deg', filter: 'drop-shadow(3px 3px 0px #2B4789)' }}>🌿</div>
        <div style={{ position: 'absolute', top: '28%', left: '8px', background: '#FAFAFA', border: '3px solid #2B4789', boxShadow: '4px 4px 0 #2B4789', borderRadius: '8px', padding: '8px 10px', transform: 'rotate(-4deg)', '--r': '-4deg', fontSize: '40px', lineHeight: 1 }}>🖥️</div>
        <div style={{ position: 'absolute', top: '12%', left: '4px', background: '#E7DD6A', border: '3px solid #2B4789', boxShadow: '4px 4px 0 #2B4789', borderRadius: '4px', padding: '10px 12px', transform: 'rotate(3deg)', '--r': '3deg', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '11px', fontWeight: 500, color: '#2B4789', maxWidth: '110px', lineHeight: 1.4 }}>retrain the model tonight 📌</div>
        <div style={{ position: 'absolute', bottom: '8%', left: '6px', fontSize: '56px', transform: 'rotate(5deg)', '--r': '5deg', filter: 'drop-shadow(2px 2px 0px #2B4789)' }}><div style={{ transform: 'scaleX(-1)' }}>🐱</div></div>
        <div style={{ position: 'absolute', top: '8%', left: '30%', color: '#E36D9B', fontSize: '24px', transform: 'rotate(15deg)', '--r': '15deg' }}>✦</div>
        <div style={{ position: 'absolute', top: '55%', left: '15%', color: '#E7DD6A', fontSize: '18px', transform: 'rotate(-10deg)', '--r': '-10deg' }}>★</div>
        <div style={{ position: 'absolute', top: '78%', left: '35%', color: '#A0CB75', fontSize: '20px' }}>✷</div>
        <div style={{ position: 'absolute', top: '42%', left: '2px', fontSize: '52px', transform: 'rotate(-6deg)', '--r': '-6deg', filter: 'drop-shadow(3px 3px 0 #2B4789)' }}>🤖</div>
        <div style={{ position: 'absolute', bottom: '16%', left: '0px', background: '#E36D9B', border: '3px solid #2B4789', boxShadow: '4px 4px 0 #2B4789', borderRadius: '4px', padding: '8px 12px', transform: 'rotate(2deg)', '--r': '2deg', fontFamily: "'Space Mono', monospace", fontSize: '9px', fontWeight: 700, color: '#FAFAFA', maxWidth: '100px' }}>push to GitHub before sleep</div>
        <div style={{ position: 'absolute', bottom: '2%', left: '18%', fontSize: '48px', filter: 'drop-shadow(2px 2px 0 #2B4789)' }}>🌵</div>
      </div>

      {/* RIGHT DECORATIONS */}
      <div className="deco-right absolute top-0 right-0 h-screen max-h-screen overflow-hidden pointer-events-none w-[calc((100vw-1100px)/2)]">
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '110px', transform: 'rotate(20deg)', '--r': '20deg', filter: 'drop-shadow(3px 3px 0 #2B4789)' }}>🌴</div>
        <div style={{ position: 'absolute', top: '10%', right: '4px', background: '#10B183', border: '3px solid #2B4789', boxShadow: '4px 4px 0 #2B4789', borderRadius: '999px', padding: '8px 14px', transform: 'rotate(-3deg)', '--r': '-3deg', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 800, fontSize: '10px', color: '#FAFAFA', whiteSpace: 'nowrap' }}>OPEN TO WORK ✓</div>
        <div style={{ position: 'absolute', top: '30%', right: '0px', fontSize: '90px', transform: 'rotate(6deg)', '--r': '6deg', filter: 'drop-shadow(3px 3px 0 #2B4789)' }}>🪴</div>
        <div style={{ position: 'absolute', top: '48%', right: '6px', background: '#E7DD6A', border: '3px solid #2B4789', boxShadow: '4px 4px 0 #2B4789', borderRadius: '4px', padding: '10px 12px', transform: 'rotate(-2deg)', '--r': '-2deg', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '11px', fontWeight: 500, color: '#2B4789', maxWidth: '110px', lineHeight: 1.4 }}>ethical AI &gt; fast AI 🌱</div>
        <div style={{ position: 'absolute', bottom: '25%', right: '8px', fontSize: '60px', transform: 'rotate(-5deg)', '--r': '-5deg', filter: 'drop-shadow(2px 2px 0 #2B4789)' }}>🐈</div>
        <div style={{ position: 'absolute', bottom: '40%', right: '2px', background: '#2B4789', border: '3px solid #E7DD6A', boxShadow: '4px 4px 0 #E7DD6A', borderRadius: '4px', padding: '8px 10px', transform: 'rotate(4deg)', '--r': '4deg', fontSize: '36px' }}>💾</div>
        <div style={{ position: 'absolute', top: '18%', right: '25%', color: '#E36D9B', fontSize: '22px', transform: 'rotate(-12deg)', '--r': '-12deg' }}>✦</div>
        <div style={{ position: 'absolute', top: '65%', right: '20%', color: '#E7DD6A', fontSize: '16px' }}>★</div>
        <div style={{ position: 'absolute', top: '82%', right: '30%', color: '#A0CB75', fontSize: '20px', transform: 'rotate(8deg)', '--r': '8deg' }}>✷</div>
        <div style={{ position: 'absolute', top: '22%', right: '4px', background: '#E36D9B', border: '3px solid #2B4789', boxShadow: '4px 4px 0 #2B4789', borderRadius: '8px', padding: '8px 12px', transform: 'rotate(2deg)', '--r': '2deg', fontFamily: "'Space Mono', monospace", fontSize: '10px', fontWeight: 700, color: '#FAFAFA', textAlign: 'center' }}>GPA<br/>8.3/10 ⭐</div>
        <div style={{ position: 'absolute', bottom: '8%', right: '10%', fontSize: '44px', filter: 'drop-shadow(2px 2px 0 #2B4789)' }}>🍄</div>
        <div style={{ position: 'absolute', bottom: '10%', right: '30%', fontSize: '36px', transform: 'rotate(-8deg)', '--r': '-8deg' }}>🌸</div>
      </div>

      {/* Halftone dot background */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #2B4789 1px, transparent 1px)',
          backgroundSize: '14px 14px', 
          opacity: 0.04 
        }} 
      />

      <div className="browser-card relative border-[6px] border-[#2B4789] rounded-[32px] bg-[#FAFAFA] shadow-[6px_6px_0px_#2B4789] w-full max-w-[1100px] h-[calc(100vh-24px)] max-h-[calc(100vh-24px)] flex flex-col overflow-hidden">
        {/* Browser Bar */}
        <div className="browser-bar bg-[#2B4789] border-b-[5px] border-[#2B4789] flex items-center justify-between h-[40px] px-[14px] flex-shrink-0">
          <div className="flex items-center gap-4 text-[#FAFAFA] text-2xl font-black">
            <span className="cursor-pointer">←</span>
            <span className="cursor-pointer">→</span>
            <span className="cursor-pointer">⟳</span>
          </div>

          <div className="bg-[#FAFAFA] border-[4px] border-[#2B4789] rounded-full px-6 py-2 text-[#2B4789] font-bold font-['Space_Mono'] tracking-wide text-sm w-[45%] text-center shadow-md">
            geetika.dev/about-me
          </div>

          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-[#E36D9B] border-2 border-[#2B4789]" />
            <div className="w-4 h-4 rounded-full bg-[#E7DD6A] border-2 border-[#2B4789]" />
            <div className="w-4 h-4 rounded-full bg-[#A0CB75] border-2 border-[#2B4789]" />
          </div>
        </div>

        <div className="content-grid grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-[12px] p-[12px] flex-1 min-h-0 overflow-hidden relative z-10">
          {/* Floating Doodles */}
          <div className="absolute left-12 top-20 text-[#E36D9B] text-6xl rotate-12 select-none pointer-events-none">✦</div>
          <div className="absolute right-20 top-16 text-[#A0CB75] text-5xl -rotate-6 select-none pointer-events-none">✷</div>
          <div className="absolute left-1/4 bottom-12 text-[#E7DD6A] text-5xl rotate-3 select-none pointer-events-none">★</div>
          <div className="absolute right-1/4 bottom-20 text-[#10B183] text-4xl -rotate-12 select-none pointer-events-none">◈</div>

          {/* LEFT SIDE */}
          <div className="left-column z-10 flex flex-col gap-[8px] justify-between h-full min-h-0 overflow-hidden">
            <Card title="GEETIKA IS A:">
              <ul className="about-list text-[#2B4789] font-normal font-['Be_Vietnam_Pro'] space-y-[1px]">
                <li className="text-[10px] leading-[1.4] py-[1px]">✦ AI Engineer — building intelligent systems</li>
                <li className="text-[10px] leading-[1.4] py-[1px]">✦ Data Scientist — turning noise into signal</li>
                <li className="text-[10px] leading-[1.4] py-[1px]">✦ Climate-Tech Builder — code for the planet</li>
                <li className="text-[10px] leading-[1.4] py-[1px]">✦ Creative Technologist — zines + code</li>
                <li className="text-[10px] leading-[1.4] py-[1px]">✦ Hackathon Winner — IIT Delhi · GFG · SIH</li>
              </ul>
            </Card>

            <Card title="LIKES">
              <div className="flex flex-wrap gap-2 text-sm font-normal text-[#2B4789] font-['Be_Vietnam_Pro']">
                {[
                  'Machine Learning', 'Climate Tech', 'Agentic Systems',
                  'Ethical AI', 'Hackathons', 'Distributed Systems',
                  'Indie Zines', 'Lofi Music', 'Monstera Plants',
                  '2am Builds', 'Open Source', 'Anime'
                ].map((item) => (
                  <span
                    key={item}
                    className="like-tag bg-[#E7DD6A] border-2 border-[#2B4789] rounded-full shadow-sm font-['Be_Vietnam_Pro'] font-medium px-[8px] py-[2px] text-[9px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <Card title="SKILL STATS">
              <div className="space-y-4">
                <SkillBar label="PYTHON" value="95%" color="bg-[#10B183]" />
                <SkillBar label="ML / AI" value="88%" color="bg-[#E36D9B]" />
                <SkillBar label="SYSTEM DESIGN" value="82%" color="bg-[#A0CB75]" />
                <SkillBar label="CREATIVITY" value="100%" color="bg-[#E7DD6A]" />
                <SkillBar label="COFFEE DEPENDENCY" value="60%" color="bg-[#2B4789]" />
              </div>
            </Card>
          </div>

          {/* CENTER ILLUSTRATION */}
          <div className="center-column relative overflow-hidden flex flex-col items-center justify-end p-0 m-0 h-full min-h-0 z-20">
            <img
              src="/illustration - about page Background Removed.png"
              alt="Geetika working with braids, data science laptop and climate tote bag"
              className="h-full w-auto max-w-none object-contain object-bottom block m-0 p-0 pointer-events-none drop-shadow-[0_25px_25px_rgba(43,71,137,0.4)] relative z-10"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="right-column z-10 flex flex-col gap-[8px] justify-between h-full min-h-0 overflow-hidden">
            <Card title="CURRENT FOCUS">
              <div className="space-y-3 text-[#2B4789] font-normal text-[15px] leading-relaxed font-['Be_Vietnam_Pro']">
                <div className="bg-[#A0CB75]/30 border-2 border-[#2B4789] px-[10px] py-[6px] text-[11px] mb-[4px] rounded-[8px]">
                  Building Agentic AI Systems
                </div>
                <div className="bg-[#E36D9B]/20 border-2 border-[#2B4789] px-[10px] py-[6px] text-[11px] mb-[4px] rounded-[8px]">
                  Safe Superintelligence Research
                </div>
                <div className="bg-[#10B183]/20 border-2 border-[#2B4789] px-[10px] py-[6px] text-[11px] mb-[4px] rounded-[8px]">
                  Climate-Tech Data Pipelines
                </div>
              </div>
            </Card>

            <Card title="PERSONALITY TRAITS">
              <div className="grid grid-cols-2 gap-[6px] text-sm font-medium text-[#2B4789] font-['Bricolage_Grotesque']">
                {[
                  'Relentlessly Curious', 'Builds First', 'Chaotic Good',
                  'Systems Thinker', 'Plant Mom', 'Fast Prototyper'
                ].map((trait) => (
                  <div
                    key={trait}
                    className="bg-[#FAFAFA] border-2 border-[#2B4789] px-[8px] py-[6px] text-[10px] rounded-[8px] text-center"
                  >
                    {trait}
                  </div>
                ))}
              </div>
            </Card>

            <Card title="CONTACT.EXE">
              <div className="space-y-[4px] text-[#2B4789] font-normal text-sm font-['Be_Vietnam_Pro']">
                <div className="bg-[#FAFAFA] border-2 border-[#2B4789] px-[8px] py-[5px] text-[10px] mb-[4px] rounded-[8px]">
                  ✉ geetikavasistha13@gmail.com
                </div>
                <div className="bg-[#FAFAFA] border-2 border-[#2B4789] px-[8px] py-[5px] text-[10px] mb-[4px] rounded-[8px]">
                  ⌘ github.com/geetikavasistha-01
                </div>
                <div className="bg-[#FAFAFA] border-2 border-[#2B4789] px-[8px] py-[5px] text-[10px] mb-[4px] rounded-[8px]">
                  ◈ linkedin.com/in/geetikavasisthampy
                </div>
                <div className="bg-[#FAFAFA] border-2 border-[#2B4789] px-[8px] py-[5px] text-[10px] mb-[4px] rounded-[8px] font-semibold">
                  ♫ currently: deploying models @ 2am
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Moral Alignment Footer Strip */}
        <div className="moral-footer font-['Space_Mono'] flex items-center justify-center border-t-[3px] border-[#2B4789] text-[10px] tracking-[0.05em] h-[30px] flex-shrink-0 text-[#2B4789] font-bold">
          MORAL ALIGNMENT: <span className="text-[#10B183] ml-1">CHAOTIC GOOD ✓</span>
        </div>
      </div>
    </div>
  );
}

function FloatingSticker({ children, className }) {
  return (
    <div
      className={`absolute bg-[#FAFAFA] border-[3px] border-[#2B4789] rounded-2xl px-4 py-2 text-[#2B4789] font-black shadow-[4px_4px_0px_#2B4789] z-30 ${className}`}
    >
      {children}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="card bg-[#FAFAFA] border-[4px] border-[#2B4789] shadow-[6px_6px_0px_#2B4789] rotate-[-1deg] hover:rotate-0 transition-all duration-300 px-[12px] py-[10px] flex-shrink-0 rounded-[16px]">
      <div className="flex items-center justify-between mb-[6px]">
        <h2 
          className="text-[#2B4789] font-bold uppercase font-['Space_Mono'] text-[11px]"
        >
          {title}
        </h2>
        <div className="flex gap-2">
          <div className="w-[10px] h-[10px] rounded-full bg-[#E36D9B] border border-[#2B4789]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#E7DD6A] border border-[#2B4789]" />
        </div>
      </div>
      {children}
    </div>
  );
}

function SkillBar({ label, value, color }) {
  return (
    <div className="mb-[6px] skill-row">
      <div className="flex justify-between mb-[2px] text-[#2B4789] font-bold font-['Space_Mono'] skill-label text-[9px]">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full h-[10px] bg-[#E7DD6A] border-2 border-[#2B4789] rounded-full overflow-hidden skill-bar">
        <div
          className={`${color} h-full rounded-full border-r-2 border-[#2B4789]`}
          style={{ width: value }}
        />
      </div>
    </div>
  );
}
