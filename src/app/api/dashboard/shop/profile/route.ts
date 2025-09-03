import { NextResponse } from "next/server";
import createBackendJWTFromRequest from "@/lib/createBackendJWTFromRequest";

export async function GET(request: Request) {
  const jwt = await createBackendJWTFromRequest(request);
  const r = await fetch(`${process.env.RAILS_URL}/api/shop`, {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });
  const text = await r.text();
  if (!r.ok) {
    return NextResponse.json({ error: text || "upstream error" }, { status: r.status });
  }

  const data = JSON.parse(text);
  const diData = { user: data.user, shop: data.shop };

  const res = NextResponse.json({ ok: true, ...diData }, { status: 200 });

  return res;
}

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
  const diDataForCookie = {
    user: data.user,
    shop: {
      id: data.shop.id,
      name: data.shop.name,
    }
  };
  const diData = {
    user: data.user,
    shop: {
      id: data.shop.id,
      name: data.shop.name,
      description: data.shop.description,
    }
  };

  const res = NextResponse.json({ ok: true, ...diData }, { status: 200 });
  res.cookies.set("di_data", JSON.stringify(diDataForCookie), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });

  return res;
}