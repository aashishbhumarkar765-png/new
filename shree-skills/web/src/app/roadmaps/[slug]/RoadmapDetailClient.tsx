"use client";

import useSWR from "swr";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { apiFetcher } from "@/lib/api";
import { Roadmap } from "@/lib/types";

export default function RoadmapDetailClient({ slug }: { slug: string }) {
  const { data, error, isLoading } = useSWR<Roadmap>(`/roadmaps/${slug}`, apiFetcher);
  const roadmap = data;

  if (isLoading && !data) {
    return (
      <Container>
        <div className="card-soft p-4 my-5">Loading roadmap...</div>
      </Container>
    );
  }

  if (!roadmap) {
    return (
      <Container>
        <div className="card-soft p-4 my-5 text-center">
          <h5 className="fw-semibold">Roadmap not found</h5>
          <p className="muted-text mb-0">Please check back later for updated paths.</p>
        </div>
      </Container>
    );
  }

  return (
    <main className="py-5">
      <Container>
        {error && (
          <div className="alert alert-warning" role="alert">
            Unable to load roadmap details. Please refresh and try again.
          </div>
        )}
        <div className="card-soft p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="fw-bold">{roadmap.title}</h1>
              <div className="small muted-text">{roadmap.duration} - {roadmap.level}</div>
            </div>
            <ButtonLink href="/roadmaps" variant="outline">
              All roadmaps
            </ButtonLink>
          </div>
          <p className="mt-3 text-secondary">{roadmap.summary}</p>
        </div>

        <div className="card-soft p-4 mt-4">
          <h5 className="fw-semibold mb-3">Timeline</h5>
          <div className="list-group">
            {roadmap.timeline.map((step) => (
              <div key={step.week} className="list-group-item d-flex flex-column flex-md-row gap-2">
                <strong className="text-primary">{step.week}</strong>
                <span className="muted-text">{step.focus}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-soft p-4 mt-4">
          <h5 className="fw-semibold mb-3">Recommended resources</h5>
          <ul className="list-unstyled mb-0">
            {(roadmap.resources || []).map((resource) => (
              <li key={resource.url} className="mb-2">
                <a href={resource.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
