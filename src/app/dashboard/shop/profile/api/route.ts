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

  return new NextResponse(await r.text(), { status: r.status });
}