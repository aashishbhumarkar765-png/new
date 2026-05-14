import type { Metadata } from "next";
import CourseDetailClient from "./CourseDetailClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  await params;
  return {
    title: "Course Detail",
    description: "Explore syllabus, outcomes, and enrollment options for this course.",
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

export default async function CourseDetailPage({ params }: Params) {
  const { slug } = await params;
  return <CourseDetailClient slug={slug} />;
}
