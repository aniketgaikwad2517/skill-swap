import { 
  UserProfile, 
  SkillCategory, 
  ExchangeRequest, 
  MessageItem, 
  LearningSession, 
  SessionReview, 
  CommunityPost, 
  PostComment,
  NotificationItem 
} from '../types';

export const INITIAL_CATEGORIES: SkillCategory[] = [
  {
    id: 'tech',
    name: 'Programming & Technology',
    iconName: 'Code',
    description: 'Web development, Python, Machine Learning, Systems & Cloud Architecture.',
    skillsCount: 420,
    popularSkills: ['Python', 'React & TypeScript', 'Machine Learning', 'Next.js', 'Rust', 'Docker & DevOps']
  },
  {
    id: 'design',
    name: 'Design & Creativity',
    iconName: 'Palette',
    description: 'UI/UX design, design systems, 3D modeling, brand identity, and motion design.',
    skillsCount: 310,
    popularSkills: ['Figma UI/UX', 'Design Systems', 'Blender 3D', 'User Research', 'Brand Strategy']
  },
  {
    id: 'business',
    name: 'Business & Entrepreneurship',
    iconName: 'Briefcase',
    description: 'Startup fundraising, product management, pitching, and operations scaling.',
    skillsCount: 245,
    popularSkills: ['Product Management', 'Pitch Decks', 'Lean Startup Strategy', 'SaaS Pricing', 'Negotiation']
  },
  {
    id: 'languages',
    name: 'Communication & Languages',
    iconName: 'Globe',
    description: 'Conversational fluency, accent coaching, public speaking, and translation.',
    skillsCount: 380,
    popularSkills: ['Conversational Japanese', 'Spanish Fluency', 'Mandarin Chinese', 'Public Speaking', 'Business English']
  },
  {
    id: 'marketing',
    name: 'Marketing & Social Media',
    iconName: 'TrendingUp',
    description: 'B2B growth marketing, SEO, conversion copy, and organic brand building.',
    skillsCount: 190,
    popularSkills: ['Growth Marketing', 'SEO Optimization', 'Copywriting', 'LinkedIn Brand Strategy', 'Newsletter Monetization']
  },
  {
    id: 'music',
    name: 'Music & Performing Arts',
    iconName: 'Music',
    description: 'Music production, sound synthesis, vocal training, and audio engineering.',
    skillsCount: 140,
    popularSkills: ['Ableton Live', 'Vocal Coaching', 'Guitar Mastery', 'Audio Mixing & Mastering', 'Music Theory']
  },
  {
    id: 'finance',
    name: 'Finance & Personal Development',
    iconName: 'PieChart',
    description: 'Financial modeling, investment valuation, personal productivity, and deep focus.',
    skillsCount: 175,
    popularSkills: ['Financial Modeling', 'DCF Valuation', 'Time Management Systems', 'Mental Models', 'Angel Investing']
  },
  {
    id: 'video',
    name: 'Photography & Video Editing',
    iconName: 'Video',
    description: 'Cinematic storytelling, DaVinci Resolve color grading, camera lighting, and YouTube production.',
    skillsCount: 220,
    popularSkills: ['DaVinci Resolve', 'Cinematography & Lighting', 'Premiere Pro', 'Visual Storytelling', 'Short-form Video']
  }
];

