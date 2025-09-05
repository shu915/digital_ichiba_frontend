"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageFileRequired } from "@/lib/FormImageSchema";

export default function ShopProductsNewForm() {
  const schema = z.object({
    product_name: z.string().min(1, "名前は必須です").max(120),
    product_description: z.string().max(500),
    product_price: z.number().min(0),
    product_stock: z.number().min(0),
    product_image: imageFileRequired,
  });
  type FormValues = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_name: "",
      product_description: "",
      product_price: 0,
      product_stock: 0,
      product_image: undefined,
    },
  }); 

  return <div>ShopProductsNewForm</div>;
}