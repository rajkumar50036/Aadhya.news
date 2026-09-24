import { db } from './db';

export interface StoryItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
  imageUrl?: string | null;
  category: string;
  subCategory?: string | null;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isLive?: boolean;
  isTrending?: boolean;
  verificationStatus: string;
  verificationScore?: number;
  publishedAt: string | Date;
  readCount?: number;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTimeMinutes: number;
  publishedAt: string | Date;
}

export const FALLBACK_BLOGS: BlogPostItem[] = [
  {
    id: 'blog-1',
    title: 'How Artificial Intelligence is Reshaping Modern Journalism and News Verification',
    slug: 'ai-reshaping-modern-journalism-news-verification',
    excerpt: 'An in-depth analysis of automated feed normalization, duplicate clustering algorithms, and natural language executive summarization.',
    content: `Artificial Intelligence is fundamentally altering how information is gathered, verified, and distributed across global newsrooms.

### The Problem of Information Velocity
In an era where thousands of RSS feeds, social dispatches, and press releases are published every minute, human editorial teams face unprecedented cognitive overload.

### Automated Deduplication and Multi-Source Verification
By deploying n-gram similarity scoring and TF-IDF vector embeddings, automated news platforms can evaluate incoming reports against verified official registries (such as PIB, NTA, and NASA) before publishing.

### The Role of Neutral Executive Summaries
AI models convert dense 2000-word articles into 3 bullet key takeaways, saving readers time while preserving objective factual integrity.`,
    authorName: 'Dr. Aris Thorne',
    authorRole: 'Senior AI Research Architect',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    category: 'Technology & AI',
    tags: ['AI', 'Journalism', 'Tech', 'Algorithms'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    readTimeMinutes: 5,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: 'blog-2',
    title: 'Strategies for Cracking JEE Main & NEET 2026: Time Management and Exam Prep',
    slug: 'strategies-cracking-jee-main-neet-2026-exam-prep',
    excerpt: 'Comprehensive roadmap for engineering and medical aspirants covering mock test schedules, revision strategies, and syllabus tracking.',
    content: `Preparing for national competitive entrance examinations requires structured time management, consistent practice, and rapid revision techniques.

### 1. Master the Core NCERT Foundation
Over 80% of direct conceptual questions in NEET and JEE Main build directly upon NCERT concepts. Ensure thorough mastery before attempting complex numerical problems.

### 2. Standardized Mock Test Simulation
Take full-length 3-hour computer-based mock tests twice a week under actual exam room timing constraints.

### 3. Error Log Analysis
Maintain a dedicated notebook recording missed questions during mock exams to prevent repeating procedural errors.`,
    authorName: 'Prof. Rajesh Sharma',
    authorRole: 'Chief Education Mentor',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    category: 'Education & Careers',
    tags: ['JEE', 'NEET', 'Education', 'Exams'],
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    readTimeMinutes: 6,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

// High Quality Live Fallback News Data
export const FALLBACK_STORIES: StoryItem[] = [
  {
    id: 'story-live-1',
    title: 'The Hindu: Supreme Court Issues Orders on Electoral & Administrative Reforms',
    slug: 'supreme-court-issues-orders-electoral-administrative-reforms',
    summary: '• Supreme Court bench delivers key verdict on electoral transparency.\n• Directs Union and State bodies to ensure verified digital publishing.\n• Enhances voter verification safeguards nationwide.',
    content: 'The Supreme Court of India today issued landmark directives regarding election administration and transparency standards. The ruling mandates standardized digital reporting and immediate verification of official releases.',
    sourceName: 'The Hindu National',
    sourceUrl: 'https://www.thehindu.com',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    category: 'india',
    subCategory: 'politics',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    verificationStatus: 'VERIFIED_OFFICIAL',
    verificationScore: 0.98,
    publishedAt: new Date(),
  },
  {
    id: 'story-live-2',
    title: 'BBC: Global Climate Summit 2026 Reaches Landmark Renewable Accord',
    slug: 'bbc-global-climate-summit-2026-landmark-accord',
    summary: '• Over 190 nations commit to doubling green energy investments.\n• $100 billion annual resilient climate fund launched.\n• Direct transition timeline established for solar and hydrogen energy.',
    content: 'Delegates at the International Climate Assembly signed a binding treaty aimed at curbing global emissions. The accord provides financial support and technology transfer agreements for developing nations.',
    sourceName: 'BBC World News',
    sourceUrl: 'https://www.bbc.com/news/world',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    category: 'global',
    subCategory: 'world',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    verificationStatus: 'VERIFIED_OFFICIAL',
    verificationScore: 0.96,
    publishedAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'story-live-3',
    title: 'Indian Express: JEE Main & NEET Exam 2026 Registration Dates Released',
    slug: 'indian-express-jee-main-neet-exam-2026-schedule-released',
    summary: '• Examination calendar published by National Testing Agency.\n• Session 1 online registration opens with revised exam center allocation.\n• Enhanced biometric authentication required at all test centers.',
    content: 'The National Testing Agency has officially announced the timeline for engineering and medical entrance examinations. Candidates can verify candidate eligibility, test schedules, and city slips online.',
    sourceName: 'Indian Express Education',
    sourceUrl: 'https://indianexpress.com/section/education',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    category: 'exams',
    subCategory: 'education',
    isBreaking: true,
    isFeatured: false,
    isTrending: true,
    verificationStatus: 'VERIFIED_OFFICIAL',
    verificationScore: 0.97,
    publishedAt: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: 'story-live-4',
    title: 'NASA: Orbiting Spacecraft Discovers Subsurface Water Deposits on Lunar Surface',
    slug: 'nasa-spacecraft-discovers-subsurface-water-lunar-surface',
    summary: '• Lunar probe spectrometer detects high-density ice in permanently shadowed polar craters.\n• Discovery significantly boosts feasibility of human lunar outposts.\n• Sample return mission targeted for 2027.',
    content: 'Scientific analysis from NASA orbital probes confirmed extensive water ice deposits near the lunar south pole. The discovery provides vital resources for upcoming deep space exploration.',
    sourceName: 'NASA Space & Science',
    sourceUrl: 'https://www.nasa.gov',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    category: 'global',
    subCategory: 'science-space',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    verificationStatus: 'HIGH_CONFIDENCE',
    verificationScore: 0.94,
    publishedAt: new Date(Date.now() - 1000 * 60 * 150),
  },
  {
    id: 'story-live-5',
    title: 'TechCrunch: AI & Quantum Computing Breakthrough Announced by Research Consortium',
    slug: 'techcrunch-ai-quantum-computing-breakthrough',
    summary: '• 1000-qubit processor achieves fault-tolerant error correction.\n• Enables 10x faster drug discovery and material science simulations.\n• Commercial deployment planned for late 2026.',
    content: 'Engineers have unveiled a scalable quantum architecture featuring real-time error suppression. The advancement resolves long-standing decoherence hurdles in quantum computing.',
    sourceName: 'TechCrunch Global',
    sourceUrl: 'https://techcrunch.com',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    category: 'global',
    subCategory: 'technology',
    isBreaking: false,
    isFeatured: false,
    isLive: true,
    isTrending: true,
    verificationStatus: 'HIGH_CONFIDENCE',
    verificationScore: 0.92,
    publishedAt: new Date(Date.now() - 1000 * 60 * 200),
  },
];

export async function fetchStoriesSafe(filter: {
  category?: string;
  subCategory?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isLive?: boolean;
  take?: number;
  search?: string;
}): Promise<StoryItem[]> {
  try {
    const where: any = {};
    if (filter.category) where.category = filter.category;
    if (filter.subCategory) where.subCategory = filter.subCategory;
    if (filter.isBreaking) where.isBreaking = true;
    if (filter.isFeatured) where.isFeatured = true;
    if (filter.isTrending) where.isTrending = true;
    if (filter.isLive) where.isLive = true;

    if (filter.search && filter.search.trim()) {
      where.OR = [
        { title: { contains: filter.search } },
        { summary: { contains: filter.search } },
        { content: { contains: filter.search } },
      ];
    }

    const stories = await db.story.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: filter.take || 20,
    });

    if (stories && stories.length > 0) {
      return stories as unknown as StoryItem[];
    }
  } catch (error) {
    console.warn('Prisma DB query fallback to memory provider:', error);
  }

  let result = [...FALLBACK_STORIES];

  if (filter.category) {
    result = result.filter((s) => s.category === filter.category);
  }
  if (filter.subCategory) {
    result = result.filter((s) => s.subCategory === filter.subCategory);
  }
  if (filter.isBreaking) {
    result = result.filter((s) => s.isBreaking);
  }
  if (filter.isFeatured) {
    result = result.filter((s) => s.isFeatured);
  }
  if (filter.isTrending) {
    result = result.filter((s) => s.isTrending);
  }
  if (filter.isLive) {
    result = result.filter((s) => s.isLive);
  }
  if (filter.search && filter.search.trim()) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (s) => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)
    );
  }

  if (filter.take) {
    result = result.slice(0, filter.take);
  }

  return result;
}

export async function fetchStoryBySlugSafe(slug: string): Promise<{
  story: StoryItem | null;
  related: StoryItem[];
}> {
  try {
    const story = await db.story.findUnique({
      where: { slug },
      include: { sources: true, liveUpdates: true },
    });

    if (story) {
      const related = await db.story.findMany({
        where: { category: story.category, id: { not: story.id } },
        take: 3,
        orderBy: { publishedAt: 'desc' },
      });
      return { story: story as unknown as StoryItem, related: related as unknown as StoryItem[] };
    }
  } catch (e) {
    console.warn('Prisma DB slug query fallback:', e);
  }

  const story = FALLBACK_STORIES.find((s) => s.slug === slug) || FALLBACK_STORIES[0];
  const related = FALLBACK_STORIES.filter((s) => s.id !== story.id).slice(0, 3);

  return { story, related };
}

export async function fetchBlogsSafe(): Promise<BlogPostItem[]> {
  return FALLBACK_BLOGS;
}

export async function fetchBlogBySlugSafe(slug: string): Promise<BlogPostItem | null> {
  return FALLBACK_BLOGS.find((b) => b.slug === slug) || FALLBACK_BLOGS[0];
}
