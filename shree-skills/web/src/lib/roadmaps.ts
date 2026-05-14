import { Roadmap } from "./types";

export const roadmaps: Roadmap[] = [
  {
    title: "Full-Stack Web Developer (MERN)",
    slug: "full-stack-mern",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    summary: "End-to-end web development with modern tooling and deployment.",
    milestones: [
      "HTML, CSS, JavaScript fundamentals",
      "React + state management",
      "Node.js + Express APIs",
      "MongoDB data modeling",
      "Auth + deployment"
    ],
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
      { name: "React Docs", url: "https://react.dev" },
      { name: "Node.js Docs", url: "https://nodejs.org/en/docs" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Web basics + Git workflow" },
      { week: "Weeks 3-4", focus: "React components + routing" },
      { week: "Weeks 5-6", focus: "State management + API integration" },
      { week: "Weeks 7-8", focus: "Node + Express + REST" },
      { week: "Weeks 9-10", focus: "MongoDB + auth flows" },
      { week: "Weeks 11-12", focus: "Capstone + deployment" }
    ]
  },
  {
    title: "Data Structures & Algorithms (Interview)",
    slug: "dsa-interview",
    duration: "10 weeks",
    level: "Intermediate",
    summary: "Master patterns, complexity, and interview-style problems.",
    milestones: [
      "Arrays, strings, hashing",
      "Stacks, queues, linked lists",
      "Trees, BST, recursion",
      "Graphs + BFS/DFS",
      "Dynamic programming"
    ],
    resources: [
      { name: "Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Algorithm" },
      { name: "Big O notation", url: "https://en.wikipedia.org/wiki/Big_O_notation" },
      { name: "LeetCode", url: "https://leetcode.com" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Arrays + strings + complexity" },
      { week: "Weeks 3-4", focus: "Stacks + queues + linked lists" },
      { week: "Weeks 5-6", focus: "Trees + recursion" },
      { week: "Weeks 7-8", focus: "Graphs + greedy patterns" },
      { week: "Weeks 9-10", focus: "Dynamic programming + mocks" }
    ]
  },
  {
    title: "Java Backend Developer",
    slug: "java-backend",
    duration: "11 weeks",
    level: "Intermediate",
    summary: "Build robust backend services with Java and Spring.",
    milestones: [
      "Java core + OOP",
      "Spring Boot REST APIs",
      "JPA + database design",
      "Security + JWT",
      "Testing + deployment"
    ],
    resources: [
      { name: "Java Docs", url: "https://docs.oracle.com/en/java/" },
      { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
      { name: "JPA Guide", url: "https://www.baeldung.com/jpa" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Java fundamentals + OOP" },
      { week: "Weeks 3-4", focus: "Spring Boot basics" },
      { week: "Weeks 5-6", focus: "JPA + database design" },
      { week: "Weeks 7-8", focus: "Security + JWT" },
      { week: "Weeks 9-11", focus: "Testing + production deployment" }
    ]
  },
  {
    title: "Python + Data Science",
    slug: "python-data-science",
    duration: "10 weeks",
    level: "Beginner to Intermediate",
    summary: "Data wrangling, visualization, and ML foundations.",
    milestones: [
      "Python essentials",
      "Pandas + data cleaning",
      "Visualization with Matplotlib",
      "Statistics + ML basics",
      "Mini projects"
    ],
    resources: [
      { name: "Python Docs", url: "https://docs.python.org/3/" },
      { name: "Pandas", url: "https://pandas.pydata.org/" },
      { name: "Kaggle Learn", url: "https://kaggle.com/learn" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Python fundamentals" },
      { week: "Weeks 3-4", focus: "Pandas + data cleaning" },
      { week: "Weeks 5-6", focus: "Visualization + storytelling" },
      { week: "Weeks 7-8", focus: "Statistics + ML basics" },
      { week: "Weeks 9-10", focus: "Project + case study" }
    ]
  },
  {
    title: "DevOps & Cloud (AWS)",
    slug: "devops-aws",
    duration: "9 weeks",
    level: "Intermediate",
    summary: "CI/CD, containers, and cloud infrastructure.",
    milestones: [
      "Linux + networking",
      "Docker + container basics",
      "CI/CD pipelines",
      "AWS core services",
      "Monitoring + infra as code"
    ],
    resources: [
      { name: "AWS Docs", url: "https://docs.aws.amazon.com/" },
      { name: "Docker Docs", url: "https://docs.docker.com/" },
      { name: "Terraform", url: "https://developer.hashicorp.com/terraform/docs" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Linux + networking" },
      { week: "Weeks 3-4", focus: "Docker + containerization" },
      { week: "Weeks 5-6", focus: "CI/CD pipelines" },
      { week: "Weeks 7-8", focus: "AWS core services" },
      { week: "Week 9", focus: "Monitoring + IaC basics" }
    ]
  },
  {
    title: "AI/ML Foundations",
    slug: "ai-ml-foundations",
    duration: "8 weeks",
    level: "Beginner",
    summary: "Concepts, models, and hands-on projects for ML.",
    milestones: [
      "Math + ML intuition",
      "Supervised learning",
      "Unsupervised learning",
      "Model evaluation",
      "Mini ML project"
    ],
    resources: [
      { name: "Machine Learning (Wikipedia)", url: "https://en.wikipedia.org/wiki/Machine_learning" },
      { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
      { name: "Fast.ai", url: "https://www.fast.ai/" }
    ],
    timeline: [
      { week: "Weeks 1-2", focus: "Math + ML intuition" },
      { week: "Weeks 3-4", focus: "Supervised learning" },
      { week: "Weeks 5-6", focus: "Unsupervised learning" },
      { week: "Weeks 7-8", focus: "Evaluation + mini project" }
    ]
  }
];
