import Shop from "@/types/shop";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
    <div className="py-8 w-7xl mx-auto max-w-full">
      <h2 className="text-4xl font-bold text-center">{shop?.name}</h2>
      <div className="flex justify-end mt-4">
        <Button asChild>
          <Link href={`/shops/${id}/profile`}>
            <span className="font-bold">プロフィールを見る</span>
          </Link>
        </Button>
      </div>
      <div>商品を並べる枠</div>
    </div>
    </div>
  );
}
