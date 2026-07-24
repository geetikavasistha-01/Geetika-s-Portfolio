import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { WorkExperience, Education } from '../types';
import { FileText, ArrowUpRight } from 'lucide-react';

const defaultExperiences: WorkExperience[] = [
  {
    company: 'Aadi Art',
    role: 'Backend & API Intern',
    type: 'intern',
    location: 'Delhi NCR',
    locationType: 'hybrid',
    startDate: '2026-02-01T00:00:00.000Z',
    endDate: '2026-04-30T00:00:00.000Z',
    bullets: [
      'Designed data models and REST APIs (Django REST Framework, MongoDB) for a full-stack marketplace in a 4-member Agile team, delivering features against business requirements under launch deadlines.'
    ],
    techStack: ['Django REST Framework', 'MongoDB', 'Python'],
    order: 1
  },
  {
    company: 'Sacred Gurukul',
    role: 'Backend Developer Intern',
    type: 'intern',
    location: 'Delhi NCR',
    locationType: 'hybrid',
    startDate: '2025-12-01T00:00:00.000Z',
    endDate: '2026-02-28T00:00:00.000Z',
    bullets: [
      'Built and deployed REST APIs (TypeScript, Node.js) for two production applications, maintaining version control and deployment hygiene.'
    ],
    techStack: ['TypeScript', 'Node.js'],
    order: 2
  },
  {
    company: 'Havish M Consultancy',
    role: 'AI Engineering Intern – Backend & Observability',
    type: 'intern',
    location: 'Noida',
    locationType: 'onsite',
    startDate: '2025-07-01T00:00:00.000Z',
    endDate: '2025-12-31T00:00:00.000Z',
    bullets: [
      'Built LLM-powered document intelligence pipelines and KPI dashboards, translating business requirements into interpretable, data-driven solutions for stakeholders.',
      'Instrumented monitoring and logging for Python-based services, improving model and pipeline observability and contributing to a 70% improvement in on-time delivery.'
    ],
    techStack: ['Python', 'LLM', 'Observability tooling'],
    order: 3
  },
  {
    company: 'Raphsons Robotics Ltd',
    role: 'Machine Learning Engineer – Data & AI Pipelines',
    type: 'intern',
    location: 'Ghaziabad',
    locationType: 'onsite',
    startDate: '2025-03-01T00:00:00.000Z',
    endDate: '2026-06-30T00:00:00.000Z',
    bullets: [
      'Designed and debugged anomaly-detection ML models using Scikit-learn, applying statistical analysis to identify root causes and improve model accuracy by 40% in production.',
      'Automated an end-to-end SQL (PostgreSQL) and Pandas data pipeline, reducing runtime by 25%, and documented model architecture and evaluation methodology for scalability and stakeholder review.'
    ],
    techStack: ['Scikit-learn', 'PostgreSQL', 'Pandas', 'Python'],
    order: 4
  }
];

const defaultEducation: Education[] = [
  {
    institution: 'SRM Institute of Science and Technology',
    degree: 'B.Tech. Computer Science',
    field: 'Data Science',
    location: 'Delhi NCR',
    startYear: 2021,
    endYear: 2025,
    gpa: '8.5 / 10',
    order: 1
  }
];

const entryVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20
    }
  }
};

