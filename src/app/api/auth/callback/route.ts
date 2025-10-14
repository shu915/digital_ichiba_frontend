import { NextResponse } from "next/server";
import { auth, signOut } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return NextResponse.redirect(new URL("/", request.url));

  const railsRes = await fetch(`${process.env.RAILS_URL}/api/login`, {
    method: "POST",
    cache: "no-store",
  });
  if (!railsRes.ok) {
    await signOut();
    return NextResponse.redirect(new URL("/", request.url));
  }

  const diData = await railsRes.text();

  const nextRes = NextResponse.redirect(new URL("/", request.url));
  nextRes.cookies.set("di_data", diData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
  return nextRes;
}
