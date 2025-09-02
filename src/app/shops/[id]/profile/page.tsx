import Shop from "@/types/shop";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  console.log(res);
  const data = await res.json();
  const shop: Shop = data.shop;

  return (
    <div>
      {shop?.header_url && (
        <div className="relative w-full h-50 sm:h-60">
          <Image
            src={shop.header_url}
            alt={shop.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex justify-center py-8 gap-4 flex-col w-[1000px] mx-auto max-w-full">
        <h2 className="text-4xl font-bold text-center">{shop?.name}</h2>
        <div className="flex justify-end mt-4">
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
        <div className="w-[1000px] mx-auto max-w-full py-8 text-center">
          <p className="pt-2 whitespace-pre-wrap">{shop?.description}</p>
        </div>
      </div>
    </div>
  );
}