export const CURRENT_USER_DEFAULT: UserProfile = {
  id: 'current-user-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  headline: 'Senior Full-Stack Engineer • Python & TypeScript Enthusiast',
  bio: 'Building scalable web applications for 6+ years. Excited to exchange my deep backend & frontend engineering experience for hands-on UI/UX Design and Conversational Japanese.',
  location: 'San Francisco, CA (PST)',
  timezone: 'America/Los_Angeles (UTC-7)',
  showLocation: true,
  education: 'B.S. in Computer Science, UC Berkeley',
  professionalRole: 'Senior Software Engineer',
  companyOrSchool: 'Vektor Labs',
  teachingSkills: [
    {
      id: 'ts-1',
      name: 'Python',
      category: 'Programming & Technology',
      level: 'Expert',
      yearsOfExperience: 6,
      description: 'API development with FastAPI, data engineering pipelines, scripting, and system automation.',
      endorsementsCount: 28
    },
    {
      id: 'ts-2',
      name: 'React & TypeScript',
      category: 'Programming & Technology',
      level: 'Advanced',
      yearsOfExperience: 5,
      description: 'Modern component architecture, custom hooks, state management, and full-stack integration.',
      endorsementsCount: 34
    },
    {
      id: 'ts-3',
      name: 'Docker & DevOps',
      category: 'Programming & Technology',
      level: 'Intermediate',
      yearsOfExperience: 3,
      description: 'Containerization, CI/CD pipelines, Docker Compose setup, and cloud deployments.',
      endorsementsCount: 12
    }
  ],
  learningSkills: [
    {
      id: 'ls-1',
      name: 'Figma UI/UX',
      category: 'Design & Creativity',
      level: 'Beginner',
      description: 'Mastering auto-layout, interactive prototyping, and building production-ready design systems.'
    },
    {
      id: 'ls-2',
      name: 'Conversational Japanese',
      category: 'Communication & Languages',
      level: 'Beginner',
      description: 'Preparing for practical conversations, JLPT N4 grammar, and travel vocabulary.'
    },
    {
      id: 'ls-3',
      name: 'Video Editing',
      category: 'Photography & Video Editing',
      level: 'Intermediate',
      description: 'Creating high-retention tech tutorials and mastering DaVinci Resolve color grading.'
    }
  ],
  preferredFormat: 'video',
  weeklyAvailabilityHours: 6,
  availableDays: ['Tuesday Evenings', 'Thursday Evenings', 'Saturday Mornings'],
  languages: ['English (Native)', 'Spanish (Conversational)'],
  learningGoals: 'My immediate target is to design and polish my indie SaaS interface in Figma without needing an external designer, while practicing conversational Japanese for 30 minutes twice a week.',
  isPro: true,
  isAdmin: true,
  rating: 4.96,
  reviewsCount: 18,
  completedSwapsCount: 22,
  memberSince: 'March 2025',
  visibility: 'public',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
};

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-elena',
    name: 'Elena Chen',
    email: 'elena.design@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    headline: 'Staff Product Designer @ Stripe Alumni • Design Systems Mentor',
    bio: '10 years designing software that millions use daily. Passionate about typography, auto-layout wizardry, and UX micro-interactions. Want to learn Python for AI agent design & automation!',
    location: 'Seattle, WA (PST)',
    timezone: 'America/Los_Angeles (UTC-7)',
    showLocation: true,
    education: 'B.Des, Rhode Island School of Design (RISD)',
    professionalRole: 'Design Principal',
    companyOrSchool: 'Independent Studio',
    teachingSkills: [
      {
        id: 'ec-t1',
        name: 'Figma UI/UX',
        category: 'Design & Creativity',
        level: 'Expert',
        yearsOfExperience: 8,
        description: 'Auto-layout v5, complex variable tokens, responsive component libraries, and interactive flows.',
        endorsementsCount: 52
      },
      {
        id: 'ec-t2',
        name: 'Design Systems',
        category: 'Design & Creativity',
        level: 'Expert',
        yearsOfExperience: 7,
        description: 'Multi-brand token architectures, accessible contrast grids, documentation with Storybook.',
        endorsementsCount: 41
      },
      {
        id: 'ec-t3',
        name: 'User Research',
        category: 'Design & Creativity',
        level: 'Advanced',
        yearsOfExperience: 5,
        description: 'Conducting usability tests, synthesis, jobs-to-be-done frameworks, and customer journey mapping.',
        endorsementsCount: 29
      }
    ],
    learningSkills: [
      {
        id: 'ec-l1',
        name: 'Python',
        category: 'Programming & Technology',
        level: 'Beginner',
        description: 'Scripting generative UI prototypes and connecting LLM APIs to automated workflows.'
      },
      {
        id: 'ec-l2',
        name: 'React & TypeScript',
        category: 'Programming & Technology',
        level: 'Beginner',
        description: 'Translating Figma design tokens directly into typed React components.'
      }
    ],
    preferredFormat: 'video',
    weeklyAvailabilityHours: 5,
    availableDays: ['Monday Evenings', 'Thursday Evenings', 'Sunday Afternoons'],
    languages: ['English (Fluent)', 'Mandarin Chinese (Native)'],
    learningGoals: 'I want to build my own interactive design tools powered by Python & React, bridging the gap between design and engineering.',
    isPro: true,
    rating: 5.0,
    reviewsCount: 31,
    completedSwapsCount: 29,
    memberSince: 'January 2025',
    visibility: 'public',
    socialLinks: {
      portfolio: 'https://elenachen.design',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'user-kenji',
    name: 'Kenji Sato',
    email: 'kenji.s@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    headline: 'Native Japanese Instructor & Audio Engineer • Sound Designer',
    bio: 'Tokyo-born Tokyo University grad, currently in SF. I teach natural, conversational Japanese for professionals and anime/culture lovers. In return, I want to learn web development to build my audio portfolio!',
    location: 'San Francisco, CA / Tokyo',
    timezone: 'America/Los_Angeles (UTC-7)',
    showLocation: true,
    education: 'B.A. in Linguistics, University of Tokyo',
    professionalRole: 'Audio Engineer & Language Specialist',
    companyOrSchool: 'Sonosonic Sound Lab',
    teachingSkills: [
      {
        id: 'ks-t1',
        name: 'Conversational Japanese',
        category: 'Communication & Languages',
        level: 'Expert',
        yearsOfExperience: 8,
        description: 'Real-world polite and casual phrasing, pitch accent correction, everyday idioms, and business etiquette.',
        endorsementsCount: 63
      },
      {
        id: 'ks-t2',
        name: 'Ableton Live',
        category: 'Music & Performing Arts',
        level: 'Expert',
        yearsOfExperience: 9,
        description: 'Synth patching, vocal mixing, Foley design, dynamic range compression, and spatial audio.',
        endorsementsCount: 38
      }
    ],
    learningSkills: [
      {
        id: 'ks-l1',
        name: 'React & TypeScript',
        category: 'Programming & Technology',
        level: 'Beginner',
        description: 'Building an interactive web-based audio synthesizer and portfolio website.'
      },
      {
        id: 'ks-l2',
        name: 'Docker & DevOps',
        category: 'Programming & Technology',
        level: 'Beginner',
        description: 'Deploying personal node apps reliably to digital ocean droplets.'
      }
    ],
    preferredFormat: 'video',
    weeklyAvailabilityHours: 8,
    availableDays: ['Tuesday Mornings', 'Wednesday Evenings', 'Saturday Afternoons'],
    languages: ['Japanese (Native)', 'English (Fluent)'],
    learningGoals: 'Develop a responsive web audio platform where students can listen to pronunciation clips and practice pitch accents.',
    isPro: true,
    rating: 4.95,
    reviewsCount: 24,
    completedSwapsCount: 26,
    memberSince: 'February 2025',
    visibility: 'public',
    socialLinks: {
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'user-lucas',
    name: 'Lucas Silva',
    email: 'lucas.film@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    headline: 'Commercial Cinematographer & DaVinci Resolve Colorist',
    bio: 'Shot documentaries for Netflix & National Geographic. I can teach you the art of high-impact visual storytelling, cinematic camera lighting, and node-based color grading in DaVinci Resolve.',
    location: 'Austin, TX (CST)',
    timezone: 'America/Chicago (UTC-6)',
    showLocation: true,
    education: 'M.F.A. in Film Production, UT Austin',
    professionalRole: 'Director of Photography',
    companyOrSchool: 'Prism Frame Films',
    teachingSkills: [
      {
        id: 'ls-t1',
        name: 'Video Editing',
        category: 'Photography & Video Editing',
        level: 'Expert',
        yearsOfExperience: 9,
        description: 'DaVinci Resolve studio workflows, pace and rhythm editing, sound design layering, and YouTube pacing.',
        endorsementsCount: 47
      },
      {
        id: 'ls-t2',
        name: 'DaVinci Resolve',
        category: 'Photography & Video Editing',
        level: 'Expert',
        yearsOfExperience: 7,
        description: 'Node structures, ACES color management, skin tone isolation, film emulation, and HDR mastering.',
        endorsementsCount: 39
      },
      {
        id: 'ls-t3',
        name: 'Cinematography & Lighting',
        category: 'Photography & Video Editing',
        level: 'Expert',
        yearsOfExperience: 10,
        description: 'Key-to-fill ratios, diffusion techniques, budget-friendly lighting rigs for desk creators.',
        endorsementsCount: 33
      }
    ],
    learningSkills: [
      {
        id: 'ls-l1',
        name: 'Python',
        category: 'Programming & Technology',
        level: 'Beginner',
        description: 'Writing automation scripts for video transcoding and media asset organization.'
      },
      {
        id: 'ls-l2',
        name: 'Spanish Fluency',
        category: 'Communication & Languages',
        level: 'Intermediate',
        description: 'Improving Latin American Spanish fluency for upcoming documentary filming in Colombia.'
      }
    ],
    preferredFormat: 'video',
    weeklyAvailabilityHours: 6,
    availableDays: ['Wednesday Mornings', 'Friday Afternoons', 'Saturday All-Day'],
    languages: ['Portuguese (Native)', 'English (Fluent)', 'Spanish (Basic)'],
    learningGoals: 'Automate tedious 4K render backups using custom Python scripts and become conversational in Spanish for documentary field interviews.',
    isPro: false,
    rating: 4.92,
    reviewsCount: 15,
    completedSwapsCount: 17,
    memberSince: 'April 2025',
    visibility: 'public'
  },
  {
    id: 'user-sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.growth@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    headline: 'VP of Growth @ Series B SaaS • B2B Acquisition & Copywriting',
    bio: 'Scaled two SaaS products from $0 to $8M ARR. I love breaking down high-converting landing page copywriting, SEO topic clusters, and founder-led LinkedIn marketing.',
    location: 'New York, NY (EST)',
    timezone: 'America/New_York (UTC-5)',
    showLocation: true,
    education: 'B.S. in Marketing, NYU Stern',
    professionalRole: 'Head of Growth',
    companyOrSchool: 'HyperGrowth Labs',
    teachingSkills: [
      {
        id: 'sj-t1',
        name: 'Growth Marketing',
        category: 'Marketing & Social Media',
        level: 'Expert',
        yearsOfExperience: 8,
        description: 'Funnel teardowns, CAC/LTV optimization, activation email sequencing, and organic growth loops.',
        endorsementsCount: 56
      },
      {
        id: 'sj-t2',
        name: 'Copywriting',
        category: 'Marketing & Social Media',
        level: 'Advanced',
        yearsOfExperience: 6,
        description: 'Psychological triggers, above-the-fold value propositions, objection-killing landing pages.',
        endorsementsCount: 42
      }
    ],
    learningSkills: [
      {
        id: 'sj-l1',
        name: 'Python',
        category: 'Programming & Technology',
        level: 'Beginner',
        description: 'Scraping market data, competitors, and building custom analytics dashboards.'
      },
      {
        id: 'sj-l2',
        name: 'Figma UI/UX',
        category: 'Design & Creativity',
        level: 'Intermediate',
        description: 'Designing quick test landing pages and wireframes independently.'
      }
    ],
    preferredFormat: 'video',
    weeklyAvailabilityHours: 4,
    availableDays: ['Monday Evenings', 'Thursday Lunchtime', 'Saturday Afternoons'],
    languages: ['English (Native)', 'French (Conversational)'],
    learningGoals: 'Learn to write Python scripts for competitive intelligence without relying on our engineering team.',
    isPro: true,
    rating: 4.97,
    reviewsCount: 36,
    completedSwapsCount: 40,
    memberSince: 'November 2024',
    visibility: 'public'
  },
  {
    id: 'user-amara',
    name: 'Amara Okafor',
    email: 'amara.fin@example.com',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    headline: 'Ex-Goldman Sachs Analyst • FinTech Product Leader & Angel Investor',
    bio: 'Passionate about democratizing financial literacy and building clean financial models. Happy to help founders build investor-grade spreadsheets and understand unit economics.',
    location: 'London, UK (GMT)',
    timezone: 'Europe/London (UTC+1)',
    showLocation: true,
    education: 'M.Sc. in Finance, London School of Economics',
    professionalRole: 'Principal Investor',
    companyOrSchool: 'Meridian Capital',
    teachingSkills: [
      {
        id: 'ao-t1',
        name: 'Financial Modeling',
        category: 'Finance & Personal Development',
        level: 'Expert',
        yearsOfExperience: 7,
        description: '3-statement financial models, SaaS cohort retention waterfalls, valuation sensitivity matrices.',
        endorsementsCount: 44
      },
      {
        id: 'ao-t2',
        name: 'Pitch Decks',
        category: 'Business & Entrepreneurship',
        level: 'Expert',
        yearsOfExperience: 6,
        description: 'Telling compelling fundraise stories that make VCs lean in, structuring data slides and traction metrics.',
        endorsementsCount: 38
      }
    ],
    learningSkills: [
      {
        id: 'ao-l1',
        name: 'React & TypeScript',
        category: 'Programming & Technology',
        level: 'Beginner',
        description: 'Building clean interactive financial calculators for early stage startups.'
      },
      {
        id: 'ao-l2',
        name: 'Conversational Japanese',
        category: 'Communication & Languages',
        level: 'Beginner',
        description: 'Learning Japanese for cross-border investments in Asian tech hubs.'
      }
    ],
    preferredFormat: 'video',
    weeklyAvailabilityHours: 5,
    availableDays: ['Tuesday Evenings', 'Friday Afternoons', 'Sunday Mornings'],
    languages: ['English (Native)', 'Igbo (Fluent)'],
    learningGoals: 'Code interactive frontend apps for portfolio founders and learn foundational Japanese.',
    isPro: true,
    rating: 4.98,
    reviewsCount: 22,
    completedSwapsCount: 25,
    memberSince: 'December 2024',
    visibility: 'public'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Vance',
    email: 'marcus.ai@example.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    headline: 'AI Research Engineer • LLM Fine-Tuning & Multi-Agent Architecture',
    bio: 'Building autonomous AI systems. I can guide you through fine-tuning open source models, retrieval augmented generation (RAG), and PyTorch internals. Looking to upgrade my public speaking and pitch skills.',
    location: 'Boston, MA (EST)',
    timezone: 'America/New_York (UTC-5)',
    showLocation: true,
    education: 'Ph.D. Candidate in CS, MIT',
    professionalRole: 'Machine Learning Scientist',
    companyOrSchool: 'Synapse Core AI',
    teachingSkills: [
      {
        id: 'mv-t1',
        name: 'Machine Learning',
        category: 'Programming & Technology',
        level: 'Expert',
        yearsOfExperience: 6,
        description: 'PyTorch models, embeddings, vector databases, prompt caching, fine-tuning Llama/Mistral.',
        endorsementsCount: 65
      },
      {
        id: 'mv-t2',
        name: 'Python',
        category: 'Programming & Technology',
        level: 'Expert',
        yearsOfExperience: 8,
        description: 'Asyncio, performance profiling, Cython extensions, concurrent network architectures.',
        endorsementsCount: 58
      }
    ],
    learningSkills: [
      {
        id: 'mv-l1',
        name: 'Public Speaking',
        category: 'Communication & Languages',
        level: 'Beginner',
        description: 'Delivering keynote talks without anxiety and making complex math intuitive.'
      },
      {
        id: 'mv-l2',
        name: 'Figma UI/UX',
        category: 'Design & Creativity',
        level: 'Beginner',
        description: 'Designing intuitive developer tool interfaces.'
      }
    ],
    preferredFormat: 'video',
    weeklyAvailabilityHours: 4,
    availableDays: ['Monday Nights', 'Saturday Afternoons'],
    languages: ['English (Native)'],
    learningGoals: 'Present my paper at major conferences with charismatic stage presence.',
    isPro: true,
    rating: 4.93,
    reviewsCount: 19,
    completedSwapsCount: 21,
    memberSince: 'March 2025',
    visibility: 'public'
  }
];

