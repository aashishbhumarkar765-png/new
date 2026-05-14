import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const WORDS_PER_MINUTE = 200;

const fillerParagraphs = [
  "Deliberate practice is the fastest way to grow in {{topic}} because it forces you to isolate a skill, repeat it with feedback, and then raise the difficulty. Write down what you want to get better at, design a 20 minute drill, and review the result with a checklist. Keep the checklist short so you can use it every day. If you want the science behind this approach, read https://en.wikipedia.org/wiki/Deliberate_practice and compare your routine to the examples there. When you consistently cycle through plan, execute, and reflect, you create steady momentum instead of relying on motivation.",
  "Use a lightweight project tracker to stay honest about progress in {{topic}}. A simple Kanban board with columns for backlog, doing, review, and done will keep the work visible. You can model the flow on https://en.wikipedia.org/wiki/Kanban and then adapt it to your schedule. The key is to keep items small and measurable. Finish the smallest possible slice, verify it works, and then move on. This habit creates confidence because you can see concrete wins every day.",
  "Communication is part of the craft, not a soft add on. When you explain {{topic}} clearly, you expose the gaps in your own understanding and you build trust with teammates or clients. Practice concise summaries, quick demos, and a simple problem, approach, result story. The fundamentals of clear messaging are well covered at https://en.wikipedia.org/wiki/Communication. Treat your explanations like a product: test them with real people, refine the structure, and remove anything that distracts from the point.",
  "Quality is what makes {{topic}} feel professional. Build a small checklist for testing, validation, and documentation, then use it every time. Even simple verification steps reduce errors and save hours later. A good starting point is https://en.wikipedia.org/wiki/Software_testing, which outlines why coverage, repeatability, and feedback matter. You do not need heavyweight tools to start; a well structured manual test script and a few automated checks are enough to improve reliability.",
  "Scale is not only about traffic, it is also about the number of changes you can safely ship in {{topic}}. Learn to measure the cost of change, identify bottlenecks, and design for graceful degradation. https://en.wikipedia.org/wiki/Scalability provides a useful mental model for understanding tradeoffs and capacity. Start by defining a performance budget, then track the metrics that matter to users, and make improvements in small increments.",
  "Memory is strengthened by spacing and retrieval, not by rereading the same notes. For {{topic}}, create a short weekly review that forces you to recall key ideas without looking, and then check yourself. The concept is described at https://en.wikipedia.org/wiki/Spaced_repetition. Combine this with a growing library of examples, and your understanding will become durable enough to use under pressure."
];

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function withTopic(text: string, topic: string) {
  return text.replace(/\{\{topic\}\}/g, topic);
}

function ensureWordCount(content: string[], target: number, topic: string) {
  let total = content.reduce((sum, item) => sum + countWords(item), 0);
  let idx = 0;
  while (total < target) {
    const paragraph = withTopic(fillerParagraphs[idx % fillerParagraphs.length], topic);
    content.push(paragraph);
    total += countWords(paragraph);
    idx += 1;
  }
  return content;
}

