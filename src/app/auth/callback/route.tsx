import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { createBackendJWT } from "@/lib/createBackendJWT";
import { signOut } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return NextResponse.redirect(new URL("/login", request.url));

  const jwt = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const provider = jwt?.provider === "google" ? "google" : "email";
  const subject =
    typeof jwt?.provider_subject === "string" ? jwt.provider_subject : email;

  const backendJWT = await createBackendJWT({ email, provider, provider_subject: subject });

  const r = await fetch(`${process.env.RAILS_URL}/api/login`, {
    method: "POST",
    headers: { Authorization: `Bearer ${backendJWT}` },
    cache: "no-store",
  });
  if (!r.ok) {
    await signOut();
    return NextResponse.redirect(new URL("/auth/signout", request.url));
  }
  const body = await r.text();

  const res = NextResponse.redirect(new URL("/", request.url));
  res.cookies.set("di_user", body, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 5,
  });
  return res;
}