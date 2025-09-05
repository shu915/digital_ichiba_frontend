import { Product } from "@/types/product";
import PageTitle from "@/components/atoms/PageTitle";
import Image from "next/image";

export default async function ShopProductsShowPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_URL}/api/products/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  const product: Product = data.product;
  console.log(product);
  return <div>
    <PageTitle title={product?.name} />
    <div>
      <Image src={product?.image_url} alt={product?.name} width={100} height={100} />
    </div>
    <p>{product?.description}</p>
    <p>{product?.price}</p>
    <p>{product?.stock}</p>
  </div>;
}