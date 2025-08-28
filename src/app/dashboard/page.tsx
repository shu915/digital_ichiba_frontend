import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import { getUserFromCookies } from "@/lib/getUserFromCookies";
import { requireAuth } from "@/lib/requireAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await requireAuth();
  const user = await getUserFromCookies();
  if (!user) {
    const cookieStore = await cookies();
    if (!cookieStore.get("di_user")) redirect("/auth/signout");
  }

  return (
    <div>
      <Header />
      <main className="py-8 w-7xl mx-auto max-w-full px-4">
          <h2 className="text-4xl font-bold text-center">ダッシュボード</h2>
        <div className="flex justify-end mt-4">
          {session && user?.role === "customer" && (
            <form action="/dashboard/setup_shop" method="post">
              <Button type="submit" className="font-bold">ショップを開設</Button>
            </form>
          )}
          {session && user?.role === "shop" && (
            <Button asChild>
              <Link href="/dashboard/shop" className="!font-bold">ショップダッシュボードへ</Link>
            </Button>
          )}
        </div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
      </main>
      <Footer />
    </div>
  );
}
