import Container from "./Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-top bg-white mt-5">
      <Container>
        <div className="row py-5 g-4">
          <div className="col-md-3">
            <div className="fw-bold h5">Shree Skills</div>
            <p className="muted-text mt-2">
              Learn practical skills with structured courses, projects, and mentorship.
            </p>
          </div>
          <div className="col-md-2">
            <div className="fw-semibold">Company</div>
            <ul className="list-unstyled mt-3">
              <li><Link href="/" className="text-decoration-none text-secondary">About</Link></li>
              <li><Link href="/" className="text-decoration-none text-secondary">Contact</Link></li>
              <li><Link href="/" className="text-decoration-none text-secondary">Privacy</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="fw-semibold">Courses</div>
            <ul className="list-unstyled mt-3">
              <li><Link href="/courses" className="text-decoration-none text-secondary">Browse Courses</Link></li>
              <li><Link href="/courses" className="text-decoration-none text-secondary">Free Courses</Link></li>
              <li><Link href="/courses" className="text-decoration-none text-secondary">Paid Courses</Link></li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="fw-semibold">Resources</div>
            <ul className="list-unstyled mt-3">
              <li><Link href="/roadmaps" className="text-decoration-none text-secondary">Roadmaps</Link></li>
              <li><Link href="/blog" className="text-decoration-none text-secondary">Blog</Link></li>
              <li><Link href="/" className="text-decoration-none text-secondary">Help Center</Link></li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="fw-semibold">Connect</div>
            <ul className="list-unstyled mt-3">
              <li><a href="https://www.linkedin.com" className="text-decoration-none text-secondary" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com" className="text-decoration-none text-secondary" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com" className="text-decoration-none text-secondary" target="_blank" rel="noreferrer">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-top py-3 small text-secondary">
          {new Date().getFullYear()} Shree Skills. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
