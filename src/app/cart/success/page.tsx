"use client";

import { useEffect } from "react";
import PageTitle from "@/components/atoms/PageTitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartSuccessPage() {
  useEffect(() => {
    try {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartShopId");
    } catch {}
  }, []);

  return (
    <div className="py-8 inner">
      <PageTitle title="ご購入ありがとうございました" />
      <p className="mt-6 text-center">
        ご注文が完了しました。ご利用ありがとうございます。
      </p>
      <div className="mt-8 flex justify-center">
        <Button asChild className="font-bold">
          <Link href="/">トップへ戻る</Link>
        </Button>
      </div>
    </div>
  );
}
