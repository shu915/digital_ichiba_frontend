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
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="3">3</SelectItem>
        <SelectItem value="4">4</SelectItem>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="6">6</SelectItem>
        <SelectItem value="7">7</SelectItem>
        <SelectItem value="8">8</SelectItem>
        <SelectItem value="9">9</SelectItem>
        <SelectItem value="10">10</SelectItem>
      </SelectContent>
      </Select>

      <Button onClick={addProductToCart} className="mt-4">カートに入れる</Button>
    </div>
  );
}