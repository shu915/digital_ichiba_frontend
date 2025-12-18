import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    return NextResponse.json({ message: "src is required" }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return NextResponse.json({ message: "src is invalid" }, { status: 400 });
  }

  if (!isAllowedHost(url.hostname)) {
    return NextResponse.json(
      { message: "src host is not allowed" },
      { status: 400 }
    );
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
      return NextResponse.json(
        { message: "failed to fetch src" },
        { status: 502 }
      );
    }

    const contentType = res.headers.get("content-type");
    const srcArrayBuffer = await res.arrayBuffer();
    const bytes = Buffer.from(srcArrayBuffer);

    // 想定外の巨大画像は拒否（OGP用途なので過剰サイズは不要）
    if (bytes.length > 6 * 1024 * 1024) {
      return NextResponse.json(
        { message: "src is too large" },
        { status: 413 }
      );
    }

    const convert = shouldConvertToPng(contentType, url.pathname);
    if (!convert) {
      return new NextResponse(srcArrayBuffer, {
        status: 200,
        headers: {
          "content-type": contentType || "application/octet-stream",
          "cache-control": "public, max-age=0, s-maxage=86400",
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
      },
    });
  } catch {
    return NextResponse.json(
      { message: "failed to build og image" },
      { status: 500 }
    );
  } finally {
    clearTimeout(timer);
  }
}
