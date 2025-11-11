import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getDataFromCookies from "@/lib/getDataFromCookies";
import CreateShop from "@/components/atoms/CreateShop";
import PageTitle from "@/components/atoms/PageTitle";
import { cookies } from "next/headers";
import { CustomerOrderType } from "@/types/order";

export default async function Dashboard() {
  const session = await requireAuth();
  const data = await getDataFromCookies();
  const user = data?.user;
  const cookie = (await cookies()).toString();
  const ordersRes = await fetch(`${process.env.NEXT_URL}/api/orders`, {
    cache: "no-store",
    method: "GET",
    headers: { Cookie: cookie },
  });
  const ordersData = await ordersRes.json();
  const orders = ordersData.orders ?? [];
  return (
    <div className="py-8 inner">
      <PageTitle title="ダッシュボード" />
      <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-2 mt-4">
        <div className="w-full sm:w-auto">
          {user?.role === "customer" && <CreateShop />}
        </div>
        <div className="w-full sm:w-auto">
          {session && user?.role === "shop" && (
            <Button asChild className="w-full sm:w-auto">
              <Link href="/dashboard/shop">
                <span className="font-bold">ショップダッシュボードへ</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-1 text-sm sm:text-base">
        <p>メールアドレス:{user?.email}</p>
        <p>ロール:{user?.role}</p>
      </div>

      {/* 購入履歴 */}
      {orders.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">購入履歴</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b">
                  <th className="p-2">日付</th>
                  <th className="p-2">金額</th>
                  <th className="p-2">ステータス</th>
                  <th className="p-2">ショップ</th>
                  <th className="p-2 text-right">詳細</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: CustomerOrderType) => (
                  <tr key={o.id} className="border-b">
                    <td className="p-2">
                      {new Date(o.placed_at ?? "").toLocaleString("ja-JP")}
                    </td>
                    <td className="p-2">{o.total_cents}円</td>
                    <td className="p-2">{o.status}</td>
                    <td className="p-2">{o.shop?.name ?? "-"}</td>
                    <td className="p-2 text-right">
                      <Button asChild size="sm" className="font-bold">
                        <Link href={`/dashboard/orders/${o.id}`}>詳細へ</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
