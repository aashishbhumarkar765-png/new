import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Career, language, and tech learning articles.",
  keywords: [
    "spoken english",
    "english for interview",
    "learn german",
    "learn japanese",
    "online courses",
    "job-ready skills"
  ]
};

export default function BlogPage() {
  return <BlogClient />;
}
