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
    <Link
      href={`/shops/${id}`}
      className="block border rounded p-4 hover:bg-muted/40 transition h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`${name} のショップ詳細へ`}
    >
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
      </div>
    </Link>
  );
}
