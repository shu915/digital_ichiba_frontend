"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

export default function StripeButton({
  stripe_status,
}: {
  stripe_status?: string;
}) {
  useEffect(() => {
    if (stripe_status === "success") toast.success("Stripe連携成功");
    if (stripe_status === "retry") toast.error("Stripe連携に失敗しました");
  }, [stripe_status]);

  return (
    <Button
      onClick={async () => {
        const res = await fetch("/api/stripe_accounts", {
          method: "POST",
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          window.location.href = data.onboarding_url;
        }
        if (res.status === 409) {
          toast.success("Stripe連携済みです");
        }
      }}
    >
      <span className="font-bold">Stripe連携</span>
    </Button>
  );
}