export default function Work() {
  const { data: experiences } = useQuery<WorkExperience[]>({
    queryKey: ['work-experiences'],
    queryFn: async () => {
      try {
        const res = await api.get('/work');
        // Sort by order ASC to make sure reverse chronological is respected
        return res.data.sort((a: WorkExperience, b: WorkExperience) => a.order - b.order);
      } catch {
        return defaultExperiences;
      }
    },
    initialData: defaultExperiences
  });

  const { data: education } = useQuery<Education[]>({
    queryKey: ['education'],
    queryFn: async () => {
      try {
        const res = await api.get('/education');
        return res.data;
      } catch {
        return defaultEducation;
      }
    },
    initialData: defaultEducation
  });

  const formatDateRange = (start: string, end: string | null) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const startDate = new Date(start);
    const startStr = `${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
    
    if (!end) return `${startStr} — PRESENT`;
    const endDate = new Date(end);
    return `${startStr} — ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>WORK</span>
          <span>since 2025</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          Things I've done.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          Distributed systems, AI agents, and backend pipelines.
          Roles listed in order of recency.
        </p>

        {/* Links row */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
          {/* TODO: replace with real resume PDF URL once uploaded */}
          <a
            href="https://cloudinary.com" // Cloudinary resume link placeholder
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-text3 hover:text-text1 transition-colors"
          >
            <FileText size={12} /> RESUME <ArrowUpRight size={10} />
          </a>

          <a
            href="https://github.com/geetikavasistha-01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-text3 hover:text-text1 transition-colors"
          >
            GITHUB <ArrowUpRight size={10} />
          </a>

          {/* PLACEHOLDER: Need real Hashnode URL from Geetika */}
          <a
            href="https://hashnode.com/@geetikavasistha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-text3 hover:text-text1 transition-colors"
          >
            HASHNODE <ArrowUpRight size={10} />
          </a>

          {/* PLACEHOLDER: Need real Medium URL from Geetika */}
          <a
            href="https://medium.com/@geetikavasistha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-text3 hover:text-text1 transition-colors"
          >
            MEDIUM <ArrowUpRight size={10} />
          </a>
        </div>
      </div>

      {/* Experience Section */}
      <SectionHeader label="experience" />
      <div className="relative border-l border-border/80 ml-4 md:ml-0 md:border-l-0 mt-8 mb-16">
        {/* Desktop Vertical Line */}
        <div className="hidden md:block absolute left-[150px] top-0 bottom-0 w-[1px] bg-border/80" />

        <div className="flex flex-col gap-14">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={entryVariants}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-[150px_1fr] md:gap-10 group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] md:-left-[159px] md:translate-x-[150px] top-1.5 md:top-2 w-[18px] h-[18px] rounded-full bg-zinc-900 border-2 border-border dark:bg-zinc-900 flex items-center justify-center z-10 transition-colors group-hover:border-text2 duration-300">
                <div className="w-2 h-2 rounded-full bg-[#34908B] group-hover:scale-125 transition-transform duration-300" />
              </div>

              {/* Left Column: Date Range / Metadata (Visible on desktop) */}
              <div className="hidden md:flex flex-col pr-6 text-right pt-1 select-none">
                <span className="text-[10px] tracking-[0.18em] font-mono text-text3 font-semibold uppercase leading-normal">
                  {formatDateRange(exp.startDate, exp.endDate)}
                </span>
                <span className="text-[9px] text-text4 font-mono uppercase mt-1">
                  {exp.location} · {exp.locationType}
                </span>
              </div>

              {/* Right Column (or full-width on mobile): Content */}
              <div className="flex flex-col">
                {/* Mobile Meta (hidden on desktop) */}
                <div className="md:hidden flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] tracking-[0.18em] font-mono text-text3 uppercase mb-2">
                  <span>{formatDateRange(exp.startDate, exp.endDate)}</span>
                  <span>·</span>
                  <span>{exp.location} ({exp.locationType})</span>
                </div>

                {/* Role / Job Title & Company Name */}
                <div className="flex flex-col gap-1 mb-2">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-text1 leading-snug">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-semibold text-text2 italic">
                    {exp.company}
                  </span>
                </div>

                {/* Bullet points */}
                <ul className="flex flex-col gap-3 my-4">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-sm text-text2 leading-relaxed items-start">
                      <svg className="w-2.5 h-2.5 text-text3 mt-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border rounded-full px-3 py-0.5 text-[9px] font-mono tracking-wider text-text3 bg-transparent uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <SectionHeader label="education" />
      <div className="flex flex-col gap-10 mt-8">
        {education.map((edu, idx) => (
          <div key={edu._id || idx} className="flex flex-col w-full">
            {/* Education meta */}
            <div className="text-[10px] tracking-[0.18em] font-mono text-text3 uppercase mb-3 flex items-center justify-between">
              <span>{edu.startYear} — {edu.endYear} · {edu.location}</span>
              {edu.gpa && (
                <span className="text-amber font-semibold">
                  [{edu.gpa}]
                </span>
              )}
            </div>

            {/* Institution */}
            <h3 className="font-display italic text-2xl sm:text-3xl text-text1 leading-snug">
              {edu.institution}
            </h3>

            {/* Degree details */}
            <p className="text-xs sm:text-sm text-text2 mt-1.5 leading-relaxed">
              {edu.degree} ({edu.field}).
            </p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
