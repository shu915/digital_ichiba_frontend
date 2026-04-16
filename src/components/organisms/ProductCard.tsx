import ProductType from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  const formattedPrice = product.price_including_tax_cents.toLocaleString();

  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-50">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 px-1">
        <h3 className="text-[13px] font-medium text-neutral-900 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[15px] font-semibold text-neutral-900 tabular-nums">
          ¥{formattedPrice}
        </p>
      </div>
    </Link>
  );
}
