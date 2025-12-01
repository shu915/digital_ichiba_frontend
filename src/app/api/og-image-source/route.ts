import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("url");
  if (!src) {
    return new Response("Missing url", { status: 400 });
  }
  let target: URL;
  try {
    target = new URL(src);
  } catch {
    return new Response("Bad url", { status: 400 });
  }
  if (!["http:", "https:"].includes(target.protocol)) {
    return new Response("Invalid protocol", { status: 400 });
  }

  const res = await fetch(target.toString(), {
    cache: "no-store",
    redirect: "follow",
  }).catch(() => null);
  if (!res || !res.ok || !res.body) {
    return new Response("Upstream error", { status: 502 });
  }
  const type = res.headers.get("content-type") ?? "image/png";
  return new Response(res.body, {
    headers: {
      "content-type": type,
      "cache-control": "no-store",
    },
  });
}
