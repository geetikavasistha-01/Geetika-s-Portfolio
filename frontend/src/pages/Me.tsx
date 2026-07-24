import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeading from '../components/me/SectionHeading';
import ContributionGraph from '../components/me/ContributionGraph';
import ExperienceSection from '../components/me/ExperienceSection';
import ProjectsGrid from '../components/me/ProjectsGrid';
import BlogList from '../components/me/BlogList';
import { useUIStore } from '../store/uiStore';
import renge from '../assets/renge.png';
import { 
  Sun, Moon, Calendar, Mail, ArrowUpRight, Terminal, Cpu 
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function Me() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <PageWrapper>
      {/* SECTION 1 — PROFILE HEADER */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#111318] border border-border/30 shadow-sm mb-16 select-none">
        
        {/* Cover Banner */}
        <div className="h-44 sm:h-64 w-full bg-gradient-to-r from-cyan-950 via-zinc-900 to-indigo-950 relative border-b border-border/10">
          <div className="absolute top-4 right-4 z-30">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-border/60 hover:border-[#38bdf8] text-text3 hover:text-text1 transition-colors bg-black/40 backdrop-blur-sm focus:outline-none"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col items-start">
          
          {/* Circular-Square Avatar (Overlapping) */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-[#111318] overflow-hidden shadow-lg -mt-12 sm:-mt-16 bg-zinc-900 flex items-center justify-center relative z-20">
            <img src={renge} alt="Avatar" className="w-full h-full object-cover" />
          </div>

          {/* Name & Handle row */}
          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-text1 leading-tight not-italic">
              Geetika Vasistha
            </h1>
            <span className="text-xs sm:text-sm text-text3 font-body">
              @geekykunoichi
            </span>
          </div>

          {/* Role/Tagline */}
          <span className="text-xs sm:text-sm text-[#38bdf8] font-body font-semibold mt-1">
            Backend & API Architect · AI Observability Engineer
          </span>

          {/* Bio */}
          <p className="mt-3 text-xs sm:text-sm text-text2 font-body max-w-xl leading-relaxed select-text">
            Designing highly optimized database queries, telemetry pipelines, and LLM orchestration layers. 
            Focused on distributed caching, API scale, and clean codebase architectures.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.geetikavasistha@gmail.com&su=Let's%20Talk%20%E2%80%94%20Saw%20your%20developer%20profile!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-[#38bdf8] text-zinc-950 font-body font-bold text-xs shadow-sm hover:shadow-md hover:bg-[#38bdf8]/85 transition-all select-none"
            >
              <Calendar size={12} />
              <span>Let's talk</span>
            </a>
            <a
              href="mailto:contact.geetikavasistha@gmail.com"
              className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full border border-border/60 hover:border-text2 text-text2 hover:text-text1 font-body font-bold text-xs transition-colors select-none"
            >
              <Mail size={12} />
              <span>Drop a mail</span>
            </a>
          </div>

          {/* Find Me On The Internet */}
          <div className="mt-6 w-full">
            <span className="text-[9px] font-mono tracking-widest text-text4 uppercase block mb-3">
              Find me on the internet
            </span>
            <div className="flex flex-wrap gap-2 items-center">
              <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/40 border border-border/30 hover:border-text3 text-text3 hover:text-text1 text-[10px] font-body transition-colors">
                <FaGithub size={12} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/geetikavasistha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/40 border border-border/30 hover:border-text3 text-text3 hover:text-text1 text-[10px] font-body transition-colors">
                <FaLinkedin size={12} />
                <span>LinkedIn</span>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/40 border border-border/30 hover:border-text3 text-text3 hover:text-text1 text-[10px] font-body transition-colors">
                <FaXTwitter size={12} />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Toolkit */}
          <div className="mt-6 w-full">
            <span className="text-[9px] font-mono tracking-widest text-text4 uppercase block mb-3">
              My everyday toolkit
            </span>
            <div className="flex flex-wrap gap-2 items-center">
              {['Rust', 'TypeScript', 'Python', 'Django', 'FastAPI', 'React', 'MongoDB', 'Docker'].map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800/40 border border-border/30 text-text2 text-[10px] font-body">
                  <Terminal size={10} className="text-[#38bdf8]" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Row */}
      <div className="mb-16">
        <ContributionGraph />
      </div>

      {/* SECTION 2 — WHERE I'VE WORKED */}
      <section className="mb-16">
        <SectionHeading title="Where I've worked" />
        <ExperienceSection />
      </section>

      {/* SECTION 3 — THINGS I'VE BUILT */}
      <section className="mb-16">
        <SectionHeading title="Things I've built" />
        <ProjectsGrid />
      </section>

      {/* SECTION 4 — THOUGHTS & WRITING */}
      <section className="mb-16">
        <SectionHeading title="Thoughts & Writing" />
        <BlogList />
      </section>

      {/* SECTION 5 — CLOSING / OUTRO */}
      <section className="w-full py-16 flex flex-col items-center text-center border-t border-border/30 select-none">
        <p className="font-editorial text-lg sm:text-xl italic text-text1 leading-relaxed max-w-md">
          "curiosity drives purpose"
        </p>
        <span className="mt-6 text-[9px] font-mono tracking-widest text-text4 uppercase block">
          EXPLORE THE FULL EXPERIENCE
        </span>
        <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
          <Link
            to="/work"
            className="inline-flex items-center justify-center px-6 py-2 border border-border/60 hover:border-text2 text-text3 hover:text-text1 text-xs font-body font-bold rounded-full bg-transparent transition-colors shadow-sm"
          >
            Full Portfolio &rarr;
          </Link>
          <Link
            to="/human"
            className="inline-flex items-center justify-center px-6 py-2 border border-[#38bdf8]/60 hover:border-[#38bdf8] text-[#38bdf8] hover:text-[#38bdf8]/85 text-xs font-body font-bold rounded-full bg-transparent transition-colors shadow-sm hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]"
          >
            Personal Side &rarr;
          </Link>
        </div>
        <span className="mt-10 text-[10px] text-text4 font-body">
          crafted with curiosity — <span className="text-[#38bdf8] font-semibold">@geekykunoichi</span>
        </span>
      </section>
    </PageWrapper>
  );
}
