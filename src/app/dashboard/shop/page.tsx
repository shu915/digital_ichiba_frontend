import { redirect } from "next/navigation";
import { getUserFromCookies } from "@/lib/getUserFromCookies";
import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ShopDashboard() {
  await requireAuth();
  
  const data = await getUserFromCookies();
  const user = data?.user;
  if (!["shop", "admin"].includes(user?.role ?? "")) {
    redirect("/dashboard");
  }
  
  return <div>
    <main className="py-8 w-7xl mx-auto max-w-full px-4">
      <h2 className="text-4xl font-bold text-center">ショップダッシュボード</h2>
      <div className="flex justify-end mt-4 gap-2">
        <Button asChild>
          <Link href="/dashboard/shop/profile" className="!font-bold">プロフィール編集</Link>
        </Button>
      </div>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
    </main>
  </div>;
}