"use client";
import PageTitle from "@/components/atoms/PageTitle";
import { useState, useEffect } from "react";
import CartItemType from "@/types/cartItem";
import ProductType from "@/types/product";
import { Button } from "@/components/ui/button";
import ShopHeader from "@/components/atoms/ShopHeader";
import CartTableBody from "./CartTableBody";

export default function CartPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [quantityById, setQuantityById] = useState<Record<number, number>>({});
  const clearCart = () => {
    if (!confirm("カートを空にしますか？")) return;
    localStorage.removeItem("cart");
    localStorage.removeItem("cartShopId");
    setProducts([]);
  };
  useEffect(() => {
    try {
      const cartJson = localStorage.getItem("cart");
      if (cartJson) {
        const cartItems = JSON.parse(cartJson) as CartItemType[];

        const qMap: Record<number, number> = {};
        for (const item of cartItems) {
          qMap[item.productId] = item.quantity;
        }
        setQuantityById(qMap);

        (async () => {
          const res = await fetch(`/api/products?ids=${cartItems.map((item: CartItemType) => item.productId).join(",")}`);
          const data = await res.json();
          setProducts(data.products);
        })();
      } else {
        console.log("カートは空です");
        setProducts([]);
        setQuantityById({});
      }
    } catch (e) {
      console.error("カートの読み込みに失敗しました:", e);
    }
  }, []);
  const totalCents = products.reduce((sum, p) => {
    const qty = quantityById[Number(p.id)] ?? 0;
    return sum + p.price_including_tax_cents * qty;
  }, 0);
  return (
    <div>
      {products.length > 0 && (
        console.log(products[0]),
        <div>
          {products[0].shop_header_url && (
            <ShopHeader
              shop_header_url={products[0].shop_header_url}
              shop_name={products[0].shop_name}
            />
          )}
        </div>
      )}
      <div className="py-8 inner">
        <PageTitle title="カート" />
        <p className="mt-4 font-bold text-red-500 text-center">
          カートには同じショップの商品だけを入れることができます。
          <br />
          他のショップの商品を購入する場合は、いまのカートを一度空にしてください。
        </p>
        <div className="flex justify-end">
          <Button onClick={clearCart} className="mt-4">
            <span className="font-bold">カートを空にする</span>
          </Button>
        </div>
        {products.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h2 className=" text-center text-2xl font-bold">{products[0].shop_name}</h2>
            <table className="mt-4 w-full text-center border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">イメージ</th>
                  <th className="p-2">商品名</th>
                  <th className="p-2">税込価格</th>
                  <th className="p-2">数量</th>
                  <th className="p-2">小計</th>
                </tr>
              </thead>
              <CartTableBody products={products} quantityById={quantityById} />
              <tfoot>
                <tr className="border-t">
                  <td className="p-2 text-right font-bold" colSpan={4}>
                    合計
                  </td>
                  <td className="p-2 font-bold">{totalCents}円</td>
                </tr>
              </tfoot>
            </table>
            <div className="flex justify-center mt-4">
              <Button><span className="font-bold">決済する</span></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
