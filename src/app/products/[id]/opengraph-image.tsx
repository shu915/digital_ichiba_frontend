import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Product = {
  id: number | string;
  name: string;
  image_url: string;
  price_including_tax_cents: number;
};

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "https";
  const baseUrl = `${proto}://${host}`;
  let product: Product | null = null;
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      product = data.product as Product;
    }
  } catch {}

  const title = product?.name ?? "Digital Ichiba";
  const imgUrl =
    (product?.image_url?.startsWith("http")
      ? product?.image_url
      : product?.image_url
      ? `${baseUrl}${product.image_url}`
      : undefined) ?? undefined;
  const price =
    product?.price_including_tax_cents != null
      ? `${product.price_including_tax_cents}円(税込)`
      : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(135deg, #0b0b0b 0%, #1b1b1b 100%)",
          color: "white",
          padding: 48,
          gap: 32,
        }}
      >
        {/* 画像エリア */}
        <div
          style={{
            width: 540,
            height: 540,
            borderRadius: 16,
            overflow: "hidden",
            background: "#222",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={title}
              width={540}
              height={540}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <div
              style={{
                fontSize: 48,
                opacity: 0.2,
              }}
            >
              No Image
            </div>
          )}
        </div>

        {/* テキストエリア */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          {price && (
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#ffd166",
              }}
            >
              {price}
            </div>
          )}
          <div
            style={{
              marginTop: 8,
              fontSize: 28,
              opacity: 0.85,
            }}
          >
            Digital Ichiba
          </div>
        </div>
      </div>
    ),
    size
  );
}
