import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Ichiba",
  description: "Digital Ichiba",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  openGraph: {
    title: "Digital Ichiba",
    description: "5分で始めるセレクトショップのためのECプラットフォーム",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/digital-ichiba_ogp.png",
        width: 1200,
        height: 630,
        alt: "Digital Ichiba",
      },
    ],
    siteName: "Digital Ichiba",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Ichiba",
    description: "5分で始めるセレクトショップのためのECプラットフォーム",
    images: ["/images/digital-ichiba_ogp.png"],
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  flex flex-col min-h-[100svh]`}
      >
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
