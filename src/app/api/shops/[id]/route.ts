import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const r = await fetch(`${process.env.RAILS_URL}/api/shops/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const text = await r.text();
  if (!r.ok) {
    return NextResponse.json(
      { error: text || "upstream error" },
      { status: r.status }
    );
  }
  try {
    const json = text ? JSON.parse(text) : null;
    if (json === null) {
      return NextResponse.json(
        { error: "Empty response from backend" },
        { status: 502 }
      );
    }
    return NextResponse.json(json);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON from backend", body: text },
      { status: 502 }
    );
  }
}
