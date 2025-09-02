import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShopProfileForm from "./ShopProfileForm";
import { requireAuth } from "@/lib/requireAuth";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";
import getDataFromCookies from "@/lib/getDataFromCookies";

export default async function ShopProfileEdit() {
  await requireAuth();
  await requireShopOrAdmin();
  const data = await getDataFromCookies();

  return (
    <div>
      <main className="py-8 w-7xl mx-auto max-w-full px-4">
        <h2 className="text-4xl font-bold text-center">プロフィール編集</h2>
        <div className="flex justify-end mt-4 gap-2">
          <Button asChild>
            <Link href="/dashboard/shop">
              <span className="font-bold">ショップダッシュボードへ</span>
            </Link>
          </Button>
        </div>
        <ShopProfileForm data={data} />
      </main>
    </div>
  );
}
