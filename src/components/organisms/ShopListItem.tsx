"use client";

import Link from "next/link";

export default function ShopListItem({
  id,
  name,
  description,
  icon_url,
}: {
  id: number;
  name: string;
  description?: string | null;
  icon_url?: string | null;
}) {
  return (
    <div className="border rounded p-4 hover:bg-muted/40 transition h-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">
        <figure className="shrink-0 w-14 h-14 rounded-full overflow-hidden">
          {/* eslint-disable @next/next/no-img-element */}
          {icon_url ? (
            <img
              src={icon_url}
              alt={name}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-muted" />
          )}
        </figure>
        <div className="min-w-0 grow text-center sm:text-left">
          <p className="font-bold text-lg truncate">{name}</p>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href={`/shops/${id}`}
            className="inline-block w-full sm:w-auto text-center px-3 py-2 rounded bg-black text-white font-bold hover:bg-black/90"
          >
            ショップ詳細へ
          </Link>
        </div>
      </div>
    </div>
  );
}
