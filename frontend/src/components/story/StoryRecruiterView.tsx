import React from 'react';
import { ArrowUpRight, ExternalLink, Calendar, MapPin, Mail, Briefcase, FolderGit2, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import renge from '../../assets/renge.png';

export default function StoryRecruiterView() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10 select-text">
      {/* 1. Recruiter Header */}
      <div className="w-full bg-surface/90 dark:bg-surface/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-surface2 bg-surface shadow-md flex-shrink-0">
            <img src={renge} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-text1 font-serif">
                Geetika Vasistha
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold">
                Available for Roles
              </span>
            </div>
            <p className="text-xs sm:text-sm text-accent font-mono mt-0.5 font-medium">
              AI Engineer · Distributed Systems & Backend Developer
            </p>
            <p className="text-xs text-text3 mt-1 font-body">
              Autonomous Agent Orchestration · Low-Latency Infrastructure · PyTorch · Rust · TypeScript
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.geetikavasistha@gmail.com&su=Interview%20Inquiry%20%E2%80%94%20Geetika%20Vasistha"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-accent text-bg hover:opacity-90 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
          >
            <Mail size={13} />
            <span>Hire Me</span>
          </a>

          <a
            href="https://github.com/geetikavasistha-01"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-surface2/60 hover:bg-surface2 text-text1 border border-border/50 transition-all"
            title="GitHub Profile"
          >
            <FaGithub size={15} />
          </a>
        </div>
      </div>

      {/* 2. Core Skills Matrix */}
      <div className="w-full bg-surface/90 dark:bg-surface/95 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-border/40">
        <h2 className="text-sm font-mono uppercase tracking-widest text-text3 font-bold mb-4">
          Core Technical Capabilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-body">
          <div className="p-3.5 rounded-2xl bg-surface2/25 border border-border/30">
            <span className="font-bold text-text1 block mb-1">AI & Machine Learning</span>
            <span className="text-text3 leading-relaxed">Agentic Workflows, Tool-Calling, LLM Fine-Tuning, PyTorch, Scikit-learn, Vector DBs</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface2/25 border border-border/30">
            <span className="font-bold text-text1 block mb-1">Backend & Systems</span>
            <span className="text-text3 leading-relaxed">Rust, Python, FastAPI, Django REST, TypeScript, Node.js, Redis, Docker, PostgreSQL</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface2/25 border border-border/30">
            <span className="font-bold text-text1 block mb-1">Architectural Patterns</span>
            <span className="text-text3 leading-relaxed">Distributed Rate Limiting, Event Streaming, CI/CD Automation, Privacy-First Architecture</span>
          </div>
        </div>
      </div>

      {/* 3. Featured Projects with Metrics */}
      <div className="w-full bg-surface/90 dark:bg-surface/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-border/40">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-bold font-serif text-text1 flex items-center gap-2">
            <FolderGit2 size={16} className="text-accent" /> Featured Projects
          </h2>
          <Link to="/projects" className="text-xs font-mono text-accent hover:underline">
            View all projects &rarr;
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <div className="p-4 rounded-2xl bg-surface2/20 border border-border/40 flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-bold text-text1">Plume — Satellite Air Quality Timeseries AI</h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">0.975 Pearson r · 5x Speedup</span>
            </div>
            <p className="text-xs text-text2 leading-relaxed">
              Designed satellite timeseries forecasting pipeline for PM2.5 air pollution and wildfire hotspot detection using PyTorch and FastAPI.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a href="https://github.com/geetikavasistha-01/Plume" target="_blank" rel="noopener noreferrer" className="text-xs text-text3 hover:text-accent font-mono flex items-center gap-1">
                <FaGithub size={12} /> GitHub Repository
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface2/20 border border-border/40 flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-bold text-text1">Distributed Rate Limiter in Rust</h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">&gt;100k req/sec · &lt;1.2ms p99</span>
            </div>
            <p className="text-xs text-text2 leading-relaxed">
              High-throughput distributed token bucket rate limiter built in Rust with Redis integration for low-latency API traffic throttling.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a href="https://github.com/geetikavasistha-01/Distributed-Rate-Limiter" target="_blank" rel="noopener noreferrer" className="text-xs text-text3 hover:text-accent font-mono flex items-center gap-1">
                <FaGithub size={12} /> GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Experience Timeline */}
      <div className="w-full bg-surface/90 dark:bg-surface/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-border/40">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-bold font-serif text-text1 flex items-center gap-2">
            <Briefcase size={16} className="text-accent" /> Professional Experience
          </h2>
          <Link to="/work" className="text-xs font-mono text-accent hover:underline">
            View full work history &rarr;
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border-l-2 border-accent/40 pl-4 py-1">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-text1">Aadi Art · Backend & API Intern</span>
              <span className="text-xs font-mono text-text3">Feb 2026 - Apr 2026</span>
            </div>
            <p className="text-xs text-text2 mt-1">
              Engineered Django REST Framework APIs and optimized MongoDB query performance in an Agile workflow.
            </p>
          </div>

          <div className="border-l-2 border-accent/40 pl-4 py-1">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-text1">Sacred Gurukul · Backend Developer Intern</span>
              <span className="text-xs font-mono text-text3">Dec 2025 - Feb 2026</span>
            </div>
            <p className="text-xs text-text2 mt-1">
              Constructed modular REST services with Node.js and TypeScript, introducing automated testing.
            </p>
          </div>

          <div className="border-l-2 border-accent/40 pl-4 py-1">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-text1">Havish M Consultancy · AI Engineering Intern</span>
              <span className="text-xs font-mono text-text3">Jul 2025 - Dec 2025</span>
            </div>
            <p className="text-xs text-text2 mt-1">
              Developed LLM document intelligence pipelines and Python telemetry observability dashboards.
            </p>
          </div>

          <div className="border-l-2 border-accent/40 pl-4 py-1">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-text1">Raphsons Robotics · ML Engineer Intern</span>
              <span className="text-xs font-mono text-text3">Mar 2025 - Jun 2026</span>
            </div>
            <p className="text-xs text-text2 mt-1">
              Improved anomaly-detection model accuracy by 40% and accelerated SQL/Pandas pipeline runtime by 25%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