export const INITIAL_EXCHANGE_REQUESTS: ExchangeRequest[] = [
  {
    id: 'req-1',
    senderId: 'user-elena',
    senderName: 'Elena Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    receiverId: 'current-user-1',
    receiverName: 'Alex Rivera',
    receiverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    offeredSkill: 'Figma UI/UX & Design Systems',
    wantedSkill: 'Python & FastAPI',
    personalMessage: 'Hey Alex! I saw you have deep Python experience. I am currently designing an AI generation canvas and need help writing a Python backend to orchestrate API calls. I can teach you Figma auto-layout & design tokens in return!',
    suggestedTimes: 'Thursday 6:00 PM PST or Saturday 11:00 AM PST',
    durationMinutes: 45,
    status: 'Pending',
    createdAt: '2026-10-20T14:30:00Z'
  },
  {
    id: 'req-2',
    senderId: 'current-user-1',
    senderName: 'Alex Rivera',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    receiverId: 'user-kenji',
    receiverName: 'Kenji Sato',
    receiverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    offeredSkill: 'React & TypeScript Architecture',
    wantedSkill: 'Conversational Japanese (Pitch Accent & Casual Phrases)',
    personalMessage: 'Hi Kenji! I would love to do weekly 45-minute exchange sessions. I can walk you through building your interactive audio portfolio with modern React and AudioContext, and practice casual Japanese pronunciation.',
    suggestedTimes: 'Tuesday 7:00 PM PST or Saturday 10:00 AM PST',
    durationMinutes: 45,
    status: 'Accepted',
    createdAt: '2026-10-18T09:15:00Z',
    respondedAt: '2026-10-18T16:00:00Z'
  },
  {
    id: 'req-3',
    senderId: 'user-lucas',
    senderName: 'Lucas Silva',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    receiverId: 'current-user-1',
    receiverName: 'Alex Rivera',
    receiverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    offeredSkill: 'DaVinci Resolve Color Grading & Camera Lighting',
    wantedSkill: 'Python Scripting for Media Ingestion',
    personalMessage: 'Hi Alex! Loved your portfolio projects. I want to build a Python watcher folder that renames footage by shoot date. In exchange, I can teach you pro color grading in DaVinci Resolve so your tutorial videos look like cinema films.',
    suggestedTimes: 'Wednesday 5:30 PM CST',
    durationMinutes: 60,
    status: 'Completed',
    createdAt: '2026-10-10T12:00:00Z',
    respondedAt: '2026-10-11T09:00:00Z'
  }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-kenji',
    senderId: 'user-kenji',
    receiverId: 'current-user-1',
    content: 'Konbanwa Alex! Really excited for our upcoming session this weekend. Shall we start with AudioContext basics or review common Japanese sentence endings first?',
    timestamp: '2026-10-21T10:15:00Z',
    isRead: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-kenji',
    senderId: 'current-user-1',
    receiverId: 'user-kenji',
    content: 'Hi Kenji! Let\'s do 25 minutes of Japanese conversation first so my brain gets warmed up, and then we will dive straight into your React Audio synthesizer project.',
    timestamp: '2026-10-21T11:05:00Z',
    isRead: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-kenji',
    senderId: 'user-kenji',
    receiverId: 'current-user-1',
    content: 'Perfect! I prepared some audio clips of pitch accent contrast between "hashi" (chopsticks) vs "hashi" (bridge). See you on Saturday!',
    timestamp: '2026-10-21T11:20:00Z',
    isRead: false
  },
  {
    id: 'msg-4',
    conversationId: 'conv-elena',
    senderId: 'user-elena',
    receiverId: 'current-user-1',
    content: 'Hi Alex! Saw your profile match. I created a dedicated Figma file with auto-layout v5 components ready for our swap session whenever you accept the request!',
    timestamp: '2026-10-20T15:10:00Z',
    isRead: false,
    attachmentName: 'figma_design_tokens_v2.fig'
  }
];

