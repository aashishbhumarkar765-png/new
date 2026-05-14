"use client";

import { Fragment, useMemo } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { apiFetcher } from "@/lib/api";
import { BlogPost } from "@/lib/types";

type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; url: string; caption?: string }
  | { type: "code"; language?: string; code: string };

function renderTextWithLinks(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("http://") || part.startsWith("https://")) {
      const trimmed = part.replace(/[).,!?;:]+$/, "");
      const trailing = part.slice(trimmed.length);
      return (
        <Fragment key={`${trimmed}-${idx}`}>
          <a href={trimmed} target="_blank" rel="noreferrer" className="text-decoration-none">
            {trimmed}
          </a>
          {trailing}
        </Fragment>
      );
    }
    return <Fragment key={`${part}-${idx}`}>{part}</Fragment>;
  });
}

function parseContent(content: string[]): ContentBlock[] {
  return content.map((raw) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith("H2:")) {
      return { type: "heading", level: 2, text: trimmed.replace("H2:", "").trim() };
    }
    if (trimmed.startsWith("H3:")) {
      return { type: "heading", level: 3, text: trimmed.replace("H3:", "").trim() };
    }
    if (trimmed.startsWith("QUOTE:")) {
      return { type: "quote", text: trimmed.replace("QUOTE:", "").trim() };
    }
    if (trimmed.startsWith("IMAGE:")) {
      const payload = trimmed.replace("IMAGE:", "").trim();
      const [url, caption] = payload.split("|").map((part) => part.trim());
      return { type: "image", url, caption };
    }
    if (trimmed.startsWith("CODE:")) {
      const payload = trimmed.replace("CODE:", "");
      const [languageLine, ...rest] = payload.split("\n");
      const language = languageLine.trim() || undefined;
      const code = rest.join("\n").trim();
      return { type: "code", language, code };
    }
    return { type: "paragraph", text: trimmed };
  });
}

export default function BlogDetailClient({ slug }: { slug: string }) {
  const { data, error, isLoading } = useSWR<BlogPost>(`/blogs/${slug}`, apiFetcher);
  const blocks = useMemo(() => (data ? parseContent(data.content) : []), [data]);

  if (isLoading && !data) {
    return (
      <Container>
        <div className="card-soft p-4 my-5">Loading article...</div>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <div className="card-soft p-4 my-5 text-center">
          <h5 className="fw-semibold">Article not available</h5>
          <p className="muted-text mb-0">Please check back soon.</p>
        </div>
      </Container>
    );
  }

  return (
    <main className="py-5">
      <Container>
        <Link href="/blog" className="text-decoration-none text-secondary">
          &larr; Back to Blog
        </Link>
        {error && (
          <div className="alert alert-warning mt-3" role="alert">
            Unable to load the article. Please refresh or try again later.
          </div>
        )}
        <div className="card-soft p-4 mt-3">
          <div className="small text-secondary">
            {data.date} - {data.readTime}
          </div>
          <h1 className="fw-bold mt-2">{data.title}</h1>
          <p className="muted-text">{data.excerpt}</p>
          <Image
            src={data.hero}
            alt={data.title}
            width={1200}
            height={600}
            className="course-image w-100 mt-3"
            unoptimized
          />
          <div className="blog-content mt-4">
            {blocks.map((block, idx) => {
              if (block.type === "heading") {
                const Heading = block.level === 2 ? "h2" : "h3";
                return <Heading key={`${block.text}-${idx}`} className="blog-heading">{block.text}</Heading>;
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={`${block.text}-${idx}`} className="blog-quote">
                    {block.text}
                  </blockquote>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={`${block.url}-${idx}`} className="blog-figure">
                    <Image
                      src={block.url}
                      alt={block.caption || data.title}
                      width={1200}
                      height={700}
                      className="course-image w-100"
                      unoptimized
                    />
                    {block.caption && <figcaption>{block.caption}</figcaption>}
                  </figure>
                );
              }
              if (block.type === "code") {
                return (
                  <pre key={`${block.code}-${idx}`} className="blog-code">
                    <code data-language={block.language || "code"}>{block.code}</code>
                  </pre>
                );
              }
              return (
                <p key={`${block.text}-${idx}`} className="text-secondary">
                  {renderTextWithLinks(block.text)}
                </p>
              );
            })}
          </div>
          <div className="d-flex flex-wrap gap-2 mt-3">
            {data.tags.map((tag) => (
              <span key={tag} className="badge badge-level">{tag}</span>
            ))}
          </div>
        </div>

        <div className="card-soft p-4 mt-4">
          <h5 className="fw-semibold mb-3">Recommended resources</h5>
          <ul className="list-unstyled mb-0">
            {(data.resources || []).map((resource) => (
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
