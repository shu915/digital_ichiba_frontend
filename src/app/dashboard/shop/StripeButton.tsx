"use client";

import { Button } from "@/components/ui/button";

export default function StripeButton() {
  return (
    <Button
      className="w-full sm:w-auto"
      onClick={async () => {
        const res = await fetch("/api/stripe_accounts", {
          method: "POST",
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        const url = data.onboarding_url || data.login_url;
        if (url) window.location.href = url;
      }}
    >
      <span className="font-bold">Stripe連携</span>
    </Button>
  );
}