export const INITIAL_SESSIONS: LearningSession[] = [
  {
    id: 'sess-1',
    requestId: 'req-2',
    hostId: 'current-user-1',
    hostName: 'Alex Rivera',
    guestId: 'user-kenji',
    guestName: 'Kenji Sato',
    title: 'Japanese Phonetics Practice & React Audio Synthesizer Deep Dive',
    skillTeaching: 'React & TypeScript Architecture',
    skillLearning: 'Conversational Japanese (Pitch Accents)',
    scheduledAt: '2026-10-24T17:00:00Z', // Saturday 10 AM PST
    durationMinutes: 50,
    timezone: 'America/Los_Angeles (PST)',
    status: 'Upcoming',
    meetingLink: 'https://meet.skillswap.io/alex-kenji-swap-892',
    notes: 'Bring sample web audio waveform snippets and review verb conjugation tables.'
  },
  {
    id: 'sess-2',
    requestId: 'req-3',
    hostId: 'user-lucas',
    hostName: 'Lucas Silva',
    guestId: 'current-user-1',
    guestName: 'Alex Rivera',
    title: 'DaVinci Resolve Node Trees & Color Correction Masterclass',
    skillTeaching: 'Python Video Ingestion Automation',
    skillLearning: 'DaVinci Resolve & Studio Lighting',
    scheduledAt: '2026-10-14T19:00:00Z',
    durationMinutes: 60,
    timezone: 'America/Chicago (CST)',
    status: 'Completed',
    meetingLink: 'https://meet.skillswap.io/lucas-alex-session-234',
    notes: 'Lucas shared his custom film grain LUTs, Alex provided python script for ffmpeg batching.'
  }
];

