"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(1, "必須").max(40),
  description: z.string().min(1, "必須").max(2000),
});
type FormValues = z.infer<typeof schema>;

export default function ProfileForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await fetch("/dashboard/shop/profile", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-3xl mx-auto p-4 flex flex-col gap-4">
      <Input {...register("name")} placeholder="名前" />
      {errors.name && <p>{errors.name.message}</p>}
      <Textarea {...register("description")} placeholder="説明" className="resize-none h-40" />
      {errors.description && <p>{errors.description.message}</p>}
      <Button type="submit" disabled={isSubmitting} className="w-48 mx-auto max-w-full">保存</Button>
    </form>
  );
}