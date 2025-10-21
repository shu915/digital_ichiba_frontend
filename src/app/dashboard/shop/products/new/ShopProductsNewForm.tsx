"use client";
import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { imageFileRequired } from "@/lib/formImageSchema";

export default function ShopProductsNewForm() {
  const schema = z.object({
    product_name: z
      .string()
      .min(1, "名前は必須です")
      .max(120, "120文字以内で入力してください"),
    product_description: z.string().max(500, "500文字以内で入力してください"),
    product_price: z
      .number({ message: "整数で入力してください" })
      .int({ message: "整数で入力してください" })
      .min(0, "0以上の整数で入力してください"),
    product_stock: z
      .number({ message: "整数で入力してください" })
      .int({ message: "整数で入力してください" })
      .min(0, "0以上の整数で入力してください"),
    product_image: imageFileRequired,
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
      product_name: "",
      product_description: "",
      product_price: 0,
      product_stock: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("product[name]", data.product_name);
    formData.append("product[description]", data.product_description);
    formData.append("product[price]", String(data.product_price));
    formData.append("product[stock]", String(data.product_stock));
    formData.append("product[image]", data.product_image);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    if (res.ok) {
      reset({
        product_name: "",
        product_description: "",
        product_price: 0,
        product_stock: 0,
      });
      resetField("product_image");
      formRef.current?.reset();
      toast("商品を作成しました");
    } else {
      toast("商品の作成に失敗しました");
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
          <label htmlFor="product_price" className="font-bold">
            税抜き価格
          </label>
          {errors.product_price && (
            <p className="text-red-500 text-sm">
              {errors.product_price.message}
            </p>
          )}
          <Input
            id="product_price"
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            placeholder="0"
            {...register("product_price", { valueAsNumber: true })}
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
        作成する
      </Button>
    </form>
  );
}
