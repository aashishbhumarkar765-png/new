"use client";

import Link from "next/link";
import Container from "@/components/Container";
import { useAuth } from "@/components/AuthProvider";
import useSWR from "swr";
import { apiAuthedGet } from "@/lib/api";
import { Enrollment } from "@/lib/types";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const { data: enrollments } = useSWR<Enrollment[]>(user ? "/me/enrollments" : null, apiAuthedGet);

  return (
    <main className="py-5">
      <Container>
        <div className="card-soft p-4">
          <h1 className="fw-bold">Dashboard</h1>
          {loading ? (
            <div className="mt-3 muted-text">Loading your account...</div>
          ) : !user ? (
            <div className="alert alert-warning mt-3">
              Login required to view your dashboard.
              <div className="mt-2">
                <Link href="/login" className="btn btn-dark btn-sm">
                  Go to login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="muted-text mt-2">Welcome back, {user.email}.</p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <button className="btn btn-outline-dark btn-sm" onClick={logout}>
                  Logout
                </button>
              </div>
              <div className="mt-4">
                <h5 className="fw-semibold">Enrolled courses</h5>
                {enrollments && enrollments.length > 0 ? (
                  <div className="list-group">
                    {enrollments.map((item) => (
                      <div key={item.id} className="list-group-item d-flex justify-content-between">
                        <div>{item.course.title}</div>
                        <span className="badge badge-level">{item.course.level}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card-soft p-3">
                    <div className="small muted-text mb-2">No enrollments yet. Start with a course.</div>
                    <Link href="/courses" className="btn btn-brand btn-sm">
                      Browse courses
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
