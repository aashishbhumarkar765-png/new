export type ResourceLink = {
  name: string;
  url: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  price: number;
  thumbnail: string;
  resources?: ResourceLink[];
  createdAt?: string;
};

export type Roadmap = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  duration: string;
  level: string;
  milestones: string[];
  resources: ResourceLink[];
  timeline: { week: string; focus: string }[];
};

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  hero: string;
  content: string[];
  resources: ResourceLink[];
};

export type Enrollment = {
  id: string;
  course: Course;
};

export type User = {
  id: string;
  email: string;
  createdAt?: string;
};

export type UserProfile = {
  id?: string;
  name?: string | null;
  headline?: string | null;
  avatarUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
