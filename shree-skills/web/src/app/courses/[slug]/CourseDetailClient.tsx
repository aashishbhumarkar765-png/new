"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { Course } from "@/lib/types";
import { apiAuthedPost, apiFetcher } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

const resourceLinks: Record<string, { label: string; url: string }[]> = {
  "full-stack-web-development": [
    { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
    { label: "HTTP Overview (Wikipedia)", url: "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol" },
    { label: "JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" }
  ],
  "data-structures-algorithms": [
    { label: "Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Algorithm" },
    { label: "Data structure (Wikipedia)", url: "https://en.wikipedia.org/wiki/Data_structure" },
    { label: "Big O notation", url: "https://en.wikipedia.org/wiki/Big_O_notation" }
  ],
  "frontend-engineering": [
    { label: "CSS Layout (MDN)", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout" },
    { label: "Web performance", url: "https://developer.mozilla.org/en-US/docs/Web/Performance" },
    { label: "Accessibility (Wikipedia)", url: "https://en.wikipedia.org/wiki/Web_accessibility" }
  ],
  "backend-nodejs": [
    { label: "Node.js Docs", url: "https://nodejs.org/en/docs" },
    { label: "REST (Wikipedia)", url: "https://en.wikipedia.org/wiki/Representational_state_transfer" },
    { label: "Express Guide", url: "https://expressjs.com/en/guide/routing.html" }
  ],
  "system-design-essentials": [
    { label: "System design (Wikipedia)", url: "https://en.wikipedia.org/wiki/Systems_design" },
    { label: "Scalability", url: "https://en.wikipedia.org/wiki/Scalability" },
    { label: "CAP theorem", url: "https://en.wikipedia.org/wiki/CAP_theorem" }
  ],
  "react-for-professionals": [
    { label: "React Docs", url: "https://react.dev/learn" },
    { label: "Virtual DOM (Wikipedia)", url: "https://en.wikipedia.org/wiki/Virtual_DOM" },
    { label: "State management", url: "https://redux.js.org/" }
  ]
};

const defaultResources = [
  { label: "Software engineering (Wikipedia)", url: "https://en.wikipedia.org/wiki/Software_engineering" },
  { label: "Git Handbook", url: "https://guides.github.com/introduction/git-handbook/" },
  { label: "Roadmaps.sh", url: "https://roadmap.sh/" }
];

export default function CourseDetailClient({ slug }: { slug: string }) {
  const { data, error, isLoading } = useSWR<Course>(`/courses/${slug}`, apiFetcher);
  const course = data;
  const router = useRouter();
  const { user } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState<string | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  if (isLoading && !data) {
    return (
      <Container>
        <div className="card-soft p-4 my-5">Loading course...</div>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container>
        <div className="card-soft p-4 my-5 text-center">
          <h5 className="fw-semibold">Course not found</h5>
          <p className="muted-text mb-0">Please check back later or explore other courses.</p>
        </div>
      </Container>
    );
  }

  return (
    <main className="py-5">
      <Container>
        {error && (
          <div className="alert alert-warning" role="alert">
            Unable to load course details. Please refresh and try again.
          </div>
        )}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card-soft p-4">
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={1000}
                height={560}
                className="course-image w-100 mb-3"
                unoptimized
              />
              <span className="badge badge-level mb-2">{course.level}</span>
              <h1 className="fw-bold">{course.title}</h1>
              <p className="muted-text">{course.description}</p>
            </div>

            <div className="card-soft p-4 mt-4">
              <h5 className="fw-semibold mb-3">What you will learn</h5>
              <ul className="list-unstyled mb-0">
                {["Foundations", "Live Projects", "Interview Prep", "Capstone"].map((item) => (
                  <li key={item} className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-success">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft p-4 mt-4">
              <h5 className="fw-semibold mb-3">Further reading</h5>
              <ul className="list-unstyled mb-0">
                {(course.resources?.length ? course.resources : (resourceLinks[course.slug] || defaultResources)).map((resource) => (
                  <li key={resource.url} className="mb-2">
                    <a
                      href={resource.url}
                      className="text-decoration-none"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {"name" in resource ? resource.name : resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card-soft p-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="muted-text">Price</span>
                <span className="fw-semibold">{course.price === 0 ? "Free" : `INR ${course.price}`}</span>
              </div>
              {enrollMessage && <div className="alert alert-success mt-3">{enrollMessage}</div>}
              {enrollError && <div className="alert alert-danger mt-3">{enrollError}</div>}
              <button
                className="btn btn-brand w-100 mt-3"
                disabled={enrolling}
                onClick={async () => {
                  setEnrollMessage(null);
                  setEnrollError(null);
                  if (!user) {
                    router.push(`/login?next=/courses/${slug}`);
                    return;
                  }
                  try {
                    setEnrolling(true);
                    await apiAuthedPost(`/enroll/${course.id}`);
                    setEnrollMessage("You are enrolled. Check your dashboard for access.");
                  } catch (err) {
                    setEnrollError((err as Error).message || "Enrollment failed");
                  } finally {
                    setEnrolling(false);
                  }
                }}
              >
                {enrolling ? "Enrolling..." : "Enroll now"}
              </button>
              {!user && (
                <div className="small muted-text mt-2">
                  Please <Link href={`/login?next=/courses/${slug}`} className="text-decoration-none">login</Link> to enroll.
                </div>
              )}
              <div className="mt-4 small muted-text">
                <div className="d-flex justify-content-between">
                  <span>Duration</span>
                  <span className="fw-semibold text-dark">12 weeks</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Projects</span>
                  <span className="fw-semibold text-dark">6</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Mentor sessions</span>
                  <span className="fw-semibold text-dark">Weekly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
