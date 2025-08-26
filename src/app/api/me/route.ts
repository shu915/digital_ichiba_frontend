import { auth } from "@/auth";               // NextAuthのserver helper
import { mintUserJWT } from "../_lib/jwt";   // 先に作った関数を再利用

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return new Response("unauthorized", { status: 401 });

  const token = await mintUserJWT(email);

  const r = await fetch(`${process.env.RAILS_URL}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return new Response(await r.text(), {
    status: r.status,
    headers: {
      "content-type": r.headers.get("content-type") ?? "application/json",
    },
  });
}