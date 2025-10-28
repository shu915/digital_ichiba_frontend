"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewProductButton({
  onboarded,
}: {
  onboarded: boolean;
}) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (onboarded) {
          router.push("/dashboard/shop/products/new");
          return;
        }
        toast.error(
          "先にStripeのオンボーディングを完了してください。オンボーディングしたあとに再ログインしてください"
        );
      }}
    >
      <span className="font-bold">商品新規登録</span>
    </Button>
  );
}
