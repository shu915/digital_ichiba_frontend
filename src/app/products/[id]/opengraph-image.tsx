import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

type Product = {
  id: string;
  name: string;
  description?: string;
  shop_name: string;
  image_url?: string;
  price_including_tax_cents?: number;
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | null = null;
  try {
    // 直接バックエンドへ（公開到達可能なHTTPSであること）
    const res = await fetch(`${process.env.RAILS_URL}/api/products/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { product?: Product };
      product = data.product ?? null;
    }
  } catch {
    product = null;
  }

  const title = product?.name ?? "商品が見つかりません";
  const shop = product?.shop_name ?? "Digital Ichiba";
  const price =
    product?.price_including_tax_cents != null
      ? `${product.price_including_tax_cents.toLocaleString()}円`
      : undefined;
  const description =
    product?.description?.slice(0, 120) ?? "デジタル市場のプロダクトページ";

  // 画像は絶対URLのみ使用
  const imageUrl =
    product?.image_url && product.image_url.startsWith("http")
      ? product.image_url
      : product?.image_url
      ? `${process.env.RAILS_URL}${product.image_url}`
      : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
          color: "#fff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 64,
            gap: 24,
            width: imageUrl ? 700 : "100%",
          }}
        >
          <div style={{ fontSize: 44, opacity: 0.9 }}>{shop}</div>
          <div style={{ fontSize: 72, lineHeight: 1.1, fontWeight: 800 }}>
            {title}
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {price && (
              <span
                style={{
                  fontSize: 40,
                  padding: "8px 16px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                税込 {price}
              </span>
            )}
          </div>
          <div style={{ fontSize: 28, opacity: 0.85, marginTop: 8 }}>
            {description}
          </div>
        </div>

        {imageUrl && (
          <div
            style={{
              width: 500,
              height: "100%",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.08)",
              borderLeft: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <img
              src={imageUrl}
              width={500}
              height={500}
              alt={title}
              style={{
                objectFit: "cover",
                width: 500,
                height: 500,
                borderRadius: 24,
                boxShadow: "0 12px 60px rgba(0,0,0,0.45)",
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
