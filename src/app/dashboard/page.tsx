import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";

export default async function Dashboard() {
  const session = await requireAuth();
  const data = await requireShopOrAdmin();
  const user = data.user;
  
  return (
    <main className="py-8 w-7xl mx-auto max-w-full px-4">
      <h2 className="text-4xl font-bold text-center">ダッシュボード</h2>
      <div className="flex justify-end mt-4">
        {session && user?.role === "customer" && (
          <form action="/dashboard/setup_shop" method="post">
            <Button type="submit" className="font-bold">
              ショップを開設
            </Button>
          </form>
        )}
        {session && user?.role === "shop" && (
          <Button asChild>
            <Link href="/dashboard/shop">
              <span className="font-bold">ショップダッシュボードへ</span>
            </Link>
          </Button>
        )}
      </div>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
    </main>
  );
}
