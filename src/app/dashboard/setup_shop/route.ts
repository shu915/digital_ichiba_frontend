import { NextResponse } from "next/server";
import { createBackendJWT } from "@/lib/createBackendJWT";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  const token = await getToken({ req: request });

  const backendJWT = await createBackendJWT({
    email: token!.email!,
    provider: token!.provider as "email" | "google",
    provider_subject: token!.provider_subject as string,
  });

  const r = await fetch(`${process.env.RAILS_URL}/api/shops`, {
    method: "POST",
    headers: { Authorization: `Bearer ${backendJWT}` },
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