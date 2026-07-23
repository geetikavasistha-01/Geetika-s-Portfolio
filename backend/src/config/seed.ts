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
        gpa: '8.3 / 10.0',
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
        question: "How do you think about ethical AI versus speed of deployment in climate projects?",
        askedBy: 'ANONYMOUS',
        answer: "In climate tech, correctness is safety. A model predicting emissions or air quality indexes that hallucinates can mislead policy. Perfect is the enemy of raw velocity, but robust cross-validation isn't a speed bump — it's the foundation. Deploy rapidly, but benchmark relentlessly.",
        pinned: true,
        answered: true,
        date: new Date()
      },
      {
        question: "What's the story behind co-founding Raphson Robotics?",
        askedBy: 'ANONYMOUS',
        answer: "Raphson grew out of SRM Incubator labs. We wanted to build rugged quadrupeds for hazardous pipeline checking. My role was designing low-latency CV models that run on-device. It taught me systems optimization under resource constraints.",
        pinned: true,
        answered: true,
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Seeded AMAs');

    // 8. Seed Shelf
    await ShelfItem.create([
      {
        title: 'Sousou no Frieren',
        type: 'anime',
        label: 'EPISODE 28 · ON LOOP',
        caption: 'Quiet melancholy and beautiful pacing.',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&h=450&q=80',
        order: 1
      },
      {
        title: 'The Gita & Krishnamurti',
        type: 'book',
        label: 'READING · CH 12',
        caption: 'Dialogue on action without attachment.',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=450&q=80',
        order: 2
      },
      {
        title: 'Cyberpunk Edgerunners OST',
        type: 'music',
        label: 'SPOTIFY ROTATION',
        caption: 'Melodic synths and raw emotional drive.',
        image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&h=450&q=80',
        order: 3
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
