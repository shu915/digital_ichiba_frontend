import { NextRequest, NextResponse } from "next/server";
import getProxyFlags from "@/lib/getProxyFlags";
import createBackendJwtFromRequest from "@/lib/createBackendJwtFromRequest";

export default async function handleProxyRequest(
  request: NextRequest,
  proxyPaths: string[],
  method: string
) {
  try {
    const { setJwtFlag, setCookieFlag } = getProxyFlags(
      proxyPaths,
      method
    );
    const endpoint = `/${proxyPaths.join("/")}`;
    const url = new URL(request.url);
    const apiUrl = `${process.env.RAILS_URL}/api${endpoint}${url.search}`;

    const contentType = request.headers.get("content-type") || "";
    const headers = new Headers();
    let body;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (contentType.includes("multipart/form-data")) {
        body = await request.formData();
      } else {
        const json = await request.json().catch(() => null);
        if (json != null) {
          headers.set("content-type", "application/json");
          body = JSON.stringify(json);
        }
      }
    }

    if (setJwtFlag) {
      const jwt = await createBackendJwtFromRequest();
      headers.set("Authorization", `Bearer ${jwt}`);
    }

    // APIにリクエストを転送
    const response = await fetch(apiUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    // APIからのレスポンスを処理する
    const railsRes = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "データの取得に失敗しました" },
        { status: response.status }
      );
    }

    const nextRes = NextResponse.json(railsRes, { status: response.status });

    if (setCookieFlag && railsRes?.shop) {
      const diDataForCookie = {
        user: railsRes.user ?? undefined,
        shop: {
          id: railsRes.shop.id,
          name: railsRes.shop.name,
          stripe_onboarded: railsRes.shop.stripe_onboarded,
        },
      };

      const diData = JSON.stringify(diDataForCookie);

      nextRes.cookies.set("di_data", diData, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 3,
      });
    }

    return nextRes;
  } catch (error) {
    console.error("API呼び出しエラー:", error);

    return NextResponse.json(
      { message: "サーバーとの通信中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
