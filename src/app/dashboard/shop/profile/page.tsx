import { redirect } from "next/navigation";
import { getUserFromCookies } from "@/lib/getUserFromCookies";
import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShopProfileForm from "./ShopProfileForm";

export default async function ShopProfileEdit() {
  await requireAuth();
  
  const user = await getUserFromCookies();
  if (user?.role === "customer") {
    redirect("/dashboard");
  }
  
  return <div>
    <main className="py-8 w-7xl mx-auto max-w-full px-4">
      <h2 className="text-4xl font-bold text-center">プロフィール編集</h2>
      <div className="flex justify-end mt-4 gap-2">
        <Button asChild>
          <Link href="/dashboard/shop" className="!font-bold">ショップダッシュボードへ</Link>
        </Button>
      </div>
      <ShopProfileForm />
    </main>
  </div>;
}