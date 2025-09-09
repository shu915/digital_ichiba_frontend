"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductQuantityForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(0);

  const addProductToCart = () => {
    console.log(`${product.name}を${quantity}個かごに入れました`);
  };

  return (
    <div>
      <Select onValueChange={(value) => setQuantity(Number(value))}>
      <SelectTrigger>
        <SelectValue placeholder="個数を選択" />
      </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => (
            <SelectItem key={i} value={(i + 1).toString()}>{i + 1}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={addProductToCart} className="mt-4">カートに入れる</Button>
    </div>
  );
}