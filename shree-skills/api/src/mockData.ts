import bcrypt from "bcryptjs";

export type ResourceLink = {
  name: string;
  url: string;
};

export type MockCourse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  price: number;
  thumbnail: string;
  resources?: ResourceLink[];
  createdAt: Date;
};

export type MockBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  hero: string;
  content: string[];
  resources?: ResourceLink[];
  createdAt: Date;
};

export type MockRoadmap = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  duration: string;
  level: string;
  milestones: string[];
  resources?: ResourceLink[];
  timeline?: { week: string; focus: string }[];
  createdAt: Date;
};

export type MockUser = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

export type MockEnrollment = {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
};

const now = new Date("2026-01-30T09:00:00.000Z");

export const mockCourses: MockCourse[] = [
  {
    id: "9c84f965-4dc2-4055-9224-7a2d9e04fb7a",
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    description: "Build production-ready web apps with React, Next.js, Node.js, APIs, auth, and deployment workflows.",
    level: "Beginner",
    price: 0,
    thumbnail: "/images/course-full-stack.svg",
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
      { name: "React Docs", url: "https://react.dev" }
    ],
    createdAt: now
  },
  {
    id: "dc347832-60db-427f-a1d9-7ca5ad324dab",
    title: "Backend API Engineering",
    slug: "backend-api-engineering",
    description: "Design secure Express APIs with validation, logging, Prisma, JWT auth, and resilient service patterns.",
    level: "Intermediate",
    price: 3499,
    thumbnail: "/images/course-backend.svg",
    resources: [
      { name: "Express Guide", url: "https://expressjs.com" },
      { name: "Prisma Docs", url: "https://www.prisma.io/docs" }
    ],
    createdAt: new Date("2026-01-29T09:00:00.000Z")
  },
  {
    id: "00d35dc3-4ec9-4ad5-89b5-bd8081f7db8b",
    title: "Frontend Engineering",
    slug: "frontend-engineering",
    description: "Ship responsive, accessible, high-performance interfaces with modern React and design-system habits.",
    level: "Intermediate",
    price: 3999,
    thumbnail: "/images/course-frontend.svg",
    resources: [
      { name: "Web.dev", url: "https://web.dev" },
      { name: "Accessibility", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" }
    ],
    createdAt: new Date("2026-01-28T09:00:00.000Z")
  },
  {
    id: "7c6b78d1-c50f-47ab-91c1-8919cc323871",
    title: "Data Structures and Algorithms",
    slug: "data-structures-algorithms",
    description: "Master arrays, trees, graphs, dynamic programming, and interview problem-solving patterns.",
    level: "Intermediate",
    price: 4999,
    thumbnail: "/images/course-dsa.svg",
    resources: [
      { name: "Big O Notation", url: "https://en.wikipedia.org/wiki/Big_O_notation" },
      { name: "LeetCode", url: "https://leetcode.com" }
    ],
    createdAt: new Date("2026-01-27T09:00:00.000Z")
  },
  {
    id: "31b2a611-2f6a-40da-8c6a-6ead7608857d",
    title: "DevOps and Cloud Foundations",
    slug: "devops-cloud-foundations",
    description: "Learn Linux, Docker, CI/CD, AWS basics, monitoring, and deployment automation.",
    level: "Advanced",
    price: 5999,
    thumbnail: "/images/course-devops.svg",
    resources: [
      { name: "Docker Docs", url: "https://docs.docker.com" },
      { name: "AWS Docs", url: "https://docs.aws.amazon.com" }
    ],
    createdAt: new Date("2026-01-26T09:00:00.000Z")
  },
  {
    id: "6b8c54a9-5f31-4f12-8f56-d7e65c0a98e0",
    title: "AI and ML Foundations",
    slug: "ai-ml-foundations",
    description: "Understand ML intuition, model evaluation, prompt workflows, and practical AI product patterns.",
    level: "Beginner",
    price: 2999,
    thumbnail: "/images/course-ai.svg",
    resources: [
      { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
      { name: "Fast.ai", url: "https://www.fast.ai" }
    ],
    createdAt: new Date("2026-01-25T09:00:00.000Z")
  }
];

export const mockBlogs: MockBlog[] = [
  {
    id: "bbf0d932-bdad-4b77-8bc3-e3e2843fdc6d",
    title: "How to Learn Faster with Projects",
    slug: "learn-faster-with-projects",
    excerpt: "A practical method for turning tutorials into shipped work and durable understanding.",
    tags: ["Learning", "Projects"],
    readTime: "6 min",
    date: "2026-01-30",
    hero: "/images/blog-learning.svg",
    content: [
      "Projects force you to connect concepts, make tradeoffs, and debug real constraints.",
      "Start with a small version, write down what broke, then improve one part at a time.",
      "A finished small project teaches more than an unfinished large one."
    ],
    resources: [
      { name: "Project-based learning", url: "https://en.wikipedia.org/wiki/Project-based_learning" }
    ],
    createdAt: now
  },
  {
    id: "42bb48d4-468e-41ad-90e9-37af187c5499",
    title: "Resume Projects That Get You Hired",
    slug: "resume-projects-that-get-you-hired",
    excerpt: "Choose, build, and explain portfolio projects that recruiters can understand quickly.",
    tags: ["Career", "Projects"],
    readTime: "7 min",
    date: "2026-01-28",
    hero: "/images/blog-career.svg",
    content: [
      "Strong resume projects solve a clear problem and include a visible result.",
      "Document the architecture, tradeoffs, and deployment steps.",
      "Add screenshots, test credentials, and measurable outcomes where possible."
    ],
    resources: [
      { name: "GitHub Projects", url: "https://github.com/features/project-management" }
    ],
    createdAt: new Date("2026-01-28T09:00:00.000Z")
  },
  {
    id: "f27f04f7-b6c8-4cb1-a0fd-d7a13ac616b6",
    title: "SQL for Beginners",
    slug: "sql-for-beginners",
    excerpt: "Learn SELECT, filtering, joins, indexes, and schema thinking through examples.",
    tags: ["SQL", "Data"],
    readTime: "5 min",
    date: "2026-01-26",
    hero: "/images/blog-sql.svg",
    content: [
      "Start with SELECT, WHERE, ORDER BY, and LIMIT.",
      "Move next to joins so you understand how normalized data comes together.",
      "Use indexes carefully after you understand your query patterns."
    ],
    resources: [
      { name: "SQLBolt", url: "https://sqlbolt.com" }
    ],
    createdAt: new Date("2026-01-26T09:00:00.000Z")
  }
];

export const mockRoadmaps: MockRoadmap[] = [
  {
    id: "3788d85d-d1ea-4ae1-b089-e630a9d9c742",
    title: "Full-Stack Web Developer",
    slug: "full-stack-web-developer",
    summary: "A complete path from web fundamentals to a deployed full-stack capstone.",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    milestones: ["HTML/CSS/JavaScript", "React and Next.js", "Node APIs", "Database modeling", "Auth and deployment"],
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
      { name: "Next.js Docs", url: "https://nextjs.org/docs" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Web basics and Git workflow" },
      { week: "Weeks 3-5", focus: "React, routing, and API integration" },
      { week: "Weeks 6-9", focus: "Backend APIs, database, and auth" },
      { week: "Weeks 10-12", focus: "Capstone, testing, and deployment" }
    ],
    createdAt: now
  },
  {
    id: "99e65e0b-a23e-4738-9628-4fcc83a83e43",
    title: "DSA Interview Track",
    slug: "dsa-interview-track",
    summary: "Pattern-based interview preparation with weekly practice goals.",
    duration: "10 weeks",
    level: "Intermediate",
    milestones: ["Arrays and strings", "Stacks and queues", "Trees and recursion", "Graphs", "Dynamic programming"],
    resources: [
      { name: "Big O Notation", url: "https://en.wikipedia.org/wiki/Big_O_notation" },
      { name: "LeetCode", url: "https://leetcode.com" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Arrays, strings, and hashing" },
      { week: "Weeks 3-4", focus: "Stacks, queues, and linked lists" },
      { week: "Weeks 5-7", focus: "Trees, graphs, and recursion" },
      { week: "Weeks 8-10", focus: "Dynamic programming and mock interviews" }
    ],
    createdAt: new Date("2026-01-29T09:00:00.000Z")
  },
  {
    id: "4b21a6bb-1b74-4d1d-a27f-9235e20912ea",
    title: "Backend Engineer",
    slug: "backend-engineer",
    summary: "Build reliable APIs with auth, validation, logging, database design, and deployment.",
    duration: "9 weeks",
    level: "Intermediate",
    milestones: ["HTTP and REST", "Express services", "Prisma and SQL", "JWT auth", "Observability"],
    resources: [
      { name: "Express Guide", url: "https://expressjs.com" },
      { name: "Prisma Docs", url: "https://www.prisma.io/docs" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "HTTP, REST, and routing" },
      { week: "Weeks 3-5", focus: "Database access and validation" },
      { week: "Weeks 6-7", focus: "Auth, errors, and logging" },
      { week: "Weeks 8-9", focus: "Testing and deployment" }
    ],
    createdAt: new Date("2026-01-28T09:00:00.000Z")
  }
];

export const mockUsers: MockUser[] = [
  {
    id: "9c3f3dcc-047c-44d6-85ed-162fb35ae469",
    email: "admin@shreeskills.com",
    passwordHash: bcrypt.hashSync("password123", 10),
    createdAt: now
  }
];

export const mockEnrollments: MockEnrollment[] = [];

export function publicCourse(course: MockCourse) {
  const { id, title, slug, description, level, price, thumbnail } = course;
  return { id, title, slug, description, level, price, thumbnail };
}

export function sortByCreatedAtDesc<T extends { createdAt: Date }>(items: T[]) {
  return [...items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function limitItems<T>(items: T[], take?: number) {
  return typeof take === "number" ? items.slice(0, take) : items;
}