export const INITIAL_REVIEWS: SessionReview[] = [
  {
    id: 'rev-1',
    sessionId: 'sess-2',
    reviewerId: 'user-lucas',
    reviewerName: 'Lucas Silva',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    revieweeId: 'current-user-1',
    rating: 5,
    comment: 'Alex is an exceptional teacher! He wrote a clean Python script that saves me 2 hours every single shoot day. Patient, clear, and explains the "why" behind every code decision. Best swap ever!',
    skillReviewed: 'Python Automation',
    createdAt: '2026-10-15T10:00:00Z'
  },
  {
    id: 'rev-2',
    sessionId: 'sess-2',
    reviewerId: 'current-user-1',
    reviewerName: 'Alex Rivera',
    reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    revieweeId: 'user-lucas',
    rating: 5,
    comment: 'Lucas is a true master colorist. In just 60 minutes, he completely transformed how I light my studio desk and gave me a foolproof DaVinci node workflow. 10/10 recommend swapping with him!',
    skillReviewed: 'DaVinci Resolve Color Grading',
    createdAt: '2026-10-15T11:30:00Z'
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-elena',
    authorName: 'Elena Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Staff Product Designer • Design Systems',
    title: 'The 3 Figma Auto-Layout Mistakes I See Developers & Junior Designers Make',
    content: 'After mentoring over 40 peers on SkillSwap, here is the secret to bulletproof component resizing: 1) Stop using absolute positioning for badges when negative spacing exists. 2) Set max-widths on your text containers to prevent infinite stretching on widescreen displays. 3) Group related visual controls inside slot wrappers so variable swapping doesn\'t collapse parent heights. Feel free to comment if you want me to inspect your Figma layout!',
    category: 'Design & Creativity',
    tags: ['Figma', 'UIUX', 'DesignSystems', 'Prototyping'],
    likesCount: 78,
    likedByCurrentUser: true,
    commentsCount: 14,
    createdAt: '2026-10-21T08:00:00Z',
    pinned: true
  },
  {
    id: 'post-2',
    authorId: 'current-user-1',
    authorName: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Senior Full-Stack Engineer',
    title: 'Free Checklist: How to Set Up FastAPI with Strict Type Hints & Automatic Swagger Docs',
    content: 'When exchanging backend skills with frontend learners, the biggest bottleneck is always undocumented API payloads. By combining Pydantic v2 BaseModels with FastAPI dependency injection, you get automated OpenAPI schemas that let frontend developers generate TypeScript interfaces in seconds. Happy to share my boilerplate repo with anyone looking to swap!',
    category: 'Programming & Technology',
    tags: ['Python', 'FastAPI', 'TypeScript', 'CleanCode'],
    likesCount: 52,
    likedByCurrentUser: false,
    commentsCount: 9,
    createdAt: '2026-10-20T11:45:00Z'
  },
  {
    id: 'post-3',
    authorId: 'user-sarah',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'VP of Growth @ Series B SaaS',
    title: 'Why Founders Need to Stop Selling "Features" and Sell the "After-State"',
    content: 'If your landing page headline says "AI-powered automated task management tool", nobody cares. If it says "Save 6 hours a week by letting AI auto-triage your client tickets", they open their wallets. Swap with me this month if you need a brutal, honest teardown of your value proposition before launch!',
    category: 'Marketing & Social Media',
    tags: ['Copywriting', 'Growth', 'Startups', 'SaaS'],
    likesCount: 94,
    likedByCurrentUser: true,
    commentsCount: 22,
    createdAt: '2026-10-19T16:20:00Z'
  }
];

