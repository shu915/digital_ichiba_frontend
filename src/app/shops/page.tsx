import PageTitle from "@/components/atoms/PageTitle";
import ShopListClient from "./ShopListClient";

export default async function ShopsIndex({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams).page) || 1;
  const res = await fetch(`${process.env.NEXT_URL}/api/shops?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return (
      <div className="py-8 inner">
        <PageTitle title="ショップ一覧" />
        <p className="mt-6 text-center">ショップを読み込めませんでした。</p>
      </div>
    );
  }
  const data = await res.json();
  const shops = data.shops ?? [];
  const totalItems = data.total_items ?? 0;

  return (
    <div className="py-8 inner">
      <PageTitle title="ショップ一覧" />
      <ShopListClient
        initialShops={shops}
        initialTotalItems={totalItems}
        initialPage={page}
      />
    </div>
  );
}
