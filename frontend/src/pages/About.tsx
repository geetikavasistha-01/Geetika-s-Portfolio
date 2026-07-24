import { 
  FaPython, FaDocker, FaReact, FaGitAlt 
} from 'react-icons/fa6';
import { 
  SiScikitlearn, SiHuggingface, SiFastapi, SiSqlite, 
  SiMongodb, SiRedis, SiGithubactions, SiGooglecloud, 
  SiVercel, SiTypescript, SiTailwindcss, SiHtmx 
} from 'react-icons/si';
import { 
  BookOpen, Brain, Database, Cpu, Terminal 
} from 'lucide-react';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroup {
  label: string;
  skills: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    label: 'ML & DATA SCIENCE',
    skills: [
      { name: 'Python', icon: <FaPython size={12} className="text-[#34908B]" /> },
      { name: 'scikit-learn', icon: <SiScikitlearn size={12} className="text-[#34908B]" /> },
      { name: 'XGBoost', icon: <Cpu size={12} className="text-[#34908B]" /> },
      { name: 'LSTM', icon: <Brain size={12} className="text-[#34908B]" /> },
      { name: 'LangChain', icon: <Terminal size={12} className="text-[#34908B]" /> },
      { name: 'HuggingFace', icon: <SiHuggingface size={12} className="text-[#34908B]" /> },
      { name: 'BERT', icon: <Brain size={12} className="text-[#34908B]" /> }
    ]
  },
  {
    label: 'DATA ENGINEERING',
    skills: [
      { name: 'FastAPI', icon: <SiFastapi size={12} className="text-[#34908B]" /> },
      { name: 'Pandas', icon: <Database size={12} className="text-[#34908B]" /> },
      { name: 'NumPy', icon: <Database size={12} className="text-[#34908B]" /> },
      { name: 'Streamlit', icon: <Cpu size={12} className="text-[#34908B]" /> },
      { name: 'SQLite', icon: <SiSqlite size={12} className="text-[#34908B]" /> },
      { name: 'MongoDB', icon: <SiMongodb size={12} className="text-[#34908B]" /> },
      { name: 'Redis', icon: <SiRedis size={12} className="text-[#34908B]" /> }
    ]
  },
  {
    label: 'INFRASTRUCTURE',
    skills: [
      { name: 'Docker', icon: <FaDocker size={12} className="text-[#34908B]" /> },
      { name: 'Git', icon: <FaGitAlt size={12} className="text-[#34908B]" /> },
      { name: 'GitHub Actions', icon: <SiGithubactions size={12} className="text-[#34908B]" /> },
      { name: 'GCP', icon: <SiGooglecloud size={12} className="text-[#34908B]" /> },
      { name: 'Vercel', icon: <SiVercel size={12} className="text-[#34908B]" /> },
      { name: 'Railway', icon: <Terminal size={12} className="text-[#34908B]" /> }
    ]
  },
  {
    label: 'FRONTEND',
    skills: [
      { name: 'React', icon: <FaReact size={12} className="text-[#34908B]" /> },
      { name: 'TypeScript', icon: <SiTypescript size={12} className="text-[#34908B]" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={12} className="text-[#34908B]" /> },
      { name: 'HTMX', icon: <SiHtmx size={12} className="text-[#34908B]" /> },
      { name: 'Jinja2', icon: <Terminal size={12} className="text-[#34908B]" /> }
    ]
  },
  {
    label: 'RESEARCH & WRITING',
    skills: [
      { name: 'Technical blogs', icon: <BookOpen size={12} className="text-[#34908B]" /> },
      { name: 'Memoir writing', icon: <BookOpen size={12} className="text-[#34908B]" /> },
      { name: 'Research papers (ICMCE 2026)', icon: <BookOpen size={12} className="text-[#34908B]" /> }
    ]
  }
];

const philosophyCards = [
  {
    title: 'Precision over speed',
    description: 'Build things that work under pressure. Fast prototypes are cheap, stable systems are premium.'
  },
  {
    title: 'Data tells stories',
    description: 'Every model is a hypothesis about the world. Filter out the noise to capture the real signal.'
  },
  {
    title: 'Ship, then refine',
    description: 'Iteration beats waiting for perfection. Get it in front of users, monitor logs, and optimize.'
  },
  {
    title: 'Write to understand',
    description: 'If you cannot explain it to an anonymous questioner, you do not fully understand it yet.'
  }
];

