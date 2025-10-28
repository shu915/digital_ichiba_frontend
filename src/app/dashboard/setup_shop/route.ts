import { NextResponse, NextRequest } from "next/server";
import handleProxyRequest from "@/lib/handleProxyRequest";
import { requireAuth } from "@/lib/requireAuth";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";

export async function POST(request: NextRequest) {
  await requireAuth();
  await requireShopOrAdmin();

  const res = await handleProxyRequest(request, ["shop"], "POST");
  if (!res.ok) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.redirect(new URL("/dashboard/shop", request.url));
}