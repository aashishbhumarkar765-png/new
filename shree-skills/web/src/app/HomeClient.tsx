"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import CourseCard from "@/components/CourseCard";
import { LoadingGrid, LoadingCard } from "@/components/Loading";
import { apiFetcher } from "@/lib/api";
import { BlogPost, Course, Roadmap } from "@/lib/types";

export default function HomeClient() {
  const { data: roadmaps, error: roadmapsError, isLoading: roadmapsLoading } = useSWR<Roadmap[]>("/roadmaps", apiFetcher);
  const { data: blogs, error: blogsError, isLoading: blogsLoading } = useSWR<BlogPost[]>("/blogs", apiFetcher);
  const { data: courses, error: coursesError, isLoading: coursesLoading } = useSWR<Course[]>("/courses", apiFetcher);

  const featuredCourses = courses && courses.length > 0 ? courses.slice(0, 3) : [];
  const roadmapsData = roadmaps && roadmaps.length > 0 ? roadmaps : [];
  const blogsData = blogs && blogs.length > 0 ? blogs : [];
  const courseCount = courses?.length ?? 0;
  const roadmapCount = roadmaps?.length ?? 0;
  const blogCount = blogs?.length ?? 0;

  const quickLinks = [
    {
      title: "Browse courses",
      description: "Pick from beginner to advanced tracks.",
      href: "/courses",
      icon: "bi-collection-play",
      tone: "tone-blue"
    },
    {
      title: "Follow roadmaps",
      description: "Step-by-step plans that keep you on track.",
      href: "/roadmaps",
      icon: "bi-diagram-3",
      tone: "tone-teal"
    },
    {
      title: "Read insights",
      description: "Career tips, language guides, and practice.",
      href: "/blog",
      icon: "bi-journal-text",
      tone: "tone-pink"
    },
    {
      title: "Your dashboard",
      description: "Track progress, enrollments, and mentoring.",
      href: "/dashboard",
      icon: "bi-speedometer2",
      tone: "tone-gold"
    }
  ];

  const platformStats = [
    {
      label: "Courses live",
      value: courseCount ? `${courseCount}+` : "40+",
      icon: "bi-collection-play",
      href: "/courses"
    },
    {
      label: "Roadmaps",
      value: roadmapCount ? `${roadmapCount}+` : "12+",
      icon: "bi-map",
      href: "/roadmaps"
    },
    {
      label: "Blog posts",
      value: blogCount ? `${blogCount}+` : "30+",
      icon: "bi-journal-richtext",
      href: "/blog"
    },
    {
      label: "Active learners",
      value: "25k+",
      icon: "bi-people",
      href: "/signup"
    }
  ];

  return (
    <main>
      <section className="hero-gradient py-5">
        <Container>
          <div className="row align-items-center g-4">
            <div className="col-lg-6 fade-in-up">
              <div className="hero-stack">
                <div className="hero-kicker">Shree Skills Academy</div>
                <span className="stat-pill">
                  <i className="bi bi-lightning-charge"></i>
                  Live cohorts + mentorship
                </span>
                <h1 className="display-5 fw-bold hero-title">
                  Build the skills that turn{" "}
                  <span>ambition into offers</span>.
                </h1>
                <p className="muted-text fs-5 mb-0">
                  Structured roadmaps, real projects, and guided cohorts built for
                  engineers who want outcomes. Learn full stack, data, DevOps, and AI with
                  a roadmap that keeps you moving.
                </p>
                <div className="accent-strip"></div>
                <div className="d-flex flex-wrap gap-3 hero-cta-buttons">
                  <ButtonLink href="/courses" variant="secondary">
                    Explore courses
                  </ButtonLink>
                  <ButtonLink href="/roadmaps" variant="outline" className="btn-light">
                    View roadmaps
                  </ButtonLink>
                  <ButtonLink href="/signup" variant="outline" className="btn-light">
                    Start learning
                  </ButtonLink>
                </div>
                <div className="row g-3">
                  {[
                    { label: "Active Learners", value: "25k+", icon: "bi-people", href: "/courses" },
                    { label: "Expert Mentors", value: "120+", icon: "bi-lightning-charge", href: "/courses" },
                    { label: "Hiring Partners", value: "300+", icon: "bi-briefcase", href: "/courses" }
                  ].map((stat) => (
                    <div key={stat.label} className="col-4">
                      <ButtonLink href={stat.href} className="card-soft glass p-3 text-center text-decoration-none d-block">
                        <i className={`bi ${stat.icon} d-block mb-2`}></i>
                        <div className="fw-bold">{stat.value}</div>
                        <div className="small muted-text">{stat.label}</div>
                      </ButtonLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 fade-in-up">
              <div className="card-soft glass p-4 bg-white position-relative overflow-hidden">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small text-secondary fw-semibold">Next cohort starts</div>
                    <div className="h4 fw-bold mt-2">March 11, 9:00 AM IST</div>
                  </div>
                  <span className="badge text-bg-warning">Limited seats</span>
                </div>
                <div className="mt-4 d-grid gap-3">
                  {[
                    { item: "Live interactive classes", included: true },
                    { item: "Weekly 1-on-1 mentorship", included: true },
                    { item: "Capstone projects", included: true },
                    { item: "Job placement assistance", included: true }
                  ].map(({ item, included }) => (
                    <div key={item} className="d-flex justify-content-between align-items-center">
                      <span className="text-secondary">{item}</span>
                      <span className={`fw-semibold ${included ? 'text-success' : 'text-muted'}`}>
                        {included ? 'Included' : 'Optional'}
                      </span>
                    </div>
                  ))}
                </div>
                <ButtonLink href="/courses" variant="primary" className="mt-4 w-100">
                  View all cohorts
                </ButtonLink>
                <div className="image-frame mt-4">
                  <Image
                    src="/images/learning-workspace.svg"
                    alt="Learning workspace"
                    width={900}
                    height={520}
                    className="w-100"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-5 section-glow">
        <Container>
          <div className="section-shell">
            <div className="row g-4 align-items-stretch">
            <div className="col-lg-6 fade-in-up">
              <h2 className="section-title fw-bold">Your learning hub</h2>
              <p className="muted-text mt-3">
                Jump into focused tracks, follow guided roadmaps, and keep up with the latest
                insights. Every section is interlinked so you can move faster.
              </p>
              <div className="row g-3 mt-4">
                {quickLinks.map((link, index) => (
                  <div key={link.title} className="col-md-6">
                    <Link
                      href={link.href}
                      className={`link-tile ${link.tone} text-decoration-none fade-in-up`}
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      <span className="icon-badge">
                        <i className={`bi ${link.icon}`}></i>
                      </span>
                      <div className="fw-semibold">{link.title}</div>
                      <div className="small muted-text mt-1">{link.description}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 fade-in-up">
              <div className="card-soft p-4 h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="small text-secondary fw-semibold">Platform snapshot</div>
                    <div className="h4 fw-bold mt-2">Live counts from our backend</div>
                  </div>
                  <span className="badge text-bg-success">Fast fallback ready</span>
                </div>
                <div className="row g-3 mt-3">
                  {platformStats.map((stat) => (
                    <div key={stat.label} className="col-6">
                      <Link href={stat.href} className="text-decoration-none">
                        <div className="stat-tile p-3 h-100">
                          <div className="d-flex align-items-center gap-2">
                            <i className={`bi ${stat.icon} text-primary`}></i>
                            <span className="small text-secondary">{stat.label}</span>
                          </div>
                          <div className="h4 fw-bold mt-2 mb-0">{stat.value}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-4 d-flex flex-wrap gap-2">
                  <ButtonLink href="/dashboard" variant="outline" className="btn-light">
                    Open dashboard
                  </ButtonLink>
                  <ButtonLink href="/signup" variant="secondary">
                    Create account
                  </ButtonLink>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <h2 className="section-title fw-bold">Roadmaps</h2>
              <p className="muted-text">Structured paths for serious career growth.</p>
            </div>
            <ButtonLink href="/roadmaps" variant="outline">
              View all
            </ButtonLink>
          </div>
          {roadmapsError && (
            <div className="alert alert-danger mt-3" role="alert">
              Unable to load roadmaps. Please check your connection and try again.
            </div>
          )}
          {roadmapsLoading ? (
            <div className="row g-3 mt-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="col-lg-4">
                  <LoadingCard />
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-3 mt-3">
              {roadmapsData.slice(0, 3).map((item) => (
                <div key={item.slug} className="col-lg-4">
                  <div className="card-soft p-4 h-100 roadmap-card">
                    <div className="fw-semibold">{item.title}</div>
                    <div className="small muted-text mt-1">{item.duration} - {item.level}</div>
                    <ul className="mt-3">
                      {item.milestones.slice(0, 4).map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                    <ButtonLink href={`/roadmaps/${item.slug}`} variant="outline" className="mt-2">
                      View roadmap
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="py-5 section-sunset">
        <Container>
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <h2 className="section-title fw-bold">Featured courses</h2>
              <p className="muted-text">Curated by mentors for high-impact learning.</p>
            </div>
          </div>
          {coursesError && (
            <div className="alert alert-danger mt-3" role="alert">
              Unable to load courses. Please check your connection and try again.
            </div>
          )}
          {coursesLoading ? (
            <LoadingGrid count={3} />
          ) : (
            <div className="row g-4 mt-3">
              {featuredCourses.length > 0 ? (
                featuredCourses.map((course) => (
                  <div key={course.slug} className="col-md-6 col-lg-4">
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="text-muted">
                    <i className="bi bi-book display-1 mb-3"></i>
                    <h5>No courses available</h5>
                    <p>Please check back later or contact support.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <h2 className="section-title fw-bold">Latest from the blog</h2>
              <p className="muted-text">Language learning and career growth tips.</p>
            </div>
            <ButtonLink href="/blog" variant="outline">
              View all
            </ButtonLink>
          </div>
          {blogsError && (
            <div className="alert alert-danger mt-3" role="alert">
              Unable to load blog posts. Please check your connection and try again.
            </div>
          )}
          {blogsLoading ? (
            <div className="row g-4 mt-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <LoadingCard />
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-4 mt-3">
              {blogsData.length > 0 ? (
                blogsData.slice(0, 3).map((post) => (
                  <div key={post.slug} className="col-md-6 col-lg-4">
                    <div className="card-soft p-4 h-100">
                      <div className="small text-secondary fw-semibold">{post.readTime} - {post.date}</div>
                      <h5 className="mt-2">{post.title}</h5>
                      <p className="small muted-text">{post.excerpt}</p>
                      <ButtonLink href={`/blog/${post.slug}`} variant="outline" className="mt-auto">
                        Read article
                      </ButtonLink>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="text-muted">
                    <i className="bi bi-pencil-square display-1 mb-3"></i>
                    <h5>No blog posts available</h5>
                    <p>Please check back later for new articles.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="cta-band p-4 p-lg-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <div className="cta-eyebrow">Career Sprint</div>
                <h2 className="fw-bold">Ready to start your next skill sprint?</h2>
                <p className="mb-0">
                  Enroll in a cohort, follow a roadmap, and keep everything connected in one
                  learning workspace.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="d-flex flex-wrap gap-3 justify-content-lg-end">
                  <ButtonLink href="/courses" variant="outline" className="btn-light">
                    Explore courses
                  </ButtonLink>
                  <ButtonLink href="/signup" variant="secondary">
                    Start free
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
