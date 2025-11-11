"use client";

import { useEffect, useRef, useState } from "react";
import Pagination from "@/components/organisms/Pagination";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex flex-col gap-3 mt-4">
        {shops.map((s) => (
          <div
            key={s.id}
            className="border rounded p-4 hover:bg-muted/40 transition"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">
              {/* 左: アイコン */}
              <div className="shrink-0">
                {s.icon_url ? (
                  <Image
                    src={s.icon_url}
                    alt={s.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-muted" />
                )}
              </div>
              {/* 中央: テキスト情報 */}
              <div className="min-w-0 grow text-center sm:text-left">
                <p className="font-bold text-lg truncate">{s.name}</p>
                {s.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {s.description}
                  </p>
                )}
              </div>
              {/* 右: 詳細ボタン */}
              <div className="shrink-0 w-full sm:w-auto">
                <Link
                  href={`/shops/${s.id}`}
                  className="inline-block w-full sm:w-auto text-center px-3 py-2 rounded bg-black text-white font-bold hover:bg-black/90"
                >
                  ショップ詳細へ
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={totalItems}
          perPage={12}
        />
      </div>
    </div>
  );
}
