"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CartItemType from "@/types/cartItem";

export default function CheckoutButton() {
  const handlePayment = async () => {
    const sessionRes = await fetch("/api/auth/session", { cache: "no-store" });
    const session = sessionRes.ok ? await sessionRes.json().catch(() => null) : null;
    if (!session?.user?.email) {
      toast.error("先にログインしてください");
      return;
    }
    const cartJson = localStorage.getItem("cart");
    const cart = cartJson ? JSON.parse(cartJson) : [];
    if (cart.length === 0) {
      toast.error("カートに商品がありません");
      return;
    }
    const cartShopId = localStorage.getItem("cartShopId");
    if (!cartShopId) {
      toast.error("カートのショップがありません");
      return;
    }
    const checkoutRes = await fetch("/api/stripe_checkout", {
      method: "POST",
      body: JSON.stringify({
        cart: cart.map((item: CartItemType) => ({
          product_id: item.productId,
          quantity: item.quantity,
        })),
      }),
    });
    if (!checkoutRes.ok) {
      toast.error("決済に失敗しました");
      return;
    }
    const checkout = await checkoutRes.json();
    window.location.href = checkout.url;
  };
  return (
    <Button onClick={handlePayment}>
      <span className="font-bold">決済する</span>
    </Button>
  );
}
