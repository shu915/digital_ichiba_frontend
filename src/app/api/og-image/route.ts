import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function transparentPngResponse(params?: { error?: string }) {
  // 1x1 transparent PNG
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6X8kqAAAAAASUVORK5CYII=",
    "base64"
  );
  const headers: Record<string, string> = {
    "content-type": "image/png",
    // 失敗時の画像は短めキャッシュ（原因調査しやすくする）
    "cache-control": "public, max-age=0, s-maxage=60",
    "access-control-allow-origin": "*",
  };
  if (params?.error) headers["x-di-og-error"] = params.error;

  return new NextResponse(new Uint8Array(png), {
    // OGP/Toolbar用途では「画像URLが200で返る」こと自体が重要なので常に200に寄せる
    status: 200,
    headers,
  });
}

function isAllowedHost(hostname: string) {
  const railsUrl = process.env.RAILS_URL;
  if (railsUrl) {
    try {
      const railsHost = new URL(railsUrl).hostname;
      if (hostname === railsHost) return true;
    } catch {
      // noop
    }
  }

  // ActiveStorage が S3 の署名URLを返すケースや、CDN配信を許可
  if (hostname.endsWith("amazonaws.com")) return true;
  if (hostname.endsWith("cloudfront.net")) return true;

  return false;
}

function shouldConvertToPng(contentType: string | null, pathname: string) {
  const ct = (contentType || "").toLowerCase();
  if (ct.includes("image/avif") || ct.includes("image/webp")) return true;

  const lower = pathname.toLowerCase();
  return lower.endsWith(".avif") || lower.endsWith(".webp");
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  if (!src) {
    // OGP用途なので、画像として返す（Toolbar等でも壊れにくい）
    return transparentPngResponse({ error: "src_required" });
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return transparentPngResponse({ error: "src_invalid" });
  }

  if (!isAllowedHost(url.hostname)) {
    return transparentPngResponse({
      error: "src_host_not_allowed",
    });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) {
      return transparentPngResponse({ error: "fetch_failed" });
    }

    const contentType = res.headers.get("content-type");
    const srcArrayBuffer = await res.arrayBuffer();
    const bytes = Buffer.from(srcArrayBuffer);

    // 想定外の巨大画像は拒否（OGP用途なので過剰サイズは不要）
    if (bytes.length > 6 * 1024 * 1024) {
      return transparentPngResponse({ error: "src_too_large" });
    }

    const convert = shouldConvertToPng(contentType, url.pathname);
    if (!convert) {
      return new NextResponse(srcArrayBuffer, {
        status: 200,
        headers: {
          "content-type": contentType || "application/octet-stream",
          "cache-control": "public, max-age=0, s-maxage=86400",
          "access-control-allow-origin": "*",
        },
      });
    }

    const png = await sharp(bytes, { failOnError: false }).png().toBuffer();
    // NextResponse の型定義上 Buffer はそのままだと通らないことがあるため、
    // ArrayBufferView(Uint8Array) として渡す
    const pngBytes = new Uint8Array(png);
    return new NextResponse(pngBytes, {
      status: 200,
      headers: {
        "content-type": "image/png",
        "cache-control": "public, max-age=0, s-maxage=86400",
        "access-control-allow-origin": "*",
      },
    });
  } catch {
    return transparentPngResponse({ error: "build_failed" });
  } finally {
    clearTimeout(timer);
  }
}
