import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";
import PageTitle from "@/components/atoms/PageTitle";

export default async function ShopDashboard() {
  await requireAuth();
  const data = await requireShopOrAdmin();
  const user = data.user;

  return (
    <div>
      <main className="py-8 w-7xl mx-auto max-w-full px-4">
        <PageTitle title="ショップダッシュボード" />
        <div className="flex justify-end mt-4 gap-2">
          <Button asChild>
            <Link href="/dashboard/shop/profile">
              <span className="font-bold">プロフィール編集</span>
            </Link>
          </Button>
        </div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.role}</p>
      </main>
    </div>
  );
}
