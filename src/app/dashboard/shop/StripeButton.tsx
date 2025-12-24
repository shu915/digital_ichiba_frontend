"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function StripeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/stripe_connect", {
        method: "POST",
        cache: "no-store",
      });
      if (!res.ok) {
        toast.error("Stripe連携の開始に失敗しました");
        return;
      }

      const data = await res.json().catch(() => null);
      const url = data?.onboarding_url || data?.login_url;
      if (!url) {
        toast.error("Stripeの遷移先URLを取得できませんでした");
        return;
      }

      window.location.href = url;
    } catch {
      toast.error("Stripe連携の開始に失敗しました");
    } finally {
      // リダイレクトできなかった場合のみ戻す
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full sm:w-auto"
      onClick={handleConnect}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          <span className="font-bold">準備中...</span>
        </>
      ) : (
        <span className="font-bold">Stripe連携</span>
      )}
    </Button>
  );
}
