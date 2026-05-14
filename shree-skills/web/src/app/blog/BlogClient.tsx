"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { apiFetcher } from "@/lib/api";
import { BlogPost } from "@/lib/types";

export default function BlogClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { data, error, isLoading } = useSWR<BlogPost[]>("/blogs", apiFetcher);

  const filtered = useMemo(() => {
    const blogs = data || [];
    return blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="py-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h1 className="fw-bold">Blog</h1>
            <p className="muted-text">Guides for language learning and career growth.</p>
          </div>
          <input
            className="form-control w-100"
            style={{ maxWidth: 320 }}
            placeholder="Search articles"
            aria-label="Search articles"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {error && (
          <div className="alert alert-warning mt-4" role="alert">
            Unable to load blogs. Please check your connection and try again.
          </div>
        )}

        {isLoading && (
          <div className="row g-4 mt-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="col-lg-6">
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
          <div className="row g-4 mt-3">
            {visible.length > 0 ? visible.map((post) => (
              <div key={post.slug} className="col-lg-6">
                <div className="card-soft p-3 h-100">
                  <Image
                    src={post.hero}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="course-image w-100"
                    unoptimized
                  />
                  <div className="p-3">
                    <div className="small text-secondary">
                      {post.date} - {post.readTime}
                    </div>
                    <h5 className="mt-2">{post.title}</h5>
                    <p className="small muted-text">{post.excerpt}</p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="badge badge-level">{tag}</span>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="btn btn-outline-dark btn-sm">
                      Read article
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <div className="card-soft p-4 text-center">
                  <h5 className="fw-semibold">No blog posts yet</h5>
                  <p className="muted-text mb-0">New articles will appear here once published.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-dark btn-sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            <span className="small text-secondary">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-outline-dark btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </main>
  );
}
