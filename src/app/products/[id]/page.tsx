import ProductType from "@/types/product";
import PageTitle from "@/components/atoms/PageTitle";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductAddToCartForm from "./ProductAddToCartForm";
import ShopHeader from "@/components/atoms/ShopHeader";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import DeleteProduct from "./DeleteProduct";
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
      url: `/products/${id}`,
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

  const res = await fetch(`${process.env.NEXT_URL}/api/products/${id}`, {
    cache: "no-store",
  }).catch(() => null);

  if (!res?.ok) return fallback;

  const data = (await res.json().catch(() => null)) as {
    product?: ProductType;
  } | null;
  const product = data?.product;
  if (!product) return fallback;

  const title = `${product.name} | ${baseTitle}`;
  const description = (product.description ?? baseTitle)
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
      url: `/products/${id}`,
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

export default async function ShopProductsShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_URL}/api/products/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  const product: ProductType = data.product;
  if (!product) {
    notFound();
  }

  const cookie = (await cookies()).get("di_data")?.value;
  const shop = JSON.parse(decodeURIComponent(cookie ?? "{}")).shop;
  const isOwner = product.shop_id === shop?.id;

  return (
    <div>
      <ShopHeader
        shop_header_url={product.shop_header_url}
        shop_name={product.shop_name}
      />
      <div className="py-8 inner">
        <PageTitle title={product?.name} />
        <div className="mt-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <figure className="w-full aspect-square relative overflow-hidden">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={product?.image_url}
                alt={product?.name}
                className="object-cover"
              />
            </figure>
            <div className="w-full flex flex-col gap-4 justify-center">
              <div className="flex gap-1">
                ショップ:
                <Link href={`/shops/${product?.shop_id}/profile`}>
                  {product?.shop_name}
                </Link>
              </div>
              <p>税込価格:{product?.price_including_tax_cents}円</p>
              {isOwner && (
                <>
                  <Button asChild>
                    <Link href={`/dashboard/shop/products/${product.id}/edit`}>
                      <span className="font-bold">編集する</span>
                    </Link>
                  </Button>
                  <DeleteProduct id={product.id} />
                </>
              )}
              {!isOwner && <ProductAddToCartForm product={product} />}
            </div>
          </div>
          <p className="mt-4">{product?.description}</p>
        </div>
      </div>
    </div>
  );
}
