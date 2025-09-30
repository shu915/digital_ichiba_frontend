"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/organisms/ProductCard";
import Pagination from "@/components/organisms/Pagination";

export default function ProductsList({ shop_id }: { shop_id: string }) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `/api/products?shop_id=${shop_id}&page=${page}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        const data = await res.json();
        setProducts(data.products);
        setTotalItems(data.total_items);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [shop_id, page]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4">
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
