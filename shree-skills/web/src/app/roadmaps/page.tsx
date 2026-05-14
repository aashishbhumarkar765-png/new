import type { Metadata } from "next";
import RoadmapsClient from "./RoadmapsClient";

export const metadata: Metadata = {
  title: "Roadmaps",
  description: "Structured learning roadmaps for in-demand tech careers.",
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

export default function RoadmapsPage() {
  return <RoadmapsClient />;
}
