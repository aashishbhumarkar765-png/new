"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { apiFetcher } from "@/lib/api";
import { Roadmap } from "@/lib/types";

export default function RoadmapsClient() {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useSWR<Roadmap[]>("/roadmaps", apiFetcher);

  const filtered = useMemo(() => {
    const roadmaps = data || [];
    return roadmaps.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  return (
    <main className="py-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h1 className="fw-bold">Roadmaps</h1>
            <p className="muted-text">Follow a guided path with weekly milestones.</p>
          </div>
          <input
            className="form-control w-100"
            style={{ maxWidth: 320 }}
            placeholder="Search roadmaps"
            aria-label="Search roadmaps"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && (
          <div className="alert alert-warning mt-4" role="alert">
            Unable to load roadmaps. Please check your connection and try again.
          </div>
        )}

        {isLoading && (
          <div className="row g-4 mt-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="col-lg-6">
                <div className="card-soft p-4">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-9 d-block mt-2"></span>
                    <span className="placeholder col-7 d-block mt-2"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="row g-4 mt-3">
            {filtered.length > 0 ? filtered.map((item) => (
              <div key={item.slug} className="col-lg-6">
                <div className="card-soft p-4 h-100 roadmap-card">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-1">{item.title}</h5>
                      <div className="small muted-text">{item.duration} - {item.level}</div>
                    </div>
                    <span className="badge badge-level">Roadmap</span>
                  </div>
                  <p className="mt-3 text-secondary small">{item.summary}</p>
                  <ul className="mt-2">
                    {item.milestones.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <ButtonLink href={`/roadmaps/${item.slug}`} variant="outline">
                    View roadmap
                  </ButtonLink>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <div className="card-soft p-4 text-center">
                  <h5 className="fw-semibold">No roadmaps available</h5>
                  <p className="muted-text mb-0">Check back soon for updated learning paths.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}
