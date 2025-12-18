import ShopType from "@/types/shop";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShopHeader from "@/components/atoms/ShopHeader";
import PageTitle from "@/components/atoms/PageTitle";
import { notFound } from "next/navigation";
import ProductList from "./ProductList";
import type { Metadata } from "next";
import { buildDefaultOgMetadata, fetchJson, railsApiUrl, truncate } from "@/lib/ogMetadata";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ShopShowApiResponse = { shop?: ShopType };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const url = railsApiUrl(`/shops/${id}`);
  const data = url ? await fetchJson<ShopShowApiResponse>(url) : null;
  const shop = data?.shop;

  if (!shop) {
    return {
      title: "ショップが見つかりません | Digital Ichiba",
      robots: { index: false, follow: false },
    };
  }

  const title = `${shop.name} | Digital Ichiba`;
  const description = truncate(shop.description || "Digital Ichiba", 120);

  const original = shop.header_url || shop.icon_url;
  const ogImageUrl = original ? `/api/og-image?src=${encodeURIComponent(original)}` : null;

  return buildDefaultOgMetadata({
    title,
    description,
    path: `/shops/${id}`,
    imageUrl: ogImageUrl,
  });
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const page = Number((await searchParams).page) || 1;

  const res = await fetch(`${process.env.NEXT_URL}/api/shops/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  const shop: ShopType = data.shop;

  if (!shop) {
    return notFound();
  }

  return (
    <div>
      <ShopHeader shop_header_url={shop.header_url} shop_name={shop.name} />
      <div className="py-8 inner">
        <PageTitle title={shop.name} />
        <div className="flex justify-end mt-4">
          <Button asChild>
            <Link href={`/shops/${id}/profile`}>
              <span className="font-bold">プロフィールを見る</span>
            </Link>
          </Button>
        </div>
        <div>
          <ProductList shop_id={id} page={page} />
        </div>
      </div>
    </div>
  );
}
