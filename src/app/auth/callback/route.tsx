import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { mintUserJWT } from "@/lib/jwt";

export async function GET(request: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return NextResponse.redirect(new URL("/login", request.url));

  const jwt = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const provider = jwt?.provider === "google" ? "google" : "email";
  const subject =
    typeof jwt?.provider_subject === "string" ? jwt.provider_subject : email;

  const identity = await mintUserJWT({ email, provider, provider_subject: subject });

  const r = await fetch(`${process.env.RAILS_URL}/api/login`, {
    method: "POST",
    headers: { Authorization: `Bearer ${identity}` },
    cache: "no-store",
  });
  const body = await r.text();

  const res = NextResponse.redirect(new URL("/", request.url));
  res.cookies.set("di_user", body, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60,
  });
  return res;
}