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

export default function ProductQuantityForm({
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
      toast.error("カートには同じショップの商品だけを入れられます。カートを空にしてください。");
      return;
    }

    // 既存の同じ商品があるか探す（idは文字列で比較）
    const existingIndex = cart.findIndex(
      (item: CartItemType) => item.productId === Number(product.id)
    );

    if (existingIndex >= 0) {
      // すでにあれば quantity を加算
      cart[existingIndex].quantity += quantity;

      // quantityが0以下になったら削除
      if (cart[existingIndex].quantity <= 0) {
        cart.splice(existingIndex, 1);
      }
    } else {
      // なければ新規追加（quantityが1以上の場合のみ）
      if (quantity > 0) {
        cart.push({ productId: Number(product.id), quantity });
      }
    }

    // cartShopId の維持/設定/削除
    if (cart.length > 0) {
      // カートに商品があれば、そのショップIDを保持
      localStorage.setItem("cartShopId", currentShopId);
    } else {
      // カートが空になったらショップ紐付けを解除
      localStorage.removeItem("cartShopId");
    }

    // 保存
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("カートに追加しました！");
  };

  return (
    <div>
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

      <Button onClick={addProductToCart} className="mt-4">
        <span className="font-bold">カートに入れる</span>
      </Button>
    </div>
  );
}
