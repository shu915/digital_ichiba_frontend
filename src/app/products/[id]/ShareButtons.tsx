"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const handleShareX = useCallback(() => {
    const href =
      typeof window !== "undefined" ? window.location.href : location.href;
    const text = encodeURIComponent(title);
    const url = encodeURIComponent(href);
    const xUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
  }, [title]);

  const handleShareLine = useCallback(async () => {
    const href =
      typeof window !== "undefined" ? window.location.href : location.href;
    const shareText = `${title} ${href}`;

    // 1) Web Share API（対応ブラウザ/モバイルでネイティブ共有 → LINE選択可）
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator).share({
          title: title,
          text: title,
          url: href,
        } as ShareData);
        return;
      } catch {
        // ユーザーキャンセル/失敗 → 以降のフォールバックに進む
      }
    }

    // 2) プラットフォーム別フォールバック（LINEアプリ起動を試みる）
    const ua = (typeof navigator !== "undefined" && navigator.userAgent) || "";
    const encodedAll = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(href);

    // iOS（Safari想定）: URLスキームでLINEアプリ
    if (/iP(hone|od|ad)/.test(ua)) {
      const iosScheme = `line://msg/text/${encodedAll}`;
      window.location.href = iosScheme;
      return;
    }

    // Android: intentスキームでLINEアプリ
    if (/Android/.test(ua)) {
      const androidIntent = `intent://msg/text/${encodedAll}#Intent;scheme=line;package=jp.naver.line.android;end`;
      window.location.href = androidIntent;
      return;
    }

    // 3) デスクトップ等: Web版シェアページ
    const webShare = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
    window.open(webShare, "_blank", "noopener,noreferrer");
  }, [title]);

  return (
    <div className="pt-2 flex flex-col sm:flex-row gap-2">
      <Button onClick={handleShareX} className="w-full sm:w-auto">
        <span className="font-bold">Xでシェア</span>
      </Button>
      <Button onClick={handleShareLine} className="w-full sm:w-auto">
        <span className="font-bold">LINEでシェア</span>
      </Button>
    </div>
  );
}
