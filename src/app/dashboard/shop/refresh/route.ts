import { NextResponse, NextRequest } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";
import handleProxyRequest from "@/lib/handleProxyRequest";

export async function GET(request: NextRequest) {
  await requireAuth();
  await requireShopOrAdmin();

  const res = await handleProxyRequest(request, ["shop"], "GET");
  const redirect = NextResponse.redirect(
    new URL("/dashboard/shop", request.url)
  );
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) redirect.headers.set("set-cookie", setCookie);
  return redirect;
}
