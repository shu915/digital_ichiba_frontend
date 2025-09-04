"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateShop() {
  const router = useRouter();

  const onSubmit = async () => {
    if (!confirm("ショップを開設しますか？")) return;
    const res = await fetch("/api/shop", {
      method: "POST",
      cache: "no-store",
    });
    if (res.ok) {
      router.push("/dashboard/shop");
    }
  };

  return (
    <Button onClick={onSubmit} className="font-bold">
      ショップを開設
    </Button>
  );
}
