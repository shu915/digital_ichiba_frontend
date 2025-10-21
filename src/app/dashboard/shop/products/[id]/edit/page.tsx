import { Button } from "@/components/ui/button";
import Link from "next/link";
import { requireAuth } from "@/lib/requireAuth";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";
import PageTitle from "@/components/atoms/PageTitle";
import ShopProductForm from "@/components/organisms/ShopProductForm";
import ProductType from "@/types/product";
import { notFound } from "next/navigation";

export default async function ShopProductsEdit({
  params,
}: {
  params: Promise<{ id: string }>;
  }) {
  await requireAuth();
  await requireShopOrAdmin();
  
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
  await requireAuth();
  await requireShopOrAdmin();

  return (
    <div className="py-8 inner">
      <PageTitle title="商品編集" />
      <div className="flex justify-end mt-4 gap-2">
        <Button asChild>
          <Link href="/dashboard/shop">
            <span className="font-bold">ショップダッシュボードへ</span>
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/products/${product.id}`}>
            <span className="font-bold">商品詳細を確認</span>
          </Link>
        </Button>
      </div>
      <ShopProductForm product={product} />
    </div>
  );
}
