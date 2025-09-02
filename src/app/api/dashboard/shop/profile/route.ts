import { NextResponse } from "next/server";
import createBackendJWTFromRequest from "@/lib/createBackendJWTFromRequest";

export async function PATCH(request: Request) {

  const jwt = await createBackendJWTFromRequest(request);

  const formData = await request.formData();
  const r = await fetch(`${process.env.RAILS_URL}/api/shop`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${jwt}` },
    body: formData,
    cache: "no-store",
  });

  const text = await r.text();
  if (!r.ok) {
    return NextResponse.json({ error: text || "upstream error" }, { status: r.status });
  }

  const data = JSON.parse(text); // { user, shop } を想定
  const diData = { user: data.user, shop: data.shop };

  const res = NextResponse.json({ ok: true, ...diData }, { status: 200 });
  res.cookies.set("di_data", JSON.stringify(diData), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}