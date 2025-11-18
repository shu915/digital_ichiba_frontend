import ShopType from "@/types/shop";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShopHeader from "@/components/atoms/ShopHeader";
import PageTitle from "@/components/atoms/PageTitle";

export default async function ShopPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const res = await fetch(`${process.env.NEXT_URL}/api/shops/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  const shop: ShopType = data.shop;

  return (
    <div>
      <ShopHeader shop_header_url={shop.header_url} shop_name={shop.name} />
      <div className="py-8 inner flex justify-center gap-4 flex-col">
        <PageTitle title={shop.name} />
        <div className="flex justify-end">
          <Button asChild>
            <Link href={`/shops/${id}`}>
              <span className="font-bold">商品を見る</span>
            </Link>
          </Button>
        </div>
        <figure className="mx-auto pt-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
          {shop?.icon_url && (
            <>
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={shop.icon_url}
                alt={shop.name}
                className="w-full h-full object-cover"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </>
          )}
        </figure>
        <div className="max-w-3xl w-full mx-auto py-8 px-2 sm:px-0">
          <p className="whitespace-pre-wrap">{shop?.description}</p>
        </div>
      </div>
    </div>
  );
}
