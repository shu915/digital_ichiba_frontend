import createBackendJWTFromRequest from "@/lib/createBackendJWTFromRequest";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const jwt = await createBackendJWTFromRequest(request);
  const r = await fetch(`${process.env.RAILS_URL}/api/shops/${params.id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });
  const body = await r.text();
  return NextResponse.json(JSON.parse(body));
  }