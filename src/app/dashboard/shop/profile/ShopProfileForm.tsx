"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import LoginDataType from "@/types/loginData";
import { useRouter } from "next/navigation";
import { imageFileOptional } from "@/lib/formImageSchema";

const schema = z.object({
  shop_name: z.string().min(1, "名前は必須です").max(40),
  shop_description: z.string().max(2000),
  shop_icon: imageFileOptional,
  shop_header: imageFileOptional,
});

type FormValues = z.infer<typeof schema>;

export default function ProfileForm({ loginData }: { loginData: LoginDataType }) {
  const shop = loginData?.shop;
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      shop_name: shop?.name ?? "",
      shop_description: shop?.description ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("shop[name]", data.shop_name);
    formData.append("shop[description]", data.shop_description);
    if (data.shop_icon) {
      formData.append("shop[icon]", data.shop_icon);
    }
    if (data.shop_header) {
      formData.append("shop[header]", data.shop_header);
    }

    const res = await fetch("/api/shop", {
      method: "PATCH",
      body: formData,
      cache: "no-store",
    });

    if (res.ok) {
      const updated = await res.json();
      reset({
        shop_name: updated.shop.name ?? "",
        shop_description: updated.shop.description ?? "",
      });
      router.refresh();
      toast("ショッププロフィールを更新しました");
    } else {
      toast("ショッププロフィールを更新できませんでした");
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
        {errors.shop_name && (
          <p className="text-red-500 text-sm">{errors.shop_name.message}</p>
        )}
        <Input {...register("shop_name")} placeholder="お店の名前" id="name" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="shop_description" className="font-bold">
          説明
        </label>
        {errors.shop_description && (
          <p className="text-red-500 text-sm">
            {errors.shop_description.message}
          </p>
        )}
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
        {errors.shop_icon && (
          <p className="text-red-500 text-sm">
            {errors.shop_icon.message as string}
          </p>
        )}
        <Controller
          name="shop_icon"
          control={control}
          render={({ field }) => (
            <Input
              type="file"
              placeholder="アイコン"
              id="shop_icon"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="shop_header" className="font-bold">
          ヘッダー
        </label>
        {errors.shop_header && (
          <p className="text-red-500 text-sm">
            {errors.shop_header.message as string}
          </p>
        )}
        <Controller
          name="shop_header"
          control={control}
          render={({ field }) => (
            <Input
              type="file"
              placeholder="ヘッダー"
              id="shop_header"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-48 mx-auto max-w-full font-bold"
      >
        保存
      </Button>
    </form>
  );
}
