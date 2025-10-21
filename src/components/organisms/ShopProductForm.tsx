"use client";
import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { imageFileRequired, imageFileOptional } from "@/lib/formImageSchema";
import ProductType from "@/types/product";

export default function ShopProductForm({
  product,
}: {
  product: ProductType | null;
}) {
  // 編集時は画像を任意、新規作成時は必須
  const imageSchema = product ? imageFileOptional : imageFileRequired;

  const schema = z.object({
    product_name: z
      .string()
      .min(1, "名前は必須です")
      .max(120, "120文字以内で入力してください"),
    product_description: z.string().max(500, "500文字以内で入力してください"),
    product_excluding_tax_cents: z
      .number({ message: "整数で入力してください" })
      .int({ message: "整数で入力してください" })
      .min(0, "0以上の整数で入力してください"),
    product_stock: z
      .number({ message: "整数で入力してください" })
      .int({ message: "整数で入力してください" })
      .min(0, "0以上の整数で入力してください"),
    product_image: imageSchema,
  });

  type FormValues = z.infer<typeof schema>;

  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_name: product?.name ?? "",
      product_description: product?.description ?? "",
      product_excluding_tax_cents: product?.price_excluding_tax_cents ?? 0,
      product_stock: product?.stock ?? 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("product[name]", data.product_name);
    formData.append("product[description]", data.product_description);
    formData.append("product[price]", String(data.product_excluding_tax_cents));
    formData.append("product[stock]", String(data.product_stock));
    if (data.product_image) {
      formData.append("product[image]", data.product_image);
    }

    let res;
    if (product) {
      res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        body: formData,
        cache: "no-store",
      });
    } else {
      res = await fetch("/api/products", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });
    }

    if (res.ok) {
      const data = await res.json();
      if (product) {
        toast("商品を更新しました");
        reset({
          product_name: data.product?.name ?? "",
          product_description: data.product?.description ?? "",
          product_excluding_tax_cents: data.product?.price_excluding_tax_cents ?? 0,
          product_stock: data.product?.stock ?? 0,
        });
        resetField("product_image");
      } else {
        toast("商品を作成しました");
        reset({
          product_name: "",
          product_description: "",
          product_excluding_tax_cents: 0,
          product_stock: 0,
        });
        resetField("product_image");
      }
    } else {
      toast("商品の更新に失敗しました");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="w-3xl mx-auto p-4 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="product_name" className="font-bold">
          名前(必須)
        </label>
        {errors.product_name && (
          <p className="text-red-500 text-sm">{errors.product_name.message}</p>
        )}
        <Input
          id="product_name"
          placeholder="商品名"
          {...register("product_name")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product_description" className="font-bold">
          説明
        </label>
        {errors.product_description && (
          <p className="text-red-500 text-sm">
            {errors.product_description.message}
          </p>
        )}
        <Textarea
          id="product_description"
          placeholder="500文字以内で入力"
          className="resize-none h-32"
          {...register("product_description")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="product_excluding_tax_cents" className="font-bold">
            税抜き価格
          </label>
          {errors.product_excluding_tax_cents && (
            <p className="text-red-500 text-sm">
              {errors.product_excluding_tax_cents.message}
            </p>
          )}
          <Input
            id="product_excluding_tax_cents"
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            placeholder="0"
            {...register("product_excluding_tax_cents", { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product_stock" className="font-bold">
            在庫
          </label>
          {errors.product_stock && (
            <p className="text-red-500 text-sm">
              {errors.product_stock.message}
            </p>
          )}
          <Input
            id="product_stock"
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            placeholder="0"
            {...register("product_stock", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product_image" className="font-bold">
          画像(必須)
        </label>
        {errors.product_image && (
          <p className="text-red-500 text-sm">
            {errors.product_image.message as string}
          </p>
        )}
        <Controller
          name="product_image"
          control={control}
          render={({ field }) => (
            <Input
              id="product_image"
              type="file"
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
        {product ? "更新する" : "登録する"}
      </Button>
    </form>
  );
}
