import type { MetadataRoute } from "next";

type SlugItem = { slug: string };

const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api").replace(/\/$/, "");

async function fetchSlugs(path: string) {
  const res = await fetch(`${apiBase}${path}`, { cache: "no-store" });
  if (!res.ok) return [] as SlugItem[];
  return (await res.json()) as SlugItem[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://shreeskills.com";
  const currentDate = new Date().toISOString();
  let courses: SlugItem[] = [];
  let roadmaps: SlugItem[] = [];
  let blogs: SlugItem[] = [];

  try {
    [courses, roadmaps, blogs] = await Promise.all([
      fetchSlugs("/courses"),
      fetchSlugs("/roadmaps"),
      fetchSlugs("/blogs")
    ]);
  } catch {
    courses = [];
    roadmaps = [];
    blogs = [];
  }

  return [
    {
      url: `${base}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${base}/courses`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${base}/roadmaps`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${base}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${base}/login`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${base}/signup`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3
    },
    ...courses.map((course) => ({
      url: `${base}/courses/${course.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    ...roadmaps.map((roadmap) => ({
      url: `${base}/roadmaps/${roadmap.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6
    })),
    ...blogs.map((blog) => ({
      url: `${base}/blog/${blog.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
