"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Container from "@/components/Container";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/lib/types";
import { apiFetcher } from "@/lib/api";

export default function CoursesClient() {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useSWR<Course[]>("/courses", apiFetcher);

  const filtered = useMemo(() => {
    const courses = data || [];
    return courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  return (
    <main className="py-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h1 className="fw-bold">Courses</h1>
            <p className="muted-text">Browse curated programs and learn by building.</p>
          </div>
          <input
            className="form-control w-100"
            style={{ maxWidth: 320 }}
            placeholder="Search courses"
            aria-label="Search courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && (
          <div className="alert alert-warning mt-4" role="alert">
            Unable to load courses. Please check your connection and try again.
            <div className="small mt-1">{error.message}</div>
          </div>
        )}

        {isLoading && (
          <div className="row g-4 mt-1">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="col-md-6 col-lg-4">
                <div className="card-soft p-4">
                  <div className="placeholder-glow">
                    <div className="placeholder col-12 mb-3" style={{ height: 160 }}></div>
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
          <div className="row g-4 mt-1">
            {filtered.length > 0 ? filtered.map((course) => (
              <div key={course.slug} className="col-md-6 col-lg-4">
                <CourseCard course={course} />
              </div>
            )) : (
              <div className="col-12">
                <div className="card-soft p-4 text-center">
                  <h5 className="fw-semibold">No courses available</h5>
                  <p className="muted-text mb-0">New cohorts will appear here once published.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}
