import { Button } from "@/components/ui/button";
import Link from "next/link";
import requireAuth from "@/lib/requireAuth";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";
import PageTitle from "@/components/atoms/PageTitle";
import ShopProductForm from "@/components/organisms/ShopProductForm";

export default async function ShopProductsNew() {
  await requireAuth();
  await requireShopOrAdmin();

  return (
    <div className="py-8 inner">
      <PageTitle title="商品新規登録" />
      <div className="flex justify-end mt-4 gap-2">
        <Button asChild>
          <Link href="/dashboard/shop">
            <span className="font-bold">ショップダッシュボードへ</span>
          </Link>
        </Button>
      </div>
      <ShopProductForm product={null} />
    </div>
  );
}
