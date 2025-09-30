import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="w-full border border-gray-200 rounded-md">
    <Link href={`/products/${product.id}`} className="w-full block p-2">
      <figure className="w-full aspect-square overflow-hidden relative">
      <Image src={product.image_url} alt={product.name} fill className="w-full object-cover" />
      </figure>
      <p className="text-center font-bold mt-2">{product.name}</p>
      <p className="text-right mt-2">{product.price_including_tax_cents}円(税込)</p>
      </Link>
    </div>
  );
}
