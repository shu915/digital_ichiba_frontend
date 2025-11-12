import ProductCard from "@/components/organisms/ProductCard";
import PageTitle from "@/components/atoms/PageTitle";
import ShopListItem from "@/components/organisms/ShopListItem";
import type ProductType from "@/types/product";

export default async function Home() {
  // 新着商品を取得（最初のページから最大10件）
  const res = await fetch(`${process.env.NEXT_URL}/api/products?page=1`, {
    cache: "no-store",
  });
  let products: ProductType[] = [];
  if (res.ok) {
    const data = await res.json();
    products = (data.products as ProductType[]).slice(0, 10);
  }

  // 新着ショップを取得（最大5件）
  const shopsRes = await fetch(`${process.env.NEXT_URL}/api/shops?limit=5`, {
    cache: "no-store",
  });
  let shops:
    | Array<{
        id: number;
        name: string;
        description?: string | null;
        icon_url?: string | null;
      }>
    | [] = [];
  if (shopsRes.ok) {
    const data = await shopsRes.json();
    shops = data.shops ?? [];
  }

  return (
    <div className="py-8 inner">
      <PageTitle title="新着商品" />
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center">新着商品はありません。</p>
      )}

      <div className="mt-12">
        <PageTitle title="新着ショップ" />
        {shops.length > 0 ? (
          <div className="flex flex-col gap-3 mt-4">
            {shops.map((s) => (
              <ShopListItem
                key={s.id}
                id={s.id}
                name={s.name}
                description={s.description}
                icon_url={s.icon_url}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-center">新着ショップはありません。</p>
        )}
      </div>
    </div>
  );
}