export const INITIAL_COMMENTS: PostComment[] = [
  {
    id: 'comm-1',
    postId: 'post-1',
    authorId: 'current-user-1',
    authorName: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    content: 'Elena, this advice saved me hours yesterday. Negative spacing inside auto-layout was exactly what I needed for notification pill counters!',
    createdAt: '2026-10-21T09:12:00Z'
  },
  {
    id: 'comm-2',
    postId: 'post-1',
    authorId: 'user-marcus',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    content: 'Brilliant breakdown. I sent you an exchange request — would love to learn more design system secrets in exchange for PyTorch model optimization.',
    createdAt: '2026-10-21T10:05:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'current-user-1',
    title: 'New Skill Exchange Request!',
    message: 'Elena Chen wants to exchange Figma UI/UX for your Python expertise.',
    type: 'request',
    isRead: false,
    createdAt: '2026-10-20T14:30:00Z',
    linkTab: 'requests'
  },
  {
    id: 'notif-2',
    userId: 'current-user-1',
    title: 'Upcoming Session in 3 Days',
    message: 'Your Japanese conversation session with Kenji Sato is scheduled for Saturday at 10:00 AM PST.',
    type: 'session',
    isRead: false,
    createdAt: '2026-10-21T08:00:00Z',
    linkTab: 'messages'
  },
  {
    id: 'notif-3',
    userId: 'current-user-1',
    title: 'New 5-Star Review Received ⭐',
    message: 'Lucas Silva left a 5-star review for your Python Automation session: "Alex is an exceptional teacher..."',
    type: 'review',
    isRead: true,
    createdAt: '2026-10-15T10:05:00Z',
    linkTab: 'profile'
  }
];
