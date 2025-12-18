import type { Metadata } from "next";

type FetchJsonOptions = {
  timeoutMs?: number;
};

export function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export function truncate(text: string, maxLength: number) {
  const normalized = normalizeText(text);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 1))}…`;
}

export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {}
): Promise<T | null> {
  const timeoutMs = options.timeoutMs ?? 4000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function buildDefaultOgMetadata(params: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string | null;
}): Metadata {
  const images = params.imageUrl ? [params.imageUrl] : ["/opengraph-image"];

  return {
    title: params.title,
    description: params.description,
    openGraph: {
      title: params.title,
      description: params.description,
      type: "website",
      url: params.path,
      images,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images,
    },
  };
}

export function railsApiUrl(path: string) {
  const base = process.env.RAILS_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/api${
    path.startsWith("/") ? "" : "/"
  }${path}`;
}
