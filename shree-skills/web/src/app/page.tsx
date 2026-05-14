import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Home",
  description: "Master job-ready programming skills with expert mentorship. Learn Full Stack, DSA, DevOps, AI/ML through structured courses and personalized roadmaps.",
  keywords: [
    "programming courses online",
    "learn coding skills",
    "software development training",
    "full stack developer course",
    "data structures algorithms course",
    "Java backend development",
    "Python data science course",
    "DevOps AWS certification",
    "AI ML basics course",
    "spoken english course",
    "english for interview",
    "coding bootcamp online",
    "programming mentorship",
    "career development tech",
    "job ready skills training"
  ]
};

export default function HomePage() {
  return <HomeClient />;
}
