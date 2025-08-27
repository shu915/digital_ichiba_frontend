import { auth } from "@/auth"; // NextAuthのserver helper
import { mintUserJWT } from "../_lib/jwt"; // 先に作った関数を再利用
import { getToken } from "next-auth/jwt";

export async function GET(request: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return new Response("unauthorized", { status: 401 });

  const jwt = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const provider = (jwt?.provider ?? "email") as "email" | "google";
  const provider_subject = jwt?.provider_subject as string;
  const identity = await mintUserJWT({ email, provider, provider_subject });

  const r = await fetch(`${process.env.RAILS_URL}/api/me`, {
    headers: { Authorization: `Bearer ${identity}` },
    cache: "no-store",
  });

  return new Response(await r.text(), {
    status: r.status,
    headers: {
      "content-type": r.headers.get("content-type") ?? "application/json",
    },
  });
}
