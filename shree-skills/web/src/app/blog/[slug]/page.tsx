import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  await params;
  return {
    title: "Blog Article",
    description: "In-depth learning resources and practical career guidance.",
    keywords: [
      "spoken english",
      "english for interview",
      "learn german",
      "learn japanese",
      "online courses",
      "job-ready skills"
    ]
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
