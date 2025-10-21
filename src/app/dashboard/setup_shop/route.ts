import { NextResponse, NextRequest } from "next/server";
import createBackendJwtFromRequest from "@/lib/createBackendJwtFromRequest";

export async function POST(request: NextRequest) {

  const backendJwt = await createBackendJwtFromRequest(request);

  const railsRes = await fetch(`${process.env.RAILS_URL}/api/shop`, {
    method: "POST",
    headers: { Authorization: `Bearer ${backendJwt}` },
    cache: "no-store",
  });
  const diData = await railsRes.text();
  
  const NextRes = NextResponse.redirect(new URL("/dashboard/shop", request.url), 303);
  NextRes.cookies.set("di_data", diData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
  return NextRes;
}