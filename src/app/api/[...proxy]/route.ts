import { NextRequest, NextResponse } from "next/server";
import createBackendJWTFromRequest from "@/lib/createBackendJWTFromRequest";
import getProxyFlags from "@/lib/getProxyFlags";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

/**
 * キャッチオールAPIプロキシ
 * クライアントからのリクエストを受け取り、jwtを取得してAPIに転送する
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const { proxy } = await params;
  return handleRequest(request, proxy, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const { proxy } = await params;
  return handleRequest(request, proxy, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const { proxy } = await params;
  return handleRequest(request, proxy, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const { proxy } = await params;
  return handleRequest(request, proxy, "DELETE");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const { proxy } = await params;
  return handleRequest(request, proxy, "PATCH");
}

/**
 * リクエストを処理し、APIに転送する共通関数
 */
async function handleRequest(
  request: NextRequest,
  proxyPaths: string[],
  method: string
) {
  try {
    const { setJWT, setCookie } = getProxyFlags(proxyPaths, method);
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

    if (setJWT) {
      const jwt = await createBackendJWTFromRequest(request);
      headers.set("Authorization", `Bearer ${jwt}`);
    }

    
    // APIにリクエストを転送
    const response = await fetch(apiUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    // APIからのレスポンスをそのまま返す
    const data = await response.json();
    

    if (setCookie) {
      const diDataForCookie = {
        user: data.user,
        shop: {
          id: data.shop.id,
          name: data.shop.name,
        },
      };

      (await cookies()).set("di_data", JSON.stringify(diDataForCookie), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 3,
      });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("API呼び出しエラー:", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "サーバーとの通信中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
