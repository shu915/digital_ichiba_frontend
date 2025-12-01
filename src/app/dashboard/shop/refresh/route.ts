import { NextResponse, NextRequest } from "next/server";
import requireAuth from "@/lib/requireAuth";
import requireShopOrAdmin from "@/lib/requireShopOrAdmin";

export async function GET(request: NextRequest) {
  await requireAuth();
  await requireShopOrAdmin();

  const res = await fetch(`${process.env.NEXT_URL}/api/shop`, {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  const redirect = NextResponse.redirect(
    new URL("/dashboard/shop", request.url)
  );
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) redirect.headers.set("set-cookie", setCookie);
  return redirect;
}
