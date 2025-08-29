import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { mintUserJWT } from "@/lib/jwt";

export async function mintIdentityFromRequest(req: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;

  const jwt = await getToken({ req, secret: process.env.AUTH_SECRET });
  const provider = jwt?.provider === "google" ? "google" : "email";
  const subject = typeof jwt?.provider_subject === "string" ? jwt.provider_subject : email;

  return await mintUserJWT({ email, provider, provider_subject: subject });
}