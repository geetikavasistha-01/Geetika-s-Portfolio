import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Admin } from '../models/Admin';
import { WorkExperience } from '../models/WorkExperience';
import { Education } from '../models/Education';
import { Project } from '../models/Project';
import { SideExperiment } from '../models/SideExperiment';
import { BlogPost } from '../models/BlogPost';
import { Log } from '../models/Log';
import { AMAEntry } from '../models/AMAEntry';
import { ShelfItem } from '../models/ShelfItem';
import { Video } from '../models/Video';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collections
    await Admin.deleteMany({});
    await WorkExperience.deleteMany({});
    await Education.deleteMany({});
    await Project.deleteMany({});
    await SideExperiment.deleteMany({});
    await BlogPost.deleteMany({});
    await Log.deleteMany({});
    await AMAEntry.deleteMany({});
    await ShelfItem.deleteMany({});
    await Video.deleteMany({});
    console.log('Cleared existing data.');

    // 1. Seed Admin
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin', salt);
    await Admin.create({
      username: 'admin',
      passwordHash
    });
    console.log('Seeded Admin (admin/admin)');

    // 2. Seed WorkExperience
    await WorkExperience.create([
      {
        company: 'Aadi Art',
        role: 'Backend & API Intern',
        type: 'intern',
        location: 'Delhi NCR',
        locationType: 'hybrid',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-04-30'),
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
        startDate: new Date('2025-12-01'),
        endDate: new Date('2026-02-28'),
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
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-12-31'),
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
        startDate: new Date('2025-03-01'),
        endDate: new Date('2026-06-30'),
        bullets: [
          'Designed and debugged anomaly-detection ML models using Scikit-learn, applying statistical analysis to identify root causes and improve model accuracy by 40% in production.',
          'Automated an end-to-end SQL (PostgreSQL) and Pandas data pipeline, reducing runtime by 25%, and documented model architecture and evaluation methodology for scalability and stakeholder review.'
        ],
        techStack: ['Scikit-learn', 'PostgreSQL', 'Pandas', 'Python'],
        order: 4
      }
    ]);
    console.log('Seeded Work Experiences');

    // 3. Seed Education
    await Education.create([
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
    ]);
    console.log('Seeded Education logs');

    // 4. Seed Projects
    await Project.create([
      {
        slug: 'plume',
        title: 'Plume',
        subtitle: 'Satellite timeseries air quality prediction & hotspot detection.',
        year: 2025,
        language: 'Python',
        status: 'live',
        tags: ['ML / AI', 'DATA ENGINEERING', 'RESEARCH'],
        description: 'Built a CNN-LSTM model on satellite time series data (Sentinel-5P, INSAT-3D, ERA5) to predict air quality and detect pollution hotspots across India. Sped up the Google Earth Engine ingestion pipeline 5x and containerized with a scheduled pre-caching service for production.',
        statsHighlight: 'MAE 6.44 · 5x ingestion speedup with scheduled GEE pre-caching',
        stats: [
          { label: 'Prediction accuracy', value: '0.975 Pearson r' },
          { label: 'Loss Metrics', value: '6.44 MAE' },
          { label: 'Ingestion Speedup', value: '5x throughput' }
        ],
        longDescription: '## Overview\nPlume is a satellite timeseries air quality prediction and hotspot detection pipeline. It uses satellite observations to trace gas distributions across Indian regions.',
        githubUrl: 'https://github.com/geetikavasistha-01/Plume',
        liveUrl: '',
        featured: true,
        isFeatured: true,
        order: 1,
        featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=450&q=80'
      },
      {
        slug: 'teachers-mate',
        title: "Teachers' Mate",
        subtitle: 'Role-based assignment organization & automated grading analytics.',
        year: 2024,
        language: 'TypeScript',
        status: 'live',
        tags: ['FULL STACK', 'DATABASE'],
        description: 'Built a full-stack platform with a React frontend and Node.js/Express REST API backend, including role-based access control and usage analytics. Streamlines assignment distribution and automated evaluation metrics for educators.',
        statsHighlight: 'Role-based workflows with 70% improvement in task completion rate',
        stats: [
          { label: 'Evaluation Overhead', value: '-50% manual extraction time' },
          { label: 'Active Workflows', value: '70% on-time task completion' }
        ],
        longDescription: '## Overview\nTeachers-Mate is a full-stack platform built with React, Node.js, Express, and MongoDB, delivering role-based workflows for assignment distribution and analytics.',
        githubUrl: 'https://github.com/geetikavasistha-01/teachers-mate',
        liveUrl: '',
        featured: true,
        isFeatured: true,
        order: 2,
        featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=450&q=80'
      },
      {
        slug: 'isotherm',
        title: 'Isotherm',
        subtitle: 'Urban heat island detection & physics-informed cooling intervention.',
        year: 2025,
        language: 'Python',
        status: 'live',
        tags: ['ML / AI', 'RESEARCH', 'FULL STACK'],
        description: 'Built a physics-informed PyTorch CNN-LSTM pipeline constrained by Surface Energy Balance loss to predict Land Surface Temperature within 2.0°C RMSE. Shipped a cooling-intervention recommender via a PERN-stack web app with a FastAPI model-serving layer.',
        statsHighlight: 'Physics-informed CNN-LSTM constrained by Surface Energy Balance loss',
        stats: [
          { label: 'Temperature prediction', value: '2.0°C RMSE' },
          { label: 'Model serving latency', value: '<85ms inference' }
        ],
        longDescription: '## Overview\nIsotherm is a physics-informed Land Surface Temperature prediction model and recommender platform built for detecting and mitigating urban heat islands.',
        githubUrl: 'https://github.com/geetikavasistha-01/isotherm',
        liveUrl: '',
        featured: true,
        isFeatured: true,
        order: 3,
        featuredImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&h=450&q=80'
      },
      {
        slug: 'tokenlens',
        title: 'TokenLens',
        year: 2025,
        language: 'Python',
        status: 'wip',
        tags: ['ML / AI', 'DATA ENGINEERING'],
        description: 'A token intelligence SaaS platform for LLM usage tracking and forecasting.',
        stats: [],
        longDescription: '## Overview\nTokenLens is a distributed token usage SaaS platform designed for high-throughput AI environments.',
        githubUrl: 'https://github.com/geetikavasistha-01/tokenlens',
        liveUrl: 'https://tokenlens.dev',
        isMoreWork: true,
        order: 4
      },
      {
        slug: 'isro-sentinel-pipeline',
        title: 'ISRO Sentinel AQI Pipeline',
        year: 2025,
        language: 'Python',
        status: 'live',
        tags: ['ML / AI', 'DATA ENGINEERING', 'RESEARCH'],
        description: 'CNN-LSTM satellite pipeline digesting Sentinel-5P/TROPOMI datasets for real-time HCHO/NO2 mapping.',
        stats: [],
        longDescription: '## Overview\nThis satellite pipeline was designed for the ISRO AQI/HCHO spatial tracking competition.',
        githubUrl: 'https://github.com/geetikavasistha-01',
        liveUrl: 'https://isro.gov.in',
        isMoreWork: true,
        order: 5
      },
      {
        slug: 'ethicaltwin-governance',
        title: 'EthicalTwin Research',
        year: 2025,
        language: 'Python',
        status: 'live',
        tags: ['ML / AI', 'RESEARCH'],
        description: 'XGBoost dual-agent AI governance framework to audit model decision parameters against compliance templates.',
        stats: [],
        longDescription: '## Overview\nEthicalTwin is a dual-agent framework designed to monitor decision drifts in production models.',
        githubUrl: 'https://github.com/geetikavasistha-01',
        liveUrl: '',
        isMoreWork: true,
        order: 6
      },
      {
        slug: 'distributed-rate-limiter',
        title: 'DistributedRateLimiter',
        year: 2025,
        language: 'Go',
        status: 'live',
        tags: ['DATA ENGINEERING'],
        description: 'Four algorithms, Prometheus monitoring, Nginx reverse proxy load balancer integration.',
        stats: [],
        longDescription: '## Overview\nHigh performance rate limiting in Go.',
        githubUrl: 'https://github.com/geetikavasistha-01',
        isMoreWork: true,
        order: 7
      },
      {
        slug: 'geekykunoichi-blog',
        title: 'GeekyKunoichi Blog',
        year: 2025,
        language: 'Python',
        status: 'live',
        tags: ['FULL STACK'],
        description: 'FastAPI driven markdown portfolio blog engine with SSR and SQLite cache layers.',
        stats: [],
        longDescription: '## Overview\nMy custom blogging engine.',
        githubUrl: 'https://github.com/geetikavasistha-01',
        isMoreWork: true,
        order: 8
      }
    ]);
    console.log('Seeded Projects');

    // 5. Seed SideExperiments
    await SideExperiment.create([
      {
        repoName: 'raphson-quadruped',
        description: 'Locomotion gait controllers implementing forward kinematics and trot sequence loops.',
        githubUrl: 'https://github.com/geetikavasistha-01',
        order: 1
      },
      {
        repoName: 'tokenlens-sdk',
        description: 'Python client wrapper supporting request hooks, JWT tokens, and background async buffers.',
        githubUrl: 'https://github.com/geetikavasistha-01',
        order: 2
      },
      {
        repoName: 'lstm-forecaster',
        description: 'Standalone LSTM sequences model helper optimized for spatial air quality datasets.',
        githubUrl: 'https://github.com/geetikavasistha-01',
        order: 3
      }
    ]);
    console.log('Seeded Side Experiments');

    // 6. Seed Logs
    await Log.create([
      {
        content: "Training sequence models at 2am. The LSTM network shows stable loss convergence. Climate AQI datasets have massive noise but clean spatial signals.",
        accentColor: 'amber',
        date: new Date(),
        published: true
      },
      {
        content: "Refactoring the robot locomotion scripts. Thread-safe IPC pipelines are harder than they look. OpenCV pipeline runs smoothly now.",
        accentColor: 'teal',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        published: true
      },
      {
        content: "Writing is a lot like modeling. You start with unstructured thoughts, filter the noise, test hypotheses, and output narrative.",
        accentColor: 'rose',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        published: true
      }
    ]);
    console.log('Seeded Logs');

    // 7. Seed AMAs
    await AMAEntry.create([
      {
        question: "do you actually enjoy working on climate tech, or is it just another way to get funding?",
        askedBy: 'ANONYMOUS',
        answer: "Honestly? A bit of both, but mostly because the engineering problems are incredibly real. In climate tech, if your ML model hallucinated a 10% reduction in emissions, that is not a minor bug — it translates to actual policy failure and wasted resources. It's high-stakes, which keeps the work engaging.",
        pinned: true,
        answered: true,
        date: new Date()
      },
      {
        question: "why robots though? that seems like such a random pivot from pure data science.",
        askedBy: 'ANONYMOUS',
        answer: "It was totally organic. We started in the SRM Incubator labs wanting to solve a very dirty, hazardous problem: pipeline inspection. Pure software is nice, but when you have to write low-latency computer vision that runs on an embedded chip on a physical, vibrating robot claw, the constraints force you to be a much better system designer.",
        pinned: true,
        answered: true,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        question: "do you actually enjoy the AI hype or are you just along for the ride?",
        askedBy: 'ANONYMOUS',
        answer: "The hype is exhausting, to be real. Sorting through a hundred wrapper startups isn't fun. But the core engineering — compiling models to run efficiently on small devices, building deterministic pipelines out of probabilistic LLMs — that stuff is a blast. I ignore the hype cycle and focus on the systems side.",
        pinned: true,
        answered: true,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        question: "how many hours of sleep did you get while building this portfolio?",
        askedBy: 'ANONYMOUS',
        answer: "Let's just say my Last.fm activity logs are the only things keeping regular hours. Between tweaking custom shaders, writing Go rate limiters, and finding the perfect vintage postcards aesthetic, sleep was definitely secondary. Worth it, though.",
        pinned: true,
        answered: true,
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        question: "what is the most overrated tool in the modern data stack?",
        askedBy: 'ANONYMOUS',
        answer: "Heavyweight orchestrators for simple scripts. I've seen teams spin up complex Kubernetes structures for tasks that could literally be a cron job and a clean Python script. Keep it simple until it actually breaks.",
        pinned: true,
        answered: true,
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Seeded AMAs');

    // 8. Seed Shelf
    await ShelfItem.create([
      {
        title: 'Designing Machine Learning Systems',
        type: 'book',
        order: 1,
        author: 'HUYEN',
        color: 'bg-teal-800 text-teal-100 border-teal-700',
        height: 'h-[190px]',
        authors: 'Chip Huyen',
        metadata: 'O\'Reilly Media · 2022',
        tags: ['Data Science', 'Machine Learning', 'Systems Design'],
        explanation: 'An excellent overview of the end-to-end engineering of ML production pipelines, from training data generation to monitoring.',
        amazonUrl: 'https://www.amazon.com/s?k=Designing+Machine+Learning+Systems+Chip+Huyen',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Designing+Machine+Learning+Systems+Chip+Huyen',
        rackCategory: 'Data Science & AI'
      },
      {
        title: 'Hands-On Machine Learning',
        type: 'book',
        order: 2,
        author: 'GERON',
        color: 'bg-emerald-900 text-emerald-100 border-emerald-800',
        height: 'h-[195px]',
        authors: 'Aurélien Géron',
        metadata: 'O\'Reilly Media · 2019',
        tags: ['Machine Learning', 'TensorFlow', 'Scikit-Learn'],
        explanation: 'A hands-on guide to building intelligent systems using Python\'s core ML libraries and deep learning architectures.',
        amazonUrl: 'https://www.amazon.com/s?k=Hands-On+Machine+Learning+Aurelien+Geron',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Hands-On+Machine+Learning+Aurelien+Geron',
        rackCategory: 'Data Science & AI'
      },
      {
        title: 'Generative Agents: Interactive Simulacra',
        type: 'paper',
        order: 3,
        publisher: 'STANFORD',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Joon Sung Park, Joseph C. O\'Hanlon, Carrie J. Cai, et al.',
        metadata: 'Stanford & Google · 2023',
        tags: ['Agentic AI', 'Generative Agents', 'Human Behavior'],
        explanation: 'A landmark paper demonstrating how LLM agents can interact dynamically and maintain believable social behaviors in sandbox environments.',
        arxivUrl: 'https://arxiv.org/abs/2304.03442',
        rackCategory: 'Data Science & AI'
      },
      {
        title: 'ReAct: Synergizing Reasoning & Acting',
        type: 'paper',
        order: 4,
        publisher: 'GOOGLE',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Shunyu Yao, Jeffrey Zhao, Dian Yu, et al.',
        metadata: 'Google Research · 2023',
        tags: ['Agentic AI', 'Reasoning', 'LLM Agents'],
        explanation: 'Introduces the ReAct framework, demonstrating how combining reasoning loops with tool-use action execution boosts model capabilities.',
        arxivUrl: 'https://arxiv.org/abs/2210.03629',
        rackCategory: 'Data Science & AI'
      },
      {
        title: 'Constitutional AI: A Feedback Approach',
        type: 'paper',
        order: 5,
        publisher: 'ANTHROPIC',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Yuntao Bai, Saurav Kadavath, Sandipan Kundu, et al.',
        metadata: 'Anthropic · 2022',
        tags: ['LLM Alignment', 'AI Safety', 'Anthropic'],
        explanation: 'Introduces Constitutional AI, training language models to align with written guidelines without human feedback overhead.',
        arxivUrl: 'https://arxiv.org/abs/2212.08073',
        rackCategory: 'Data Science & AI'
      },
      {
        title: 'Scaling Laws for Neural Language Models',
        type: 'paper',
        order: 6,
        publisher: 'ANTHROPIC',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Jared Kaplan, Sam McCandlish, Tom Henighan, et al.',
        metadata: 'Anthropic · 2020',
        tags: ['LLM Research', 'Scaling Laws', 'Anthropic'],
        explanation: 'Identifies clean power-law scaling relationships between parameter count, compute budgets, and dataset sizes.',
        arxivUrl: 'https://arxiv.org/abs/2001.08361',
        rackCategory: 'Data Science & AI'
      },
      {
        title: 'Claude 3 Model Card & Architecture',
        type: 'paper',
        order: 7,
        publisher: 'ANTHROPIC',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Anthropic Research Team',
        metadata: 'Anthropic · 2024',
        tags: ['Claude 3', 'Model Card', 'Anthropic'],
        explanation: 'Details the capabilities, safety features, and training benchmarks of the Claude 3 model family.',
        paperUrl: 'https://www-files.anthropic.com/production/images/Model-Card-Claude-3.pdf',
        rackCategory: 'Data Science & AI'
      },
      {
        title: 'DDIA',
        type: 'book',
        order: 8,
        author: 'KLEPPMANN',
        color: 'bg-[#1e40af] text-blue-100 border-blue-800',
        height: 'h-[195px]',
        authors: 'Martin Kleppmann',
        metadata: 'O\'Reilly Media · 2017',
        tags: ['Distributed Systems', 'Databases', 'System Design'],
        explanation: 'The gold standard textbook for understanding the trade-offs of modern data-intensive systems.',
        amazonUrl: 'https://www.amazon.com/s?k=Designing+Data-Intensive+Applications+Martin+Kleppmann',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Designing+Data-Intensive+Applications+Martin+Kleppmann',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'Database Internals',
        type: 'book',
        order: 9,
        author: 'PETROV',
        color: 'bg-[#0f172a] text-slate-200 border-slate-900',
        height: 'h-[185px]',
        authors: 'Alex Petrov',
        metadata: 'O\'Reilly Media · 2019',
        tags: ['Storage Engines', 'B-Trees', 'Distributed Systems'],
        explanation: 'An in-depth look at storage engines, data layouts, and consensus protocols in modern databases.',
        amazonUrl: 'https://www.amazon.com/s?k=Database+Internals+Alex+Petrov',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Database+Internals+Alex+Petrov',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'Operating Systems: Three Easy Pieces',
        type: 'book',
        order: 10,
        author: 'ARPACI-DUSSEAU',
        color: 'bg-[#581c87] text-purple-100 border-purple-950',
        height: 'h-[195px]',
        authors: 'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau',
        metadata: 'Arpaci-Dusseau Books · 2018',
        tags: ['Operating Systems', 'Virtualization', 'Concurrency', 'Persistence'],
        explanation: 'An outstanding textbook introducing virtualization, concurrency, and persistence in operating systems.',
        amazonUrl: 'https://www.amazon.com/s?k=Operating+Systems+Three+Easy+Pieces+Arpaci-Dusseau',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Operating+Systems+Three+Easy+Pieces+Arpaci-Dusseau',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'Site Reliability Engineering',
        type: 'book',
        order: 11,
        author: 'BETS/MUGUEL',
        color: 'bg-[#065f46] text-emerald-100 border-emerald-900',
        height: 'h-[192px]',
        authors: 'Niall Richard Murphy, Betsy Beyer, Chris Jones, Jennifer Petoff',
        metadata: 'O\'Reilly Media · 2016',
        tags: ['DevOps', 'SRE', 'Reliability'],
        explanation: 'Google\'s definitive guide to building, scaling, and monitoring resilient production systems.',
        amazonUrl: 'https://www.amazon.com/s?k=Site+Reliability+Engineering+Betsy+Beyer',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Site+Reliability+Engineering+Betsy+Beyer',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'Security Engineering',
        type: 'book',
        order: 12,
        author: 'ANDERSON',
        color: 'bg-[#854d0e] text-amber-100 border-amber-900',
        height: 'h-[194px]',
        authors: 'Ross Anderson',
        metadata: 'Wiley · 2020',
        tags: ['Security', 'Cryptography', 'Systems Design'],
        explanation: 'The classic text on building systems that remain secure despite active malice and hardware/software failure.',
        amazonUrl: 'https://www.amazon.com/s?k=Security+Engineering+Ross+Anderson',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Security+Engineering+Ross+Anderson',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'The Web Application Hacker\'s Handbook',
        type: 'book',
        order: 13,
        author: 'PINTO/STUTTARD',
        color: 'bg-[#991b1b] text-rose-100 border-rose-900',
        height: 'h-[190px]',
        authors: 'Dafydd Stuttard, Marcus Pinto',
        metadata: 'Wiley · 2011',
        tags: ['Security', 'Web Security', 'AppSec'],
        explanation: 'The definitive guide to finding and exploiting security flaws within web applications.',
        amazonUrl: 'https://www.amazon.com/s?k=The+Web+Application+Hacker%27s+Handbook+Stuttard',
        goodreadsUrl: 'https://www.goodreads.com/search?q=The+Web+Application+Hacker%27s+Handbook+Stuttard',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'Practical Cloud Native Security',
        type: 'book',
        order: 14,
        author: 'CLAUSSEN',
        color: 'bg-[#1e3a8a] text-sky-100 border-blue-900',
        height: 'h-[188px]',
        authors: 'Courtney Claussen',
        metadata: 'O\'Reilly Media · 2023',
        tags: ['DevOps', 'Cloud Security', 'Kubernetes'],
        explanation: 'A hands-on engineering guide to securing microservices, container networks, and Kubernetes clusters.',
        amazonUrl: 'https://www.amazon.com/s?k=Practical+Cloud+Native+Security+Courtney+Claussen',
        goodreadsUrl: 'https://www.goodreads.com/search?q=Practical+Cloud+Native+Security+Courtney+Claussen',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'The Google File System',
        type: 'paper',
        order: 15,
        publisher: 'GOOGLE',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Sanjay Ghemawat, Howard Gobioff, Shun-Tak Leung',
        metadata: 'Google Research · 2003',
        tags: ['Distributed Systems', 'Storage', 'Google Infra'],
        explanation: 'Describes the design of GFS, a highly-fault-tolerant distributed file system built on commodity hardware.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'Dynamo: Amazon\'s Highly Availab...',
        type: 'paper',
        order: 16,
        publisher: 'AMAZON/COOP',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'Giuseppe DeCandia, Madan Jampani, et al.',
        metadata: 'Amazon · 2007',
        tags: ['Distributed Systems', 'Key-Value', 'NoSQL'],
        explanation: 'Pioneered the masterless Dynamo ring architecture, using consistent hashing for eventual consistency.',
        paperUrl: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
        rackCategory: 'Systems, Security & DevOps'
      },
      {
        title: 'Spanner: Google\'s Globally-Dist...',
        type: 'paper',
        order: 17,
        publisher: 'GOOGLE',
        color: 'bg-surface border-border text-text2',
        height: 'h-[175px]',
        isPaper: true,
        authors: 'James C. Corbett, Jeffrey Dean, et al.',
        metadata: 'Google Research · 2012',
        tags: ['Distributed Systems', 'NewSQL', 'Consensus'],
        explanation: 'Google\'s global transaction database using TrueTime (GPS & Atomic Clocks) for external consistency.',
        paperUrl: 'https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi12.pdf',
        rackCategory: 'Systems, Security & DevOps'
      }
    ]);
    console.log('Seeded Shelf items');

    // 9. Seed Videos
    await Video.create([
      {
        title: 'Locomotion Gaits for Quadrupeds',
        description: 'Locomotion control testing using Bezier curves and trot gaits for quadruped robots in our SRM labs.',
        category: 'ROBOTICS',
        thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=150&h=100&q=80',
        youtubeUrl: 'https://youtube.com',
        order: 1
      },
      {
        title: 'Sentinel-5P Ingestion Pipeline Walkthrough',
        description: 'Quick walkthrough showing how we ingest and spatial-bin sentinel NetCDF4 files in real-time.',
        category: 'DATA SCIENCE',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&h=100&q=80',
        youtubeUrl: 'https://youtube.com',
        order: 2
      }
    ]);
    console.log('Seeded Videos');

    // 10. Seed BlogPost
    await BlogPost.create([
      {
        slug: 'understanding-attention-mechanisms',
        title: 'Attention Is All You Need (To Understand)',
        excerpt: 'A deep, mathematical deep-dive into self-attention matrices and sequence-to-sequence weights without the corporate hype.',
        content: `## Introduction\nSelf-attention is the core engine driving transformers...`,
        tags: ['ML', 'TRANSFORMERS'],
        category: 'RESEARCH',
        published: true,
        featured: true,
        readTime: 8
      }
    ]);
    console.log('Seeded BlogPost');

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
