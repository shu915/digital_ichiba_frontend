import Shop from "@/types/shop";
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
      <ShopHeader shop={shop} />
    <div className="py-8 inner">
      <PageTitle title={shop.name} />
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
