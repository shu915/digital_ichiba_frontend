"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import validateImageFile from "@/lib/validateImageFile";
import { toast } from "sonner";


const schema = z.object({
  shop_name: z.string().min(1, "名前は必須です").max(40),
  shop_description: z.string().max(2000),
});
type FormValues = z.infer<typeof schema>;

export default function ProfileForm() {
  const [shopIcon, setShopIcon] = useState<File | null>(null);
  const [shopHeader, setShopHeader] = useState<File | null>(null);
  const [shopIconError, setShopIconError] = useState<string | null>(null);
  const [shopHeaderError, setShopHeaderError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {

    const formData = new FormData();
    formData.append("shop[name]", data.shop_name);
    formData.append("shop[description]", data.shop_description);
    if (shopIcon) {
      formData.append("shop[icon]", shopIcon);
    }
    if (shopHeader) {
      formData.append("shop[header]", shopHeader);
    }

    const res = await fetch(`/dashboard/shop/profile/api`, {
      method: "PATCH",
      body: formData,
      cache: "no-store",
    });
    if (res.ok) {
      toast('ショッププロフィールを更新しました');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-3xl mx-auto p-4 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-bold">
          名前(必須)
        </label>
        {errors.shop_name && <p className="text-red-500 text-sm">{errors.shop_name.message}</p>}
        <Input
          {...register("shop_name")}
          placeholder="お店の名前"
          id="name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-bold">
          説明
        </label>
        {errors.shop_description && <p className="text-red-500 text-sm">{errors.shop_description.message}</p>}
        <Textarea
          {...register("shop_description")}
          placeholder="2000文字以内で入力してください"
          className="resize-none h-40"
          id="shop_description"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="shop_icon" className="font-bold">
          アイコン
        </label>
        {shopIconError && <p className="text-red-500 text-sm">{shopIconError}</p>}
        <Input
          type="file"
          placeholder="アイコン"
          id="shop_icon"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (!f) { setShopIcon(null); setShopIconError(null); return; }
            const err = validateImageFile(f);
            if (err) { setShopIconError(err); e.currentTarget.value = ""; return; }
            setShopIconError(null);
            setShopIcon(f);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="shop_header" className="font-bold">
          ヘッダー
        </label>
        {shopHeaderError && <p className="text-red-500 text-sm">{shopHeaderError}</p>}
        <Input
          type="file"
          placeholder="ヘッダー"
          id="shop_header"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (!f) { setShopHeader(null); setShopHeaderError(null); return; }
            const err = validateImageFile(f);
            if (err) { setShopHeaderError(err); e.currentTarget.value = ""; return; }
            setShopHeaderError(null);
            setShopHeader(f);
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-48 mx-auto max-w-full"
      >
        保存
      </Button>
    </form>
  );
}
