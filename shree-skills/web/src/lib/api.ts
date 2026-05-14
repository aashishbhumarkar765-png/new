import { getToken } from "./auth";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

function buildUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalized}`;
}

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(buildUrl(path), options);
  const payload = await parseJson(res);
  if (!res.ok) {
    const message = (payload && (payload.message || payload.error)) || "Request failed";
    const error = new Error(message) as Error & { status?: number; payload?: unknown };
    error.status = res.status;
    error.payload = payload;
    throw error;
  }
  return payload as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(path, { cache: "no-store" });
}

export async function apiAuth<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

export async function apiAuthedPost<T>(path: string, body?: unknown): Promise<T> {
  const token = getToken();
  return request<T>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: body ? JSON.stringify(body) : undefined
  });
}

export async function apiAuthedGet<T>(path: string): Promise<T> {
  const token = getToken();
  return request<T>(path, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
    cache: "no-store"
  });
}

export async function apiFetcher<T>(path: string): Promise<T> {
  return request<T>(path, { cache: "no-store" });
}
