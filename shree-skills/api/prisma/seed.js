"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const courses = [
        {
            title: "Full Stack Web Development",
            slug: "full-stack-web-development",
            description: "Build production-ready web apps with modern tools and workflows.",
            level: "Beginner",
            price: 0,
            thumbnail: "https://picsum.photos/seed/full-stack-web-development/800/450",
            resources: [
                { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
                { name: "React Documentation", url: "https://react.dev" },
                { name: "Node.js Guide", url: "https://nodejs.org/en/docs/guides/" }
            ]
        },
        {
            title: "Data Structures and Algorithms",
            slug: "data-structures-algorithms",
            description: "Master problem solving with core data structures and algorithms.",
            level: "Intermediate",
            price: 4999,
            thumbnail: "https://picsum.photos/seed/data-structures-algorithms/800/450",
            resources: [
                { name: "Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Algorithm" },
                { name: "Big O notation", url: "https://en.wikipedia.org/wiki/Big_O_notation" },
                { name: "MIT OCW Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" }
            ]
        },
        {
            title: "Frontend Engineering",
            slug: "frontend-engineering",
            description: "Advanced UI engineering with performance and accessibility focus.",
            level: "Intermediate",
            price: 3999,
            thumbnail: "https://picsum.photos/seed/frontend-engineering/800/450",
            resources: [
                { name: "Web.dev", url: "https://web.dev" },
                { name: "Web performance", url: "https://developer.mozilla.org/en-US/docs/Web/Performance" },
                { name: "Accessibility", url: "https://en.wikipedia.org/wiki/Web_accessibility" }
            ]
        },
        {
            title: "Backend with Node.js",
            slug: "backend-nodejs",
            description: "Design scalable APIs and services using Node and Express.",
            level: "Beginner",
            price: 2999,
            thumbnail: "https://picsum.photos/seed/backend-nodejs/800/450",
            resources: [
                { name: "Node.js Docs", url: "https://nodejs.org/en/docs" },
                { name: "REST (Wikipedia)", url: "https://en.wikipedia.org/wiki/Representational_state_transfer" },
                { name: "Express Guide", url: "https://expressjs.com/en/guide/routing.html" }
            ]
        },
        {
            title: "System Design Essentials",
            slug: "system-design-essentials",
            description: "Learn the foundations of scalable system design.",
            level: "Advanced",
            price: 5999,
            thumbnail: "https://picsum.photos/seed/system-design-essentials/800/450",
            resources: [
                { name: "System design (Wikipedia)", url: "https://en.wikipedia.org/wiki/Systems_design" },
                { name: "Scalability", url: "https://en.wikipedia.org/wiki/Scalability" },
                { name: "CAP theorem", url: "https://en.wikipedia.org/wiki/CAP_theorem" }
            ]
        },
        {
            title: "React for Professionals",
            slug: "react-for-professionals",
            description: "Build production React apps with strong patterns and testing.",
            level: "Beginner",
            price: 1999,
            thumbnail: "https://picsum.photos/seed/react-for-professionals/800/450",
            resources: [
                { name: "React Docs", url: "https://react.dev/learn" },
                { name: "Virtual DOM", url: "https://en.wikipedia.org/wiki/Virtual_DOM" },
                { name: "Testing Library", url: "https://testing-library.com/docs/react-testing-library/intro/" }
            ]
        }
    ];
    const roadmaps = [
        {
            title: "Full-Stack Web Developer (MERN)",
            slug: "full-stack-mern",
            summary: "End-to-end web development with modern tooling and deployment.",
            duration: "12 weeks",
            level: "Beginner to Intermediate",
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
            summary: "Master patterns, complexity, and interview-style problems.",
            duration: "10 weeks",
            level: "Intermediate",
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
            summary: "Build robust backend services with Java and Spring.",
            duration: "11 weeks",
            level: "Intermediate",
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
            summary: "Data wrangling, visualization, and ML foundations.",
            duration: "10 weeks",
            level: "Beginner to Intermediate",
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
            summary: "CI/CD, containers, and cloud infrastructure.",
            duration: "9 weeks",
            level: "Intermediate",
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
            summary: "Concepts, models, and hands-on projects for ML.",
            duration: "8 weeks",
            level: "Beginner",
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
    const blogs = [
        {
            title: "Learn English for Interviews: 30-Day Plan",
            slug: "english-interviews-30-day-plan",
            excerpt: "A practical daily plan to improve spoken English and interview confidence.",
            tags: ["English", "Career"],
            readTime: "6 min",
            date: "2026-01-05",
            hero: "https://picsum.photos/seed/english-interviews-30-day-plan/1200/600",
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
            hero: "https://picsum.photos/seed/spoken-english-daily-routine/1200/600",
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
            hero: "https://picsum.photos/seed/german-a1-roadmap/1200/600",
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
            hero: "https://picsum.photos/seed/japanese-for-beginners/1200/600",
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
            hero: "https://picsum.photos/seed/start-dsa-from-zero/1200/600",
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
            hero: "https://picsum.photos/seed/frontend-vs-backend-what-to-choose/1200/600",
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
            hero: "https://picsum.photos/seed/resume-projects-that-get-you-hired/1200/600",
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
            hero: "https://picsum.photos/seed/sql-for-beginners/1200/600",
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
            hero: "https://picsum.photos/seed/git-github-in-1-week/1200/600",
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
            hero: "https://picsum.photos/seed/learn-faster-with-projects/1200/600",
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
    for (const course of courses) {
        await prisma.course.upsert({
            where: { slug: course.slug },
            update: course,
            create: course
        });
    }
    for (const roadmap of roadmaps) {
        await prisma.roadmap.upsert({
            where: { slug: roadmap.slug },
            update: roadmap,
            create: roadmap
        });
    }
    for (const blog of blogs) {
        await prisma.blog.upsert({
            where: { slug: blog.slug },
            update: blog,
            create: blog
        });
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
