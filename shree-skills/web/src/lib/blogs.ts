import { BlogPost } from "./types";

export const blogs: BlogPost[] = [
  {
    title: "Learn English for Interviews: 30-Day Plan",
    slug: "english-interviews-30-day-plan",
    excerpt: "A practical daily plan to improve spoken English and interview confidence.",
    tags: ["English", "Career"],
    readTime: "6 min",
    date: "2026-01-05",
    hero: "/images/blog-learning.svg",
    content: [
      "Focus on introducing yourself, your projects, and your strengths.",
      "Record short answers daily and review for clarity.",
      "Build a bank of common interview phrases and questions."
    ],
    resources: [
      { name: "Interview (Wikipedia)", url: "https://en.wikipedia.org/wiki/Job_interview" },
      { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish" }
    ]
  },
  {
    title: "Spoken English Daily Routine",
    slug: "spoken-english-daily-routine",
    excerpt: "A 20-minute routine to improve fluency and pronunciation.",
    tags: ["English", "Habits"],
    readTime: "5 min",
    date: "2026-01-08",
    hero: "/images/blog-career.svg",
    content: [
      "Shadow short videos to copy tone and pacing.",
      "Speak out loud to build confidence and memory.",
      "Practice with a partner or a voice journal."
    ],
    resources: [
      { name: "Pronunciation (Wikipedia)", url: "https://en.wikipedia.org/wiki/Pronunciation" },
      { name: "FluentU Blog", url: "https://www.fluentu.com/blog/english/" }
    ]
  },
  {
    title: "German A1 Roadmap",
    slug: "german-a1-roadmap",
    excerpt: "A structured plan to master A1 German basics in weeks.",
    tags: ["German", "Languages"],
    readTime: "7 min",
    date: "2026-01-10",
    hero: "/images/blog-sql.svg",
    content: [
      "Start with greetings, numbers, and basic verbs.",
      "Use spaced repetition for vocabulary.",
      "Write short daily dialogues to improve recall."
    ],
    resources: [
      { name: "German language (Wikipedia)", url: "https://en.wikipedia.org/wiki/German_language" },
      { name: "Goethe Institut", url: "https://www.goethe.de/en/index.html" }
    ]
  },
  {
    title: "Japanese for Beginners",
    slug: "japanese-for-beginners",
    excerpt: "Learn essential Hiragana, phrases, and daily conversations.",
    tags: ["Japanese", "Languages"],
    readTime: "6 min",
    date: "2026-01-12",
    hero: "/images/blog-learning.svg",
    content: [
      "Master Hiragana and common phrases first.",
      "Listen to short audio clips daily.",
      "Practice with flashcards and simple sentences."
    ],
    resources: [
      { name: "Japanese language (Wikipedia)", url: "https://en.wikipedia.org/wiki/Japanese_language" },
      { name: "Tofugu", url: "https://www.tofugu.com/" }
    ]
  },
  {
    title: "How to Start DSA from Zero",
    slug: "start-dsa-from-zero",
    excerpt: "A beginner-friendly path to start data structures and algorithms.",
    tags: ["DSA", "Interview"],
    readTime: "8 min",
    date: "2026-01-14",
    hero: "/images/blog-career.svg",
    content: [
      "Begin with arrays, strings, and hash maps.",
      "Solve problems consistently with pattern recognition.",
      "Track progress with weekly goals."
    ],
    resources: [
      { name: "Data structure (Wikipedia)", url: "https://en.wikipedia.org/wiki/Data_structure" },
      { name: "LeetCode", url: "https://leetcode.com" }
    ]
  },
  {
    title: "Frontend vs Backend: What to Choose",
    slug: "frontend-vs-backend-what-to-choose",
    excerpt: "Compare roles, skills, and career paths to pick your track.",
    tags: ["Career", "Web"],
    readTime: "6 min",
    date: "2026-01-16",
    hero: "/images/blog-sql.svg",
    content: [
      "Frontend focuses on UI, UX, and user interactions.",
      "Backend focuses on data, APIs, and business logic.",
      "Try both with a mini project before deciding."
    ],
    resources: [
      { name: "Front-end web development", url: "https://en.wikipedia.org/wiki/Front-end_web_development" },
      { name: "Back-end web development", url: "https://en.wikipedia.org/wiki/Back-end_web_development" }
    ]
  },
  {
    title: "Resume Projects That Get You Hired",
    slug: "resume-projects-that-get-you-hired",
    excerpt: "Build real-world projects that stand out to recruiters.",
    tags: ["Career", "Projects"],
    readTime: "7 min",
    date: "2026-01-18",
    hero: "/images/blog-career.svg",
    content: [
      "Pick projects that solve real problems.",
      "Document your process and decisions.",
      "Show impact with metrics and outcomes."
    ],
    resources: [
      { name: "Resume (Wikipedia)", url: "https://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9" },
      { name: "GitHub Projects", url: "https://github.com/features/project-management" }
    ]
  },
  {
    title: "SQL for Beginners",
    slug: "sql-for-beginners",
    excerpt: "Learn SQL fundamentals with practical examples and queries.",
    tags: ["SQL", "Data"],
    readTime: "5 min",
    date: "2026-01-19",
    hero: "/images/blog-sql.svg",
    content: [
      "Start with SELECT, WHERE, and JOIN operations.",
      "Practice with sample datasets and problems.",
      "Understand normalization and indexing basics."
    ],
    resources: [
      { name: "SQL (Wikipedia)", url: "https://en.wikipedia.org/wiki/SQL" },
      { name: "SQLBolt", url: "https://sqlbolt.com/" }
    ]
  },
  {
    title: "Git & GitHub in 1 Week",
    slug: "git-github-in-1-week",
    excerpt: "A practical roadmap to learn Git workflows quickly.",
    tags: ["Git", "Tools"],
    readTime: "5 min",
    date: "2026-01-20",
    hero: "/images/blog-learning.svg",
    content: [
      "Learn commits, branches, and pull requests.",
      "Use GitHub issues to track work.",
      "Collaborate with a teammate on a mini project."
    ],
    resources: [
      { name: "Git (Wikipedia)", url: "https://en.wikipedia.org/wiki/Git" },
      { name: "GitHub Docs", url: "https://docs.github.com/" }
    ]
  },
  {
    title: "How to Learn Faster with Projects",
    slug: "learn-faster-with-projects",
    excerpt: "Why building projects speeds up learning and retention.",
    tags: ["Learning", "Projects"],
    readTime: "6 min",
    date: "2026-01-22",
    hero: "/images/blog-learning.svg",
    content: [
      "Projects create context and real constraints.",
      "You learn by debugging and making trade-offs.",
      "Ship small and iterate fast for momentum."
    ],
    resources: [
      { name: "Project-based learning", url: "https://en.wikipedia.org/wiki/Project-based_learning" },
      { name: "Notion Templates", url: "https://www.notion.so/templates" }
    ]
  }
];
