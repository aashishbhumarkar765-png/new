import type { Metadata } from "next";
import RoadmapDetailClient from "./RoadmapDetailClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  await params;
  return {
    title: "Learning Roadmap",
    description: "Step-by-step path with milestones, timelines, and resources.",
    keywords: [
      "online courses",
      "job-ready skills",
      "full stack roadmap",
      "DSA roadmap",
      "Java backend",
      "Python data science",
      "DevOps AWS",
      "AI ML basics"
    ]
  };
}

export default async function RoadmapDetailPage({ params }: Params) {
  const { slug } = await params;
  return <RoadmapDetailClient slug={slug} />;
}
