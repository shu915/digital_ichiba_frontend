import { Product } from "@/types/product";
import PageTitle from "@/components/atoms/PageTitle";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductQuantityForm from "./ProductQuantityForm";
import ShopHeader from "@/components/atoms/ShopHeader";

export default async function ShopProductsShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_URL}/api/products/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  const product: Product = data.product;
  if (!product) {
    notFound();
  }
  console.log(product);
  return (
    <div>
      <ShopHeader shop_header_url={product.shop_header_url} shop_name={product.shop_name} />
      <div className="py-8 inner">
        <PageTitle title={product?.name} />
        <div className="mt-4 w-[660px] mx-auto">
          <div className="flex justify-between">
            <Image
              src={product?.image_url}
              alt={product?.name}
              width={320}
              height={320}
            />
            <div className="w-[320px] flex flex-col gap-4 justify-center">
              <div className="flex gap-1">
                ショップ:
                <Link href={`/shops/${product?.shop_id}/profile`}>
                  {product?.shop_name}
                </Link>
              </div>
              <p>税込価格:{product?.price_including_tax_cents}円</p>
              <ProductQuantityForm product={product} />
            </div>
          </div>
          <p className="mt-4">{product?.description}</p>
        </div>
      </div>
    </div>
  );
}
