"use client";

import { useState, useEffect, useRef } from "react";
import ProductType from "@/types/product";
import ProductListType from "@/types/productList";
import ProductCard from "@/components/organisms/ProductCard";
import Pagination from "@/components/organisms/Pagination";
import { useRouter } from "next/navigation";

export default function ProductListClient({
  shop_id,
  initialProducts,
  initialPage,
}: {
  shop_id: string;
  initialProducts: ProductListType;
  initialPage: number;
}) {
  const router = useRouter();
  const isFirstRender = useRef(true);

  const [page, setPage] = useState<number>(initialPage);
  const [products, setProducts] = useState<ProductType[]>(
    initialProducts.products
  );
  const [totalItems, setTotalItems] = useState<number>(
    initialProducts.total_items
  );

  useEffect(() => {
    router.replace(`?page=${page}`, { scroll: false });
  }, [page, router]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 初回はSSRのデータをそのまま使う
    }
    (async () => {
      try {
        const res = await fetch(
          `/api/products?shop_id=${shop_id}&page=${page}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        const data: ProductListType = await res.json();
        setProducts(data.products);
        setTotalItems(data.total_items);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [shop_id, page]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={totalItems}
          perPage={12}
        />
      </div>
    </div>
  );
}
