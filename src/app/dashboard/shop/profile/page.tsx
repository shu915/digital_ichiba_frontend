import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShopProfileForm from "./ShopProfileForm";
import { requireAuth } from "@/lib/requireAuth";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import PageTitle from "@/components/atoms/PageTitle";

export default async function ShopProfileEdit() {
  await requireAuth();
  await requireShopOrAdmin();

  const cookie = (await cookies()).toString();

  const res = await fetch(`${process.env.NEXT_URL}/api/shop`, {
    cache: "no-store",
    headers: { Cookie: cookie },
  });
  if (!res.ok) {
    return notFound();
  }
  const loginData = await res.json();

  return (
    <div className="py-8 w-7xl mx-auto max-w-full px-4">
      <PageTitle title="プロフィール編集" />
      <div className="flex justify-end mt-4 gap-2">
        <Button asChild>
          <Link href="/dashboard/shop">
            <span className="font-bold">ショップダッシュボードへ</span>
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/shops/${loginData.shop.id}/profile`}>
            <span className="font-bold">プロフィールを確認</span>
          </Link>
        </Button>
      </div>
      <ShopProfileForm loginData={loginData} />
    </div>
  );
}
