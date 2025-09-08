import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getDataFromCookies from "@/lib/getDataFromCookies";
import CreateShop from "@/components/atoms/CreateShop";
import PageTitle from "@/components/atoms/PageTitle";

export default async function Dashboard() {
  const session = await requireAuth();
  const data = await getDataFromCookies();
  const user = data?.user;

  return (
    <div className="py-8 inner">
      <PageTitle title="ダッシュボード" />
      <div className="flex justify-end mt-4">
        {user?.role === "customer" && <CreateShop />}
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
    </div>
  );
}
