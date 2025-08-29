import { NextResponse } from "next/server";
import { mintIdentityFromRequest } from "@/lib/mintIdentityFromRequest";

export async function POST(request: Request) {
  const identity = await mintIdentityFromRequest(request);
  if (!identity) return NextResponse.redirect(new URL("/login", request.url));

  const r = await fetch(`${process.env.RAILS_URL}/api/shops`, {
    method: "POST",
    headers: { Authorization: `Bearer ${identity}` },
    cache: "no-store",
  });
  const body = await r.text();
  
  const res = NextResponse.redirect(new URL("/dashboard/shop", request.url), 303);
  res.cookies.set("di_user", body, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}