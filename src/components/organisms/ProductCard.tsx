import ProductType from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="w-full border border-gray-200 rounded-md">
      <Link href={`/products/${product.id}`} className="w-full block p-2">
        <figure className="w-full aspect-square overflow-hidden">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </figure>
        <p className="text-center font-bold mt-2">{product.name}</p>
        <p className="text-right mt-2">
          {product.price_including_tax_cents}円(税込)
        </p>
      </Link>
    </div>
  );
}
