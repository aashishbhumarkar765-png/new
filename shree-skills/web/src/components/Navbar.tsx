"use client";

import Link from "next/link";
import Container from "./Container";
import { ButtonLink } from "./Button";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar navbar-expand-lg navbar-light navbar-blur sticky-top border-bottom">
      <Container>
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" href="/">
          <span className="d-inline-flex align-items-center justify-content-center rounded-3 brand-mark px-2 py-1">
            S
          </span>
          Shree Skills
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <form className="ms-lg-4 my-3 my-lg-0 d-flex flex-grow-1">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search courses"
              aria-label="Search courses"
            />
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/courses">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/roadmaps">
                Roadmaps
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/dashboard">
                Dashboard
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-secondary small">
                    {user.email}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-dark btn-sm" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <ButtonLink href="/login" variant="outline" className="me-lg-2">
                    Login
                  </ButtonLink>
                </li>
                <li className="nav-item">
                  <ButtonLink href="/signup" variant="secondary">
                    Sign up
                  </ButtonLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
}
