"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function DeleteProduct({ id }: { id: string }) {
  const deleteProduct = async () => {
    if (!confirm("商品を削除しますか？")) {
      return;
    }
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    if (res.ok) {
      redirect("/dashboard/shop");
    } else {
      toast("商品の削除に失敗しました");
    }
  };
  return (
    <Button onClick={deleteProduct} className="bg-red-500 text-white hover:bg-red-600">
      <span className="font-bold">削除する</span>
    </Button>
  );
};