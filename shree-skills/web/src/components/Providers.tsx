"use client";

import { SWRConfig } from "swr";
import { AuthProvider } from "./AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: true,
        dedupingInterval: 10_000,
        keepPreviousData: true
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </SWRConfig>
  );
}
