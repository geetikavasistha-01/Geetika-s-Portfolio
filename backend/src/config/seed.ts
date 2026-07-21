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
        company: 'Havish M Consultancy',
        role: 'AI Engineering Intern',
        type: 'intern',
        location: 'Remote',
        locationType: 'remote',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2025-03-31'),
        bullets: [
          'Designed ML-driven document intelligence platform for Landmark Group, transforming unstructured logistics data into structured entries.',
          'Configured semantic search systems using LangChain and GPT-4, decreasing manual processing overhead by 50%.',
          'Built fast backend API gateways with FastAPI and React to visualize pipeline throughput metrics in real-time.'
        ],
        techStack: ['Python', 'LangChain', 'FastAPI', 'GPT-4', 'React', 'MongoDB'],
        order: 1
      },
      {
        company: 'Raphsons Robotics Ltd',
        role: 'ML Engineer (Co-Founder)',
        type: 'co-founder',
        location: 'Delhi NCR',
        locationType: 'onsite',
        startDate: new Date('2024-01-01'),
        endDate: null,
        bullets: [
          'Engineered core computer vision navigation models for quadruped robotics, facilitating pipeline inspection tasks.',
          'Created low-latency image ingestion pipeline handling 1000+ frames per hour under strict power limits.',
          'Developed telemetry models with OpenCV and TensorFlow to track joints stability during walking cycles.'
        ],
        techStack: ['Python', 'ROS', 'OpenCV', 'TensorFlow', 'C++'],
        order: 2
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
        slug: 'tokenlens',
        title: 'TokenLens',
        year: 2025,
        language: 'Python',
        status: 'wip',
        tags: ['ML / AI', 'DATA ENGINEERING'],
        description: 'A token intelligence SaaS platform for LLM usage tracking and forecasting.',
        stats: [
          { label: 'Latency', value: '<45ms overhead' },
          { label: 'Forecasting Accuracy', value: '94% MAPE (LSTM)' },
          { label: 'Throughput', value: '10M tokens/day' }
        ],
        longDescription: `## Overview
TokenLens is a distributed token usage SaaS platform designed for high-throughput AI environments. It tracks precise consumption counts across multiple model API calls, caches identical requests, and predicts scaling thresholds.

## Approach & Architecture
We built an asynchronous proxy in FastAPI that intercepts prompt chunks, decodes them via fast tiktoken bindings, and pushes token statistics to a Redis time-series database.
- **LSTM Predictor:** A background service trains on historical usage and forecasts scaling bottlenecks.
- **Billing Sync:** Integrated with Stripe to trigger tier changes automatically.`,
        githubUrl: 'https://github.com/geetikavasistha-01/tokenlens',
        liveUrl: 'https://tokenlens.dev',
        featured: true,
        isFeatured: true,
        order: 1,
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=360&q=80'
      },
      {
        slug: 'isro-sentinel-pipeline',
        title: 'ISRO Sentinel AQI Pipeline',
        year: 2025,
        language: 'Python',
        status: 'live',
        tags: ['ML / AI', 'DATA ENGINEERING', 'RESEARCH'],
        description: 'CNN-LSTM satellite pipeline digesting Sentinel-5P/TROPOMI datasets for real-time HCHO/NO2 mapping.',
        stats: [
          { label: 'Resolution', value: '3.5km x 5.5km' },
          { label: 'Data ingestion speed', value: '450MB/sec' },
          { label: 'Prediction MSE', value: '0.0024' }
        ],
        longDescription: `## Overview
This satellite pipeline was designed for the ISRO AQI/HCHO spatial tracking competition. It digests massive NetCDF4 datasets from Sentinel-5P and trains deep learning estimators to track ozone precursors.

## Architecture
- **Ingestion Grid:** Spatial-bins coordinates into uniform grids using Python's xarray.
- **Deep Model:** Spatio-temporal CNN-LSTM modeling the mixing ratios of HCHO.`,
        githubUrl: 'https://github.com/geetikavasistha-01',
        liveUrl: 'https://isro.gov.in',
        featured: true,
        isFeatured: true,
        order: 2,
        featuredImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=360&q=80'
      },
      {
        slug: 'ethicaltwin-governance',
        title: 'EthicalTwin Research',
        year: 2025,
        language: 'Python',
        status: 'live',
        tags: ['ML / AI', 'RESEARCH'],
        description: 'XGBoost dual-agent AI governance framework to audit model decision parameters against compliance templates.',
        stats: [
          { label: 'Compliance Audit Rate', value: '150 runs/sec' },
          { label: 'Governance Drift Detection', value: '98.5% sensitivity' }
        ],
        longDescription: `## Overview
EthicalTwin is a dual-agent framework designed to monitor decision drifts in production models. It audits feature importance indices dynamically, logging drifts that violate pre-defined corporate guidelines.`,
        githubUrl: 'https://github.com/geetikavasistha-01',
        liveUrl: '',
        featured: true,
        isFeatured: true,
        order: 3,
        featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&h=360&q=80'
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
        longDescription: `## Overview\nHigh performance rate limiting in Go.`,
        githubUrl: 'https://github.com/geetikavasistha-01',
        isMoreWork: true,
        order: 4
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
        longDescription: `## Overview\nMy custom blogging engine.`,
        githubUrl: 'https://github.com/geetikavasistha-01',
        isMoreWork: true,
        order: 5
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
