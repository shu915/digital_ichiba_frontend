import ProductType from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  const formattedPrice = product.price_including_tax_cents.toLocaleString();

  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-100">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm tracking-wide text-neutral-800 line-clamp-1 group-hover:text-neutral-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-500 tabular-nums">
          {formattedPrice}
          <span className="ml-1 text-xs">円</span>
        </p>
      </div>
    </Link>
  );
}
