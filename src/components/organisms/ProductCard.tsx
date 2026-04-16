import ProductType from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  const formattedPrice = product.price_including_tax_cents.toLocaleString();

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-lg bg-card overflow-hidden border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
    >
      <figure className="relative w-full aspect-square overflow-hidden bg-muted">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </figure>
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="mt-2 text-base font-bold text-foreground">
          <span className="text-xs font-normal text-muted-foreground mr-0.5">
            ¥
          </span>
          {formattedPrice}
          <span className="text-xs font-normal text-muted-foreground ml-1">
            (税込)
          </span>
        </p>
      </div>
    </Link>
  );
}
