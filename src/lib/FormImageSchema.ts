"use client";
import { z } from "zod";

const isFile = (v: unknown): v is File =>
  typeof File !== "undefined" && v instanceof File; // SSRでも安全


export const ACCEPTED_IMAGE_TYPES: string[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

export const imageFileRequired = z
  .custom<File>((f) => isFile(f), { message: "画像を選択してください" })
  .refine((f) => f.size <= MAX_IMAGE_BYTES, "5MBまで")
  .refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), "PNG/JPG/WEBPのみ");

export const imageFileOptional = imageFileRequired.optional();
