"use client";

import { useEffect, useRef, useState } from "react";
import Pagination from "@/components/organisms/Pagination";
import ShopListItem from "@/components/organisms/ShopListItem";

type ShopCard = {
  id: number;
  name: string;
  description?: string | null;
  icon_url?: string | null;
};

export default function ShopListClient({
  initialShops,
  initialTotalItems,
  initialPage,
}: {
  initialShops: ShopCard[];
  initialTotalItems: number;
  initialPage: number;
}) {
  const isFirst = useRef(true);
  const [page, setPage] = useState(initialPage);
  const [shops, setShops] = useState<ShopCard[]>(initialShops);
  const [totalItems, setTotalItems] = useState<number>(initialTotalItems);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    (async () => {
      const res = await fetch(`/api/shops?page=${page}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setShops(data.shops ?? []);
      setTotalItems(data.total_items ?? 0);
    })();
  }, [page]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {shops.map((s) => (
          <ShopListItem
            key={s.id}
            id={s.id}
            name={s.name}
            description={s.description}
            icon_url={s.icon_url ?? undefined}
          />
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={totalItems}
          perPage={10}
        />
      </div>
    </div>
  );
}
