import Shop from "@/types/shop";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShopHeader from "@/components/atoms/ShopHeader";
import PageTitle from "@/components/atoms/PageTitle";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_URL}/api/shops/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  const shop: Shop = data.shop;

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
        <div className="w-[240px] mx-auto pt-8">
          {shop?.icon_url && (
            <Image
              src={shop?.icon_url}
              alt={shop?.name}
              width={240}
              height={240}
              className="rounded-full shrink-0"
            />
          )}
        </div>
        <div className="w-[720px] mx-auto py-8">
          <p className="whitespace-pre-wrap">{shop?.description}</p>
        </div>
      </div>
    </div>
  );
}
