"use client";
import { z } from "zod";

const isFile = (v: unknown): v is File =>
  typeof File !== "undefined" && v instanceof File; // SSRでも安全

const ACCEPTED_IMAGE_TYPES: string[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

export const imageFileRequired = z
  .custom<File>((f) => isFile(f), { message: "画像ファイルを選択してください" })
  .refine(
    (f) => f.size <= MAX_IMAGE_BYTES,
    "ファイルサイズは5MB以下にしてください"
  )
  .refine(
    (f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
    "対応している形式は PNG / JPG / WEBP のみです"
  );

export const imageFileOptional = imageFileRequired.optional();
