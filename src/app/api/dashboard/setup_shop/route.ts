import { NextResponse } from "next/server";
import createBackendJWTFromRequest from "@/lib/createBackendJWTFromRequest";

export async function POST(request: Request) {

  const backendJWT = await createBackendJWTFromRequest(request);

  const r = await fetch(`${process.env.RAILS_URL}/api/shops`, {
    method: "POST",
    headers: { Authorization: `Bearer ${backendJWT}` },
    cache: "no-store",
  });
  const body = await r.text();
  
  const res = NextResponse.redirect(new URL("/dashboard/shop", request.url), 303);
  res.cookies.set("di_data", body, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
  return res;
}