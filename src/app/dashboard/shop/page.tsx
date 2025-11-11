import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";
import PageTitle from "@/components/atoms/PageTitle";
import StripeButton from "./StripeButton";
import NewProductButton from "./NewProductButton";
import { cookies } from "next/headers";
import { ShopOrderType } from "@/types/order";
import { notFound } from "next/navigation";

export default async function ShopDashboard() {
  await requireAuth();
  const data = await requireShopOrAdmin();
  const user = data.user;
  const onboarded = Boolean(data.shop?.stripe_onboarded);
  // 受注一覧を取得
  const cookie = (await cookies()).toString();
  let orders: Array<ShopOrderType> = [];
  const ordersRes = await fetch(`${process.env.NEXT_URL}/api/shop/orders`, {
    cache: "no-store",
    headers: { Cookie: cookie },
  });
  if (ordersRes.ok) {
    const json = await ordersRes.json();
    orders = json.orders.map((o: ShopOrderType) => o);
  } else {
    return notFound();
  }
  return (
    <div>
      <main className="py-8 inner">
        <PageTitle title="ショップダッシュボード" />
        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center mt-4 gap-2">
          <div className="w-full sm:w-auto">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/dashboard/shop/profile">
                <span className="font-bold">プロフィール編集</span>
              </Link>
            </Button>
          </div>
          <div className="w-full sm:w-auto">
            <NewProductButton onboarded={onboarded} />
          </div>
          <div className="w-full sm:w-auto">
            <StripeButton />
          </div>
          <div className="w-full sm:w-auto">
            <Button asChild className="w-full sm:w-auto">
              <Link href={`/shops/${data.shop?.id}`}>
                <span className="font-bold">ショップページを見る</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-4 space-y-1 text-sm sm:text-base">

          <p>メールアドレス:{user.email}</p>
          <p>ロール:{user.role}</p>
        </div>
        {/* 受注一覧 */}
        {orders.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold">受注一覧</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">日付</th>
                    <th className="p-2">金額</th>
                    <th className="p-2">ステータス</th>
                    <th className="p-2">購入者</th>
                    <th className="p-2 text-right">詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b">
                      <td className="p-2">
                        {new Date(o.placed_at ?? "").toLocaleString("ja-JP")}
                      </td>
                      <td className="p-2">{o.total_cents}円</td>
                      <td className="p-2">{o.status}</td>
                      <td className="p-2">{o.customer?.email ?? "-"}</td>
                      <td className="p-2 text-right">
                        <Button
                          asChild
                          size="sm"
                          className="bg-black text-white font-bold hover:bg-black/90"
                        >
                          <Link href={`/dashboard/shop/orders/${o.id}`}>
                            詳細へ
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
