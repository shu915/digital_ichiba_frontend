import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES: string[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

export const imageFileRequired = z
  .instanceof(File, { message: "画像を選択してください" })
  .refine((f) => f.size <= MAX_IMAGE_BYTES, "5MBまで")
  .refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), "PNG/JPG/WEBPのみ");

export const imageFileOptional = imageFileRequired.optional();
