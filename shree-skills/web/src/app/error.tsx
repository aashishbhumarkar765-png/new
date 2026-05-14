"use client";

import { useEffect } from "react";
import Container from "@/components/Container";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-5">
      <Container>
        <div className="card-soft p-4">
          <h1 className="fw-bold">Something went wrong</h1>
          <p className="muted-text">{error.message}</p>
          <button className="btn btn-dark" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </Container>
    </main>
  );
}
