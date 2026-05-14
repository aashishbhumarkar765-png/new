import { Course } from "./types";

export const demoCourses: Course[] = [
  {
    id: "demo-1",
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    description: "Build production-ready web apps with modern tools and workflows.",
    level: "Beginner",
    price: 0,
    thumbnail: "/images/course-full-stack.svg",
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
      { name: "React Docs", url: "https://react.dev" }
    ]
  },
  {
    id: "demo-2",
    title: "Data Structures and Algorithms",
    slug: "data-structures-algorithms",
    description: "Master problem solving with core data structures and algorithms.",
    level: "Intermediate",
    price: 4999,
    thumbnail: "/images/course-dsa.svg",
    resources: [
      { name: "Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Algorithm" },
      { name: "LeetCode", url: "https://leetcode.com" }
    ]
  },
  {
    id: "demo-3",
    title: "Frontend Engineering",
    slug: "frontend-engineering",
    description: "Advanced UI engineering with performance and accessibility focus.",
    level: "Intermediate",
    price: 3999,
    thumbnail: "/images/course-frontend.svg",
    resources: [
      { name: "Web.dev", url: "https://web.dev" },
      { name: "Accessibility", url: "https://en.wikipedia.org/wiki/Web_accessibility" }
    ]
  },
  {
    id: "demo-4",
    title: "Backend with Node.js",
    slug: "backend-nodejs",
    description: "Design scalable APIs and services using Node and Express.",
    level: "Beginner",
    price: 2999,
    thumbnail: "/images/course-backend.svg",
    resources: [
      { name: "Node.js Docs", url: "https://nodejs.org/en/docs" },
      { name: "Express Guide", url: "https://expressjs.com/en/guide/routing.html" }
    ]
  },
  {
    id: "demo-5",
    title: "System Design Essentials",
    slug: "system-design-essentials",
    description: "Learn the foundations of scalable system design.",
    level: "Advanced",
    price: 5999,
    thumbnail: "/images/course-devops.svg",
    resources: [
      { name: "System design (Wikipedia)", url: "https://en.wikipedia.org/wiki/Systems_design" },
      { name: "CAP theorem", url: "https://en.wikipedia.org/wiki/CAP_theorem" }
    ]
  },
  {
    id: "demo-6",
    title: "React for Professionals",
    slug: "react-for-professionals",
    description: "Build production React apps with strong patterns and testing.",
    level: "Beginner",
    price: 1999,
    thumbnail: "/images/course-ai.svg",
    resources: [
      { name: "React Docs", url: "https://react.dev/learn" },
      { name: "Testing Library", url: "https://testing-library.com/docs/react-testing-library/intro/" }
    ]
  }
];
