import type { Metadata } from "next";

export const OGP_SITE_NAME = "Digital Ichiba";
export const OGP_LOCALE = "ja_JP";
export const OGP_IMAGE_PATH = "/images/digital-ichiba_ogp.png";

export function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export function truncateText(text: string, maxLength: number) {
  const normalized = normalizeText(text);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 1))}…`;
}

export function buildOgpMetadata(params: {
  title: string;
  description: string;
  url: string;
}): Metadata {
  return {
    title: params.title,
    description: params.description,
    openGraph: {
      title: params.title,
      description: params.description,
      type: "website",
      url: params.url,
      siteName: OGP_SITE_NAME,
      locale: OGP_LOCALE,
      images: [
        {
          url: OGP_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: OGP_SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images: [OGP_IMAGE_PATH],
    },
  };
}


