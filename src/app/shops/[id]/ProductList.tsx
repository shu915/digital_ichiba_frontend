import ProductListClient from "./ProductListClient";
import { ProductListType } from "@/types/productList";

export default async function ProductList({ shop_id }: { shop_id: string }) {
    const res = await fetch(`${process.env.NEXT_URL}/api/products?shop_id=${shop_id}`, {
      method: "GET",
      cache: "no-store",
  });
  const initialProducts: ProductListType = await res.json();
  return (
      <ProductListClient shop_id={shop_id} initialProducts={initialProducts} />
  );
}