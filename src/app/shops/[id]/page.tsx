import ShopType from "@/types/shop";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShopHeader from "@/components/atoms/ShopHeader";
import PageTitle from "@/components/atoms/PageTitle";
import { notFound } from "next/navigation";
import ProductList from "./ProductList";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const baseTitle = "Digital Ichiba";
  const ogImage = "/images/digital-ichiba_ogp.png";

  const fallback: Metadata = {
    title: baseTitle,
    description: baseTitle,
    openGraph: {
      title: baseTitle,
      description: baseTitle,
      type: "website",
      url: `/shops/${id}`,
      siteName: baseTitle,
      locale: "ja_JP",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: baseTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description: baseTitle,
      images: [ogImage],
    },
  };

  const res = await fetch(`${process.env.NEXT_URL}/api/shops/${id}`, {
    cache: "no-store",
  }).catch(() => null);

  if (!res?.ok) return fallback;

  const data = (await res.json().catch(() => null)) as {
    shop?: ShopType;
  } | null;
  const shop = data?.shop;
  if (!shop) return fallback;

  const title = `${shop.name} | ${baseTitle}`;
  const description = (shop.description ?? baseTitle)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/shops/${id}`,
      siteName: baseTitle,
      locale: "ja_JP",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: baseTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
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
