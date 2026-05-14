import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse job-ready courses with real projects and mentorship.",
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

export default function CoursesPage() {
  return <CoursesClient />;
}