export default function About() {
  const { theme } = useUIStore();
  const currentAvatar = theme === 'dark' ? kunoichiDark : kunoichi;

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>ABOUT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-normal text-text1 mt-2">
          About Me
        </h1>
        <p className="text-sm text-text3 mt-2">
          The journey, the tools, and the philosophy behind what I build.
        </p>
      </div>

      {/* Two-Column Bio Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 mt-4">
        
        {/* Left Column (Sticky info cards) */}
        <div className="flex flex-col items-center md:items-start md:sticky md:top-24 self-start gap-4">
          <div className="w-[180px] h-[180px] rounded-xl overflow-hidden border border-border bg-surface shadow-sm flex items-center justify-center">
            <img
              src={currentAvatar}
              alt="Geetika Vasistha"
              className="w-full h-full object-contain p-4"
            />
          </div>
          
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xs text-text3 font-mono">
              geekykunoichi / Geetika
            </span>
            <span className="text-[11px] italic text-text4 mt-1 leading-normal max-w-[180px]">
              engineering intelligence, one model at a time
            </span>
            <span className="text-[10px] text-text4 mt-1">
              Delhi NCR, India
            </span>
            <div className="font-script text-3xl text-teal/90 mt-4 select-none rotate-[-4deg] self-center md:self-start">
              Geetika
            </div>
          </div>
        </div>

        {/* Right Column (Content panels) */}
        <div className="flex flex-col gap-10">
          
          {/* Journey Section */}
          <section className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-editorial font-normal text-text1 mb-4">
              My Journey
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-text2 leading-relaxed font-body">
              <p>
                My journey into tech began at <LinkPreview url="https://www.srmist.edu.in" previewName="SRM Institute">SRM Institute of Science and Technology</LinkPreview>, specializing in Data Science.
                Early on, I realized I loved building tangible systems, which led to co-founding <LinkPreview url="https://github.com/geetikavasistha-01" previewName="Raphson Robotics">Raphsons Robotics</LinkPreview>,
                an incubator project where I wrote on-device ML scripts for quadruped robots.
              </p>
              <p>
                From robotics, I transitioned into high-performance web engineering and ML pipelines, doing internships at Havish M Consultancy where I designed document intelligence frameworks, and building data pipelines for <LinkPreview url="https://sentinels.copernicus.eu" previewName="Sentinel Satellites">Sentinel satellite</LinkPreview> telemetry.
              </p>
              <p>
                Besides building, I write technical memoirs and keep a micro-log diary of bugs, insights, and late-night compilation files.
              </p>
            </div>
          </section>

          {/* Skill Constellation Section */}
          <section className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-editorial font-normal text-text1 mb-4">
              Skill Graph
            </h2>
            <SkillConstellation />
          </section>

          {/* Stack & Style Section */}
          <section className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-editorial font-normal text-text1 mb-4">
              Stack & Style
            </h2>
            <div className="flex flex-col gap-6">
              {skillGroups.map((group) => (
                <div key={group.label} className="flex flex-col border-b border-border/40 pb-4">
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-text3 mb-3 uppercase font-mono">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span 
                        key={skill.name} 
                        className="inline-flex items-center gap-1.5 bg-surface2/40 text-text2 border border-border/40 rounded-full px-3 py-1 text-xs select-none hover:bg-surface2 transition-colors duration-200"
                      >
                        {skill.icon}
                        <span className="font-body">{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="flex flex-col mb-4">
            <h2 className="text-xl sm:text-2xl font-editorial font-normal text-text1 mb-4">
              Philosophy
            </h2>
            <p className="text-sm sm:text-base text-text2 leading-relaxed mb-6">
              Engineering is not just writing code — it is organizing systems to resolve human ambiguities. These core anchors guide my building decisions:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {philosophyCards.map((card) => (
                <div key={card.title} className="bg-surface border border-border rounded-xl p-5 select-none">
                  <h3 className="text-xs sm:text-sm font-semibold text-text1 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text3 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
}
