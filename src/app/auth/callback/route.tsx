import { NextResponse } from "next/server";
import { auth } from "@/auth";
import createBackendJWTFromRequest from "@/lib/createBackendJWTFromRequest";
import { signOut } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return NextResponse.redirect(new URL("/login", request.url));

  const backendJWT = await createBackendJWTFromRequest(request);

  const r = await fetch(`${process.env.RAILS_URL}/api/login`, {
    method: "POST",
    headers: { Authorization: `Bearer ${backendJWT}` },
    cache: "no-store",
  });
  if (!r.ok) {
    await signOut();
    return NextResponse.redirect(new URL("/auth/signout", request.url));
  }
  const data = await r.json();
  const diData = encodeURIComponent(JSON.stringify(data));

  const res = NextResponse.redirect(new URL("/", request.url));
  res.cookies.set("di_data", diData, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 3,
  });
  return res;
}