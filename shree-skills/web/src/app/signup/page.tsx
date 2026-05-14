"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="py-5">
      <Container>
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card-soft p-4">
              <h1 className="fw-bold">Create account</h1>
              <p className="muted-text">Start learning with Shree Skills.</p>

              <form
                className="mt-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setLoading(true);
                  const form = e.currentTarget as HTMLFormElement;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const password = (form.elements.namedItem("password") as HTMLInputElement).value;
                  try {
                    await signup(email, password);
                    router.push(nextPath);
                  } catch (err) {
                    setError((err as Error).message || "Signup failed");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
                <button className="btn btn-brand w-100" type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Sign up"}
                </button>
              </form>

              <p className="small text-secondary mt-3">
                Already have an account?{" "}
                <Link href="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<main className="py-5"><Container><div className="card-soft p-4">Loading signup...</div></Container></main>}>
      <SignupForm />
    </Suspense>
  );
}
