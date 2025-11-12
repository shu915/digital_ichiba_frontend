"use client";

import ProductType from "@/types/product";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CartItemType from "@/types/cartItem";
import { toast } from "sonner";

export default function ProductAddToCartForm({
  product,
}: {
  product: ProductType;
}) {
  const [quantity, setQuantity] = useState(1);

  const addProductToCart = () => {
    // カートを取得（なければ空配列）
    const cartStr = localStorage.getItem("cart");
    const cart: CartItemType[] = cartStr ? JSON.parse(cartStr) : [];

    // すでに別ショップのカートが存在する場合はブロック
    const cartShopIdRaw = localStorage.getItem("cartShopId");
    const storedShopId = (cartShopIdRaw ?? "").toString().trim();
    const currentShopId = String(product.shop_id ?? "").trim();
    if (cart.length > 0 && storedShopId && storedShopId !== currentShopId) {
      toast.error(
        "カートには同じショップの商品だけを入れられます。カートを空にしてください。"
      );
      return;
    }

    const existingIndex = cart.findIndex(
      (item: CartItemType) => item.productId === Number(product.id)
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;

      if (cart[existingIndex].quantity <= 0) {
        cart.splice(existingIndex, 1);
      }
    } else {
      if (quantity > 0) {
        cart.push({ productId: Number(product.id), quantity });
      }
    }

    if (cart.length > 0) {
      localStorage.setItem("cartShopId", currentShopId);
    } else {
      localStorage.removeItem("cartShopId");
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("カートに追加しました！");
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="min-w-[160px]">
        <Select
          onValueChange={(value) => setQuantity(Number(value))}
          defaultValue="1"
        >
          <SelectTrigger>
            <SelectValue placeholder="個数を選択" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={addProductToCart} className="font-bold">
        カートに入れる
      </Button>
    </div>
  );
}
