import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const slugSchema = z.string().min(1).max(120);
export const uuidSchema = z.string().uuid();

export const profileSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  headline: z.string().min(2).max(120).optional(),
  avatarUrl: z.string().url().optional()
});

export const resourceSchema = z.object({
  name: z.string().min(2).max(120),
  url: z.string().url()
});

export const courseSchema = z.object({
  title: z.string().min(2).max(120),
  slug: slugSchema,
  description: z.string().min(10).max(500),
  level: z.string().min(2).max(40),
  price: z.number().int().min(0),
  thumbnail: z.string().url(),
  resources: z.array(resourceSchema).optional()
});

export const roadmapSchema = z.object({
  title: z.string().min(2).max(140),
  slug: slugSchema,
  summary: z.string().min(10).max(300),
  duration: z.string().min(2).max(40),
  level: z.string().min(2).max(60),
  milestones: z.array(z.string().min(2).max(120)).min(3),
  resources: z.array(resourceSchema).min(1),
  timeline: z.array(z.object({ week: z.string(), focus: z.string() })).min(3)
});

export const blogSchema = z.object({
  title: z.string().min(2).max(140),
  slug: slugSchema,
  excerpt: z.string().min(10).max(200),
  tags: z.array(z.string().min(2).max(40)).min(1),
  readTime: z.string().min(2).max(20),
  date: z.string().min(4).max(40),
  hero: z.string().url(),
  content: z.array(z.string().min(2)).min(1),
  resources: z.array(resourceSchema).min(1)
});