function buildReadTime(content: string[]) {
  const words = content.reduce((sum, item) => sum + countWords(item), 0);
  const minutes = Math.max(12, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

type Section = {
  title: string;
  paragraphs: string[];
  image?: { url: string; caption?: string };
  code?: { language: string; code: string };
  quote?: string;
};

type BlogSeed = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  date: string;
  hero: string;
  topic: string;
  intro: string[];
  sections: Section[];
  resources: { name: string; url: string }[];
};

function buildBlogContent(seed: BlogSeed, targetWords: number) {
  const content: string[] = [];
  content.push(...seed.intro);
  seed.sections.forEach((section) => {
    content.push(`H2: ${section.title}`);
    section.paragraphs.forEach((paragraph) => {
      content.push(paragraph);
    });
    if (section.quote) {
      content.push(`QUOTE: ${section.quote}`);
    }
    if (section.image) {
      const caption = section.image.caption ? ` | ${section.image.caption}` : "";
      content.push(`IMAGE: ${section.image.url}${caption}`);
    }
    if (section.code) {
      content.push(`CODE:${section.code.language}\n${section.code.code}`);
    }
  });
  return ensureWordCount(content, targetWords, seed.topic);
}

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.enrollment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users (optional)
  let user1: { id: string } | null = null;
  let user2: { id: string } | null = null;
  if (process.env.SEED_USERS === 'true') {
    console.log('Creating seed users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    user1 = await prisma.user.create({
      data: {
        email: 'admin@shreeskills.com',
        passwordHash: hashedPassword,
      },
    });

    user2 = await prisma.user.create({
      data: {
        email: 'user@example.com',
        passwordHash: hashedPassword,
      },
    });

    console.log('Created seed users');
  }

  // Seed Courses
  console.log('📚 Creating courses...');
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Full Stack Web Development',
        slug: 'full-stack-web-development',
        description: 'Build production-ready web apps with modern tools and workflows. Learn HTML, CSS, JavaScript, React, Node.js, and databases.',
        level: 'Beginner',
        price: 0,
        thumbnail: 'https://picsum.photos/seed/full-stack-web-development/800/450',
        resources: [
          { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { name: 'React Documentation', url: 'https://react.dev' },
          { name: 'Node.js Guide', url: 'https://nodejs.org/en/docs/guides/' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Data Structures and Algorithms',
        slug: 'data-structures-algorithms',
        description: 'Master problem solving with core data structures and algorithms. Essential for technical interviews.',
        level: 'Intermediate',
        price: 4999,
        thumbnail: 'https://picsum.photos/seed/data-structures-algorithms/800/450',
        resources: [
          { name: 'LeetCode', url: 'https://leetcode.com' },
          { name: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
          { name: 'MIT OCW Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Frontend Engineering',
        slug: 'frontend-engineering',
        description: 'Advanced UI engineering with performance and accessibility focus. Modern frameworks and best practices.',
        level: 'Intermediate',
        price: 3999,
        thumbnail: 'https://picsum.photos/seed/frontend-engineering/800/450',
        resources: [
          { name: 'Web.dev', url: 'https://web.dev' },
          { name: 'CSS-Tricks', url: 'https://css-tricks.com' },
          { name: 'A11Y Project', url: 'https://a11yproject.com' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Backend with Node.js',
        slug: 'backend-nodejs',
        description: 'Design scalable APIs and services using Node and Express. RESTful APIs, authentication, and databases.',
        level: 'Beginner',
        price: 2999,
        thumbnail: 'https://picsum.photos/seed/backend-nodejs/800/450',
        resources: [
          { name: 'Express.js Guide', url: 'https://expressjs.com/en/guide/' },
          { name: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' },
          { name: 'REST API Tutorial', url: 'https://restfulapi.net' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'System Design Essentials',
        slug: 'system-design-essentials',
        description: 'Learn the foundations of scalable system design. Architecture patterns, scalability, and reliability.',
        level: 'Advanced',
        price: 5999,
        thumbnail: 'https://picsum.photos/seed/system-design-essentials/800/450',
        resources: [
          { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
          { name: 'AWS Architecture Center', url: 'https://aws.amazon.com/architecture/' },
          { name: 'Martin Fowler', url: 'https://martinfowler.com' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'React for Professionals',
        slug: 'react-for-professionals',
        description: 'Build production React apps with strong patterns and testing. Hooks, Context, and advanced concepts.',
        level: 'Beginner',
        price: 1999,
        thumbnail: 'https://picsum.photos/seed/react-for-professionals/800/450',
        resources: [
          { name: 'React Documentation', url: 'https://react.dev' },
          { name: 'Testing Library', url: 'https://testing-library.com/docs/react-testing-library/intro/' },
          { name: 'Kent C. Dodds Blog', url: 'https://kentcdodds.com/blog' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'AI Product Builder',
        slug: 'ai-product-builder',
        description: 'Ship AI-powered features with prompt design, evaluation, and safe deployment patterns.',
        level: 'Intermediate',
        price: 4499,
        thumbnail: 'https://picsum.photos/seed/ai-product-builder/800/450',
        resources: [
          { name: 'Machine learning (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Machine_learning' },
          { name: 'Prompt engineering (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Prompt_engineering' },
          { name: 'OpenAI Cookbook', url: 'https://cookbook.openai.com' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Cloud Deployment Mastery',
        slug: 'cloud-deployment-mastery',
        description: 'Deploy, monitor, and scale applications with modern cloud tooling and best practices.',
        level: 'Intermediate',
        price: 3999,
        thumbnail: 'https://picsum.photos/seed/cloud-deployment/800/450',
        resources: [
          { name: 'Cloud computing (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Cloud_computing' },
          { name: 'AWS Well-Architected Framework', url: 'https://aws.amazon.com/architecture/well-architected/' },
          { name: 'Docker Docs', url: 'https://docs.docker.com/' }
        ],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Product Design for Engineers',
        slug: 'product-design-for-engineers',
        description: 'Design usable interfaces, define user flows, and build visual systems that scale.',
        level: 'Beginner',
        price: 2999,
        thumbnail: 'https://picsum.photos/seed/product-design-engineers/800/450',
        resources: [
          { name: 'User experience design (Wikipedia)', url: 'https://en.wikipedia.org/wiki/User_experience_design' },
          { name: 'Design system (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Design_system' },
          { name: 'A11Y Project', url: 'https://a11yproject.com' }
        ],
      },
    }),
  ]);

  console.log(`✅ Created ${courses.length} courses`);

  // Seed Blogs
  console.log('Creating blogs...');
  const blogSeeds: BlogSeed[] = [
    {
      title: 'Full-Stack Launchpad: Build a Production-Ready Web App in 12 Weeks',
      slug: 'full-stack-launchpad-12-week-plan',
      excerpt: 'A detailed, end-to-end blueprint to ship a polished full-stack product and turn it into a strong portfolio story.',
      tags: ['Full Stack', 'Roadmap', 'Portfolio'],
      date: '2026-01-30',
      hero: 'https://picsum.photos/seed/full-stack-launchpad/1200/600',
      topic: 'full-stack product development',
      intro: [
        'H2: Overview',
        'This guide is a practical blueprint for learners who want to build a production-ready web application from scratch. It covers discovery, design, implementation, testing, and launch, with a steady pace that you can follow in twelve focused weeks. The intent is to help you learn the workflow used by professional teams while producing a result that looks and feels real to users.',
        'We will connect frontend and backend tasks into one cohesive plan. You will map the product story, build a simple data model, design a clean interface, and implement reliable APIs. Along the way, we point to fundamentals such as https://en.wikipedia.org/wiki/Web_application and https://en.wikipedia.org/wiki/Software_engineering so you can dive deeper into the concepts that power the work.',
        'H2: The outcome you are aiming for',
        'A strong portfolio app proves that you can design a system, not just complete a tutorial. It should have a clear audience, a data-driven feature set, and at least one problem-solving story. Think of a learning tracker, a scheduling tool, or a community knowledge hub. The purpose of this article is to help you get to that finish line with clarity and consistency.'
      ],
      sections: [
        {
          title: 'Define the product narrative and user path',
          paragraphs: [
            'Start by writing a one page narrative describing who your user is, the primary pain they feel, and the single outcome your app promises. This is not marketing fluff. It is the guide you will use when you are deciding features, interface layout, and data structure. A short narrative keeps scope under control and improves decision quality later.',
            'Next, sketch the core path a user takes. For example, if the app is a learning tracker, the path might be: sign up, create a goal, log a session, view progress, and share results. Keep the path narrow and efficient. The best early version of a product is simple, consistent, and easy to explain in two sentences.',
            'Write user stories for the path and list the data each story needs. This step will map directly into your database schema. If you want to understand how user stories relate to product development, read https://en.wikipedia.org/wiki/User_story and note the emphasis on outcomes rather than implementation details.'
          ],
          quote: 'Great products begin with a clear narrative, not a long feature list.',
          image: {
            url: 'https://picsum.photos/seed/full-stack-journey/1200/700',
            caption: 'Plan the user journey before writing any code.'
          }
        },
        {
          title: 'Weeks 1-2: Foundations, tooling, and system map',
          paragraphs: [
            'Set up your development environment with a clear folder structure, a linting setup, and a predictable workflow. Decide how the frontend and backend will talk, and define the endpoints before you build screens. This reduces rework and makes the backend feel connected rather than an afterthought.',
            'Create a simple system diagram that shows the browser, the API, and the database. Place the key features on the diagram so you can see how data moves. Even a basic block diagram is powerful because it keeps the architecture honest and avoids hidden complexity.',
            'Read about client server architecture at https://en.wikipedia.org/wiki/Client%E2%80%93server_model and compare it to your design. Keep your system small, but design it as if it could grow. That will make your code more disciplined.'
          ]
        },
        {
          title: 'Weeks 3-5: Frontend architecture and design system',
          paragraphs: [
            'Build the user interface with reusable components. Start with a typography scale and spacing system. Choose a primary color, an accent color, and a subtle background. This keeps the UI cohesive even if you are not a professional designer.',
            'Create a small component library: buttons, cards, form fields, and alert states. This helps you ship faster later. As you build, measure accessibility early so you avoid fixing it at the end. A good introduction to inclusive design is https://en.wikipedia.org/wiki/Web_accessibility.',
            'When you connect the UI to real data, always handle loading and empty states. These details make the product feel finished and trustworthy. In professional work, these states are the difference between a prototype and a release.'
          ],
          image: {
            url: 'https://picsum.photos/seed/frontend-system/1200/700',
            caption: 'Define reusable components so the interface stays consistent.'
          }
        },
        {
          title: 'Weeks 6-8: Backend, database, and API design',
          paragraphs: [
            'Define your data model using a small set of tables with clear relationships. Focus on the data you need to show a user outcome rather than building every future feature. As you design, read https://en.wikipedia.org/wiki/Database and check that each table maps to a real user need.',
            'Design your REST endpoints with the user journey in mind. Each step in the journey should map to a short, explicit API call. The basics of REST design are summarized at https://en.wikipedia.org/wiki/Representational_state_transfer.',
            'Implement the API with careful validation, meaningful error messages, and consistent response shapes. These details make frontend integration smooth and reduce time wasted on debugging.'
          ],
          code: {
            language: 'ts',
            code: `import express from "express";

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/sessions", (req, res) => {
  const { title, duration } = req.body;
  if (!title || !duration) {
    return res.status(400).json({ error: "Title and duration are required" });
  }
  return res.status(201).json({ id: "session-1", title, duration });
});

app.listen(4000, () => console.log("API running"));`
          }
        },
        {
          title: 'Weeks 9-10: Integrations, quality, and reliability',
          paragraphs: [
            'Integrations are where real-world apps often fail. Add authentication, file uploads, or third-party APIs only after the core loop is stable. Keep the integration surface small, and test with realistic data.',
            'Add a simple test plan that covers the main flow, error states, and data validations. Read https://en.wikipedia.org/wiki/Test_plan to understand why structured testing prevents regressions.',
            'Document the API and the main UI flows. Even short documentation helps reviewers understand your thinking and makes your work feel professional.'
          ]
        },
        {
          title: 'Weeks 11-12: Launch, polish, and portfolio packaging',
          paragraphs: [
            'Ship the app with a clean deployment setup, a public demo link, and a short write-up. Capture screenshots and write a short case study with sections for problem, approach, and results.',
            'Prepare a one minute demo script. This matters because interviews often begin with a quick project walkthrough. Focus on the value delivered and the technical choices, not every feature.',
            'Link your case study to concepts like https://en.wikipedia.org/wiki/User_experience_design so reviewers see that you understand both product and engineering.'
          ],
          image: {
            url: 'https://picsum.photos/seed/launch-plan/1200/700',
            caption: 'Package the work as a story, not just a repository.'
          }
        },
        {
          title: 'Career proof: turning the build into a strong interview story',
          paragraphs: [
            'Prepare a simple narrative: problem, constraints, approach, tradeoffs, result. Use numbers where possible. Example: reduced manual time by 40 percent, or built a dashboard that surfaces weekly trends.',
            'Map your skills to the feature work. Show how you used state management, API integration, data modeling, and UI polish. The clarity of your story often matters as much as the feature list.',
            'Finally, link the work to the actual role you want. A portfolio is most powerful when it mirrors the job description and proves you can deliver in that environment.'
          ]
        }
      ],
      resources: [
        { name: 'Web application (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Web_application' },
        { name: 'Software engineering (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Software_engineering' },
        { name: 'Database (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Database' },
        { name: 'Representational state transfer (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Representational_state_transfer' },
        { name: 'User experience design (Wikipedia)', url: 'https://en.wikipedia.org/wiki/User_experience_design' }
      ]
    },
    {
      title: 'Data Structures and Algorithms in Practice: A Problem-Solving Roadmap',
      slug: 'dsa-practice-roadmap',
      excerpt: 'A deep, hands-on guide that turns theory into problem-solving skill with patterns, drills, and project-style practice.',
      tags: ['DSA', 'Interview', 'Engineering'],
      date: '2026-01-30',
      hero: 'https://picsum.photos/seed/dsa-roadmap/1200/600',
      topic: 'data structures and algorithms practice',
      intro: [
        'H2: Overview',
        'Data structures and algorithms are about thinking clearly under constraints. This guide is designed for learners who want real problem-solving ability, not just the ability to memorize solutions. We will focus on patterns, reasoning, and repetition in a way that makes interviews and real engineering tasks feel manageable.',
        'If you have been stuck in tutorial loops, this plan shifts you into a project style routine. You will build mental models, run targeted drills, and document your decisions. Along the way, revisit fundamentals like https://en.wikipedia.org/wiki/Data_structure and https://en.wikipedia.org/wiki/Algorithm so the theory stays connected to real tasks.',
        'H2: How to use this roadmap',
        'Set a weekly cadence: learn a concept, solve targeted problems, and then build a small application or visualization that uses the same idea. The feedback loop should be short. The goal is not perfection, it is consistent improvement.'
      ],
      sections: [
        {
          title: 'The role of complexity and tradeoffs',
          paragraphs: [
            'Start with complexity because it explains why one solution is better than another. Learn the intuition behind Big O rather than memorizing the letters. Compare your approach to the plain language explanation at https://en.wikipedia.org/wiki/Big_O_notation.',
            'Once you understand time and space tradeoffs, you can reason about performance in everyday tasks. For example, use arrays when you need fast iteration and hash maps when you need quick lookups. Your choices should always be tied to the constraints of the problem.',
            'Make a habit of writing down the complexity of every solution you submit. It forces you to be intentional and builds the habit interviewers expect.'
          ],
          quote: 'Every optimization is a tradeoff. Your job is to pick the right one for the constraints.'
        },
        {
          title: 'Core structures and when to reach for them',
          paragraphs: [
            'Build a quick reference that lists arrays, strings, linked lists, stacks, queues, hash maps, trees, and graphs. For each item, write the operations you need most and the typical time complexity.',
            'Practice mapping real-world tasks to structures. A task queue maps to a queue, a navigation path maps to a graph, and a browser history maps to a stack. This mental mapping reduces confusion during interviews.',
            'Read more about trees and graphs at https://en.wikipedia.org/wiki/Tree_(data_structure) and https://en.wikipedia.org/wiki/Graph_(abstract_data_type) to connect the vocabulary to the ideas you are implementing.'
          ],
          image: {
            url: 'https://picsum.photos/seed/dsa-structures/1200/700',
            caption: 'Build a mental map from problem types to data structures.'
          }
        },
        {
          title: 'Problem-solving patterns that repeat everywhere',
          paragraphs: [
            'Patterns reduce cognitive load. Sliding window is great for contiguous subarray problems, two pointers help with sorted data, and BFS or DFS applies to traversal tasks. Create a sheet of patterns and attach example problems to each.',
            'Work the same pattern across three difficulty levels: easy, medium, and hard. This builds depth and makes the pattern feel natural under pressure.',
            'When you get stuck, narrate the pattern out loud. This helps you notice where your reasoning breaks and reinforces the sequence of steps you need.'
          ]
        },
        {
          title: 'Demo program: BFS shortest path',
          paragraphs: [
            'A practical way to internalize traversal is to build a short path solver on a grid. The code below uses BFS to find the shortest path length. You can extend it by storing parents to reconstruct the full path.'
          ],
          code: {
            language: 'py',
            code: `from collections import deque

def shortest_path(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start[0], start[1], 0)])
    visited = set([start])
    directions = [(1,0), (-1,0), (0,1), (0,-1)]

    while queue:
        r, c, dist = queue.popleft()
        if (r, c) == end:
            return dist
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                if (nr, nc) not in visited:
                    visited.add((nr, nc))
                    queue.append((nr, nc, dist + 1))
    return -1`
          }
        },
        {
          title: 'Practice loop: solve, reflect, repeat',
          paragraphs: [
            'Solve a problem, then immediately write down what went well and what felt confusing. Reflection is where learning becomes stable.',
            'Build a small journal of patterns and edge cases. Over time, this becomes a personal playbook that speeds up your thinking.',
            'Use spaced repetition for problems you struggled with, and revisit them after a few days to check if the solution still feels natural.'
          ],
          image: {
            url: 'https://picsum.photos/seed/dsa-practice/1200/700',
            caption: 'Reflection turns problem attempts into lasting skill.'
          }
        },
        {
          title: 'Interview day strategy and communication',
          paragraphs: [
            'During interviews, clarity is more valuable than speed. Narrate your plan, define assumptions, and state complexity clearly. This mirrors how real teams make decisions.',
            'If you are stuck, explain what you tried and why it failed. Many interviewers reward transparent reasoning.',
            'Remember that interviews also test communication. Practice explaining why a certain structure fits the problem and how you ruled out alternatives.'
          ]
        }
      ],
      resources: [
        { name: 'Data structure (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Data_structure' },
        { name: 'Algorithm (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Algorithm' },
        { name: 'Big O notation (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Big_O_notation' },
        { name: 'Graph (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Graph_(abstract_data_type)' },
        { name: 'LeetCode', url: 'https://leetcode.com' }
      ]
    },
    {
      title: 'English for Tech Interviews: Speak With Clarity, Confidence, and Structure',
      slug: 'english-for-tech-interviews-playbook',
      excerpt: 'A long-form communication playbook that helps engineers deliver clear, confident interview answers with daily practice routines.',
      tags: ['English', 'Career', 'Communication'],
      date: '2026-01-30',
      hero: 'https://picsum.photos/seed/english-interviews-playbook/1200/600',
      topic: 'spoken English for technical interviews',
      intro: [
        'H2: Overview',
        'Technical interviews are not only about correctness. They also test how clearly you think and how confidently you communicate. This guide is designed to help you build that communication muscle with a structured routine and practical examples.',
        'We focus on vocabulary, pacing, and story structure so you can explain complex ideas without losing your listener. For deeper context, see https://en.wikipedia.org/wiki/Job_interview and https://en.wikipedia.org/wiki/Communication to understand how clarity affects outcomes.',
        'H2: The mindset shift',
        'Instead of chasing perfect grammar, aim for clear meaning. Your goal is to be understood and to show organized thinking. This is the same skill you use when you explain a bug, write a pull request, or give a team update.'
      ],
      sections: [
        {
          title: 'Build a library of structured responses',
          paragraphs: [
            'Create a set of short stories that highlight your projects, a challenge you solved, and a mistake you fixed. Each story should follow the same structure: situation, task, action, result. This is often called the STAR method.',
            'Practice by writing the story in 8 to 10 sentences and then speaking it aloud. Focus on verbs and outcomes. Avoid long sentences and filler words.',
            'To see why this structure works, review https://en.wikipedia.org/wiki/Storytelling and notice how a clear arc keeps listeners engaged.'
          ],
          quote: 'Clarity is a skill you can train. Confidence follows clarity.'
        },
        {
          title: 'Vocabulary for engineering explanations',
          paragraphs: [
            'Prepare a list of verbs that describe your work clearly: designed, implemented, optimized, validated, debugged, automated, measured. These verbs are powerful because they show action and ownership.',
            'Pair every verb with an outcome: reduced build time, improved reliability, simplified onboarding, or clarified requirements. This combination makes your answers sound professional and specific.',
            'Use Wikipedia as a neutral vocabulary source when you need to learn domain terms quickly, for example https://en.wikipedia.org/wiki/Software_documentation or https://en.wikipedia.org/wiki/Software_quality.'
          ]
        },
        {
          title: 'Daily speaking workflow you can repeat',
          paragraphs: [
            'Spend ten minutes every day answering one technical question out loud. Record yourself, listen, and write one improvement note. This loop is simple and effective.',
            'Next, do a five minute paraphrase exercise. Take a small article or a code snippet and explain it in your own words. This builds flexibility and reduces fear of complex topics.',
            'Finally, do a three minute summary of your day. This creates fluency and keeps your communication warm even when you are busy.'
          ],
          image: {
            url: 'https://picsum.photos/seed/english-practice/1200/700',
            caption: 'Short daily routines build confidence faster than rare long sessions.'
          }
        },
        {
          title: 'Demo program: daily prompt generator',
          paragraphs: [
            'The short script below creates a set of practice prompts. Run it once per day and answer one prompt aloud. Over time, you will cover both technical and behavioral questions.'
          ],
          code: {
            language: 'js',
            code: `const prompts = [
  "Explain a project you are proud of and the tradeoffs you made.",
  "Describe a bug you fixed and how you found the root cause.",
  "Walk through a time you optimized performance or cost.",
  "Explain a concept like caching or rate limiting to a beginner."
];

const pick = prompts[Math.floor(Math.random() * prompts.length)];
console.log("Today's prompt:", pick);`
          }
        },
        {
          title: 'Live interview simulation and feedback',
          paragraphs: [
            'Once per week, simulate a full interview with a friend or mentor. Treat it seriously: set a timer, answer out loud, and ask for feedback on clarity and structure.',
            'Focus on three elements: pacing, structure, and outcomes. If you speak too fast, slow down and pause between sections. If your answer lacks structure, use headings like problem, approach, result.',
            'Use the feedback to adjust your daily routine and keep the improvements visible.'
          ]
        },
        {
          title: 'Confidence under pressure',
          paragraphs: [
            'Confidence is not a personality trait. It is the result of rehearsal. When you know your stories and your structure, you can focus on the conversation instead of the fear.',
            'Build a short pre-interview checklist: review your top three stories, practice one technical explanation, and take two minutes to breathe. These small steps reduce anxiety and improve clarity.',
            'Over time, the interview becomes familiar. You are no longer guessing what to say because you have already practiced the patterns.'
          ],
          image: {
            url: 'https://picsum.photos/seed/interview-confidence/1200/700',
            caption: 'Repetition and structure replace anxiety with calm focus.'
          }
        }
      ],
      resources: [
        { name: 'Job interview (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Job_interview' },
        { name: 'Communication (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Communication' },
        { name: 'Public speaking (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Public_speaking' },
        { name: 'Storytelling (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Storytelling' },
        { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish' }
      ]
    },
    {
      title: 'From Idea to MVP: A Founder-Friendly Product Blueprint',
      slug: 'idea-to-mvp-blueprint',
      excerpt: 'A complete playbook for turning an idea into a validated MVP with clear UX, real users, and measurable outcomes.',
      tags: ['Product', 'Startup', 'UX'],
      date: '2026-01-30',
      hero: 'https://picsum.photos/seed/idea-to-mvp/1200/600',
      topic: 'building a startup MVP',
      intro: [
        'H2: Overview',
        'Great MVPs are not small versions of big products. They are fast experiments designed to validate a real user problem. This guide walks through the workflow: framing the problem, identifying the smallest test, and building only what you need to learn.',
        'We will lean on concepts like https://en.wikipedia.org/wiki/Minimum_viable_product and https://en.wikipedia.org/wiki/Lean_startup to keep the process grounded. The focus is practical: ship something in weeks, not months.',
        'H2: What makes an MVP successful',
        'Success is learning, not perfection. You want to measure user behavior, not collect opinions. The best MVPs create a clear user action that you can track and improve.'
      ],
      sections: [
        {
          title: 'Define the problem and the user',
          paragraphs: [
            'Start with one user segment and one pain point. Write it in plain language, then validate it with five short interviews. These interviews should be about the workflow, not your solution.',
            'Summarize your findings in a single statement: “Users struggle to ___ when they are trying to ___.” This statement becomes your product north star.',
            'If you want a structured approach, see https://en.wikipedia.org/wiki/User_experience for how user research frames product decisions.'
          ],
          quote: 'A focused user problem beats a long feature list every time.'
        },
        {
          title: 'Design the smallest measurable workflow',
          paragraphs: [
            'Sketch the path from landing page to action in three to five steps. Remove everything that does not move the user to the core outcome.',
            'Define one metric that represents success. It could be a signup, a completed task, or a recurring action. Track it consistently.',
            'Review https://en.wikipedia.org/wiki/Conversion_rate_optimization for ideas on measuring and improving the funnel.'
          ],
          image: {
            url: 'https://picsum.photos/seed/mvp-flow/1200/700',
            caption: 'A short workflow is easier to ship and measure.'
          }
        },
        {
          title: 'Build the MVP with clean data boundaries',
          paragraphs: [
            'The fastest MVP still needs a reliable backend. Keep your data model small and well defined. Store only what you need to deliver the core outcome.',
            'Use a simple API layer with consistent response shapes. This makes the UI easy to build and reduces integration bugs.',
            'Review https://en.wikipedia.org/wiki/Database_normalization if you need to structure relational data without over-engineering.'
          ],
          code: {
            language: 'ts',
            code: `type SignupEvent = { userId: string; source: string; createdAt: string };

const toSignupEvent = (userId: string, source: string): SignupEvent => ({
  userId,
  source,
  createdAt: new Date().toISOString()
});`
          }
        },
        {
          title: 'Launch, measure, iterate',
          paragraphs: [
            'Launch to a small audience and watch real behavior. Look for drop-off points in the funnel, then fix one issue at a time.',
            'Share a short changelog with users, and use feedback to prioritize the next iteration. This keeps momentum high and builds trust.',
            'For a deeper look at iteration cycles, see https://en.wikipedia.org/wiki/Feedback.'
          ],
          image: {
            url: 'https://picsum.photos/seed/mvp-launch/1200/700',
            caption: 'Small iterations deliver faster learning.'
          }
        },
        {
          title: 'Interlink learning resources',
          paragraphs: [
            'If you are exploring product strategy, review https://en.wikipedia.org/wiki/Product_management and map those ideas to your roadmap.',
            'For UI inspiration and patterns, study https://en.wikipedia.org/wiki/User_interface_design and keep a swipe file of flows you like.'
          ]
        }
      ],
      resources: [
        { name: 'Minimum viable product (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Minimum_viable_product' },
        { name: 'Lean startup (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lean_startup' },
        { name: 'Product management (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Product_management' },
        { name: 'User interface design (Wikipedia)', url: 'https://en.wikipedia.org/wiki/User_interface_design' },
        { name: 'Conversion rate optimization (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Conversion_rate_optimization' }
      ]
    }
  ];

  const blogs = await Promise.all(
    blogSeeds.map((seed) => {
      const content = buildBlogContent(seed, 3100);
      return prisma.blog.create({
        data: {
          title: seed.title,
          slug: seed.slug,
          excerpt: seed.excerpt,
          tags: seed.tags,
          readTime: buildReadTime(content),
          date: seed.date,
          hero: seed.hero,
          content,
          resources: seed.resources
        }
      });
    })
  );

  console.log(`Created ${blogs.length} blogs`);

  // Seed Roadmaps
  console.log('🗺️  Creating roadmaps...');
  const roadmaps = await Promise.all([
    prisma.roadmap.create({
      data: {
        slug: 'full-stack-mern',
        title: 'Full-Stack Web Developer (MERN)',
        summary: 'End-to-end web development with modern tooling and deployment.',
        duration: '12 weeks',
        level: 'Beginner to Intermediate',
        milestones: [
          'HTML, CSS, JavaScript fundamentals',
          'React + state management',
          'Node.js + Express APIs',
          'MongoDB data modeling',
          'Auth + deployment'
        ],
        resources: [
          { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { name: 'React Docs', url: 'https://react.dev' },
          { name: 'Node.js Docs', url: 'https://nodejs.org/en/docs' }
        ],
        timeline: [
          { week: 'Weeks 1-2', focus: 'Web basics + Git workflow' },
          { week: 'Weeks 3-4', focus: 'React components + routing' },
          { week: 'Weeks 5-6', focus: 'State management + API integration' },
          { week: 'Weeks 7-8', focus: 'Node + Express + REST' },
          { week: 'Weeks 9-10', focus: 'MongoDB + auth flows' },
          { week: 'Weeks 11-12', focus: 'Capstone + deployment' }
        ],
      },
    }),
    prisma.roadmap.create({
      data: {
        slug: 'dsa-interview',
        title: 'Data Structures & Algorithms (Interview)',
        summary: 'Master patterns, complexity, and interview-style problems.',
        duration: '10 weeks',
        level: 'Intermediate',
        milestones: [
          'Arrays, strings, hashing',
          'Stacks, queues, linked lists',
          'Trees, BST, recursion',
          'Graphs + BFS/DFS',
          'Dynamic programming'
        ],
        resources: [
          { name: 'Algorithm (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Algorithm' },
          { name: 'Big O notation', url: 'https://en.wikipedia.org/wiki/Big_O_notation' },
          { name: 'LeetCode', url: 'https://leetcode.com' }
        ],
        timeline: [
          { week: 'Weeks 1-2', focus: 'Arrays + strings + complexity' },
          { week: 'Weeks 3-4', focus: 'Stacks + queues + linked lists' },
          { week: 'Weeks 5-6', focus: 'Trees + recursion' },
          { week: 'Weeks 7-8', focus: 'Graphs + greedy patterns' },
          { week: 'Weeks 9-10', focus: 'Dynamic programming + mocks' }
        ],
      },
    }),
    prisma.roadmap.create({
      data: {
        slug: 'devops-aws',
        title: 'DevOps & Cloud (AWS)',
        summary: 'CI/CD, containers, and cloud infrastructure.',
        duration: '9 weeks',
        level: 'Intermediate',
        milestones: [
          'Linux + networking',
          'Docker + container basics',
          'CI/CD pipelines',
          'AWS core services',
          'Monitoring + infra as code'
        ],
        resources: [
          { name: 'AWS Docs', url: 'https://docs.aws.amazon.com/' },
          { name: 'Docker Docs', url: 'https://docs.docker.com/' },
          { name: 'Terraform', url: 'https://developer.hashicorp.com/terraform/docs' }
        ],
        timeline: [
          { week: 'Weeks 1-2', focus: 'Linux + networking' },
          { week: 'Weeks 3-4', focus: 'Docker + containerization' },
          { week: 'Weeks 5-6', focus: 'CI/CD pipelines' },
          { week: 'Weeks 7-8', focus: 'AWS core services' },
          { week: 'Week 9', focus: 'Monitoring + IaC basics' }
        ],
      },
    }),
  ]);

  console.log(`✅ Created ${roadmaps.length} roadmaps`);

  // Create sample enrollments (optional)
  if (user1 && user2) {
    console.log('Creating sample enrollments...');
    await prisma.enrollment.create({
      data: {
        userId: user1.id,
        courseId: courses[0].id,
      },
    });

    await prisma.enrollment.create({
      data: {
        userId: user2.id,
        courseId: courses[1].id,
      },
    });

    console.log('Created sample enrollments');
  }

  // Seed Roadmaps
  console.log('🗺️  Creating roadmaps...');
  const roadmaps = await Promise.all([
    prisma.roadmap.create({
      data: {
        slug: 'full-stack-mern',
        title: 'Full-Stack Web Developer (MERN)',
        summary: 'End-to-end web development with modern tooling and deployment.',
        duration: '12 weeks',
        level: 'Beginner to Intermediate',
        milestones: [
          'HTML, CSS, JavaScript fundamentals',
          'React + state management',
          'Node.js + Express APIs',
          'MongoDB data modeling',
          'Auth + deployment'
        ],
        resources: [
          { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { name: 'React Docs', url: 'https://react.dev' },
          { name: 'Node.js Docs', url: 'https://nodejs.org/en/docs' }
        ],
        timeline: [
          { week: 'Weeks 1-2', focus: 'Web basics + Git workflow' },
          { week: 'Weeks 3-4', focus: 'React components + routing' },
          { week: 'Weeks 5-6', focus: 'State management + API integration' },
          { week: 'Weeks 7-8', focus: 'Node + Express + REST' },
          { week: 'Weeks 9-10', focus: 'MongoDB + auth flows' },
          { week: 'Weeks 11-12', focus: 'Capstone + deployment' }
        ],
      },
    }),
    prisma.roadmap.create({
      data: {
        slug: 'dsa-interview',
        title: 'Data Structures & Algorithms (Interview)',
        summary: 'Master patterns, complexity, and interview-style problems.',
        duration: '10 weeks',
        level: 'Intermediate',
        milestones: [
          'Arrays, strings, hashing',
          'Stacks, queues, linked lists',
          'Trees, BST, recursion',
          'Graphs + BFS/DFS',
          'Dynamic programming'
        ],
        resources: [
          { name: 'Algorithm (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Algorithm' },
          { name: 'Big O notation', url: 'https://en.wikipedia.org/wiki/Big_O_notation' },
          { name: 'LeetCode', url: 'https://leetcode.com' }
        ],
        timeline: [
          { week: 'Weeks 1-2', focus: 'Arrays + strings + complexity' },
          { week: 'Weeks 3-4', focus: 'Stacks + queues + linked lists' },
          { week: 'Weeks 5-6', focus: 'Trees + recursion' },
          { week: 'Weeks 7-8', focus: 'Graphs + greedy patterns' },
          { week: 'Weeks 9-10', focus: 'Dynamic programming + mocks' }
        ],
      },
    }),
    prisma.roadmap.create({
      data: {
        slug: 'devops-aws',
        title: 'DevOps & Cloud (AWS)',
        summary: 'CI/CD, containers, and cloud infrastructure.',
        duration: '9 weeks',
        level: 'Intermediate',
        milestones: [
          'Linux + networking',
          'Docker + container basics',
          'CI/CD pipelines',
          'AWS core services',
          'Monitoring + infra as code'
        ],
        resources: [
          { name: 'AWS Docs', url: 'https://docs.aws.amazon.com/' },
          { name: 'Docker Docs', url: 'https://docs.docker.com/' },
          { name: 'Terraform', url: 'https://developer.hashicorp.com/terraform/docs' }
        ],
        timeline: [
          { week: 'Weeks 1-2', focus: 'Linux + networking' },
          { week: 'Weeks 3-4', focus: 'Docker + containerization' },
          { week: 'Weeks 5-6', focus: 'CI/CD pipelines' },
          { week: 'Weeks 7-8', focus: 'AWS core services' },
          { week: 'Week 9', focus: 'Monitoring + IaC basics' }
        ],
      },
    }),
  ]);

  console.log(`✅ Created ${roadmaps.length} roadmaps`);

  // Create sample enrollments
  console.log('📋 Creating sample enrollments...');
  await prisma.enrollment.create({
    data: {
      userId: user1.id,
      courseId: courses[0].id,
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: user2.id,
      courseId: courses[1].id,
    },
  });

  console.log('✅ Created sample enrollments');

  console.log('');
  console.log('✨ Database seeded successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`  - Users: 2`);
  console.log(`  - Courses: ${courses.length}`);
  console.log(`  - Blogs: ${blogs.length}`);
  console.log(`  - Roadmaps: ${roadmaps.length}`);
  console.log(`  - Enrollments: 2`);
  console.log('');
  console.log('🔐 Test Credentials:');
  console.log('  Email: admin@shreeskills.com');
  console.log('  Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
