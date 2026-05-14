import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const courses = [
  {
    title: 'Full Stack Web Development',
    slug: 'full-stack-web-dev',
    description: 'Master frontend and backend development with modern tools.',
    level: 'Beginner',
    price: 4999,
  },
  {
    title: 'Data Science Mastery',
    slug: 'data-science-mastery',
    description: 'Learn Python, Pandas, and Machine Learning from scratch.',
    level: 'Intermediate',
    price: 5999,
  },
  {
    title: 'UI/UX Design Fundamentals',
    slug: 'ui-ux-design',
    description: 'Design beautiful interfaces and user experiences.',
    level: 'Beginner',
    price: 2999,
  },
  {
    title: 'Advanced React patterns',
    slug: 'advanced-react',
    description: 'Deep dive into React, Hooks, and Performance optimization.',
    level: 'Advanced',
    price: 3499,
  },
  {
    title: 'Node.js Microservices',
    slug: 'nodejs-microservices',
    description: 'Build scalable systems using Microservices architecture.',
    level: 'Advanced',
    price: 3999,
  },
  {
    title: 'Python for Beginners',
    slug: 'python-basics',
    description: 'Start your coding journey with Python.',
    level: 'Beginner',
    price: 1999,
  },
  {
    title: 'Machine Learning A-Z',
    slug: 'machine-learning-az',
    description: 'Complete guide to Machine Learning algorithms.',
    level: 'Advanced',
    price: 6999,
  },
  {
    title: 'Digital Marketing Pro',
    slug: 'digital-marketing',
    description: 'Master SEO, SEM, and Social Media Marketing.',
    level: 'Beginner',
    price: 2499,
  },
  {
    title: 'DevOps Engineering',
    slug: 'devops-engineering',
    description: 'Learn Docker, Kubernetes, and CI/CD pipelines.',
    level: 'Intermediate',
    price: 5499,
  },
  {
    title: 'Mobile App Dev with Flutter',
    slug: 'flutter-development',
    description: 'Build native iOS and Android apps with Flutter.',
    level: 'Intermediate',
    price: 4499,
  },
  {
    title: 'Cyber Security Essentials',
    slug: 'cyber-security',
    description: 'Protect systems and networks from cyber attacks.',
    level: 'Intermediate',
    price: 4999,
  },
  {
    title: 'Blockchain & Crypto',
    slug: 'blockchain-crypto',
    description: 'Understand the technology behind Bitcoin and Ethereum.',
    level: 'Advanced',
    price: 5999,
  },
];

async function main() {
  console.log('Start seeding ...');

  for (const course of courses) {
    const thumbnail = `https://picsum.photos/seed/${course.slug}/800/450`;
    const exists = await prisma.course.findUnique({ where: { slug: course.slug } });

    if (!exists) {
      await prisma.course.create({
        data: {
          ...course,
          thumbnail,
        },
      });
      console.log(`Created course: ${course.title}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
