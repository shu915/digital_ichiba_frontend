import { getToken } from "next-auth/jwt";
import createBackendJwt from "@/lib/createBackendJwt";

export default async function createBackendJwtFromRequest(
  request: Request
): Promise<string> {
  
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  
  if (!token?.email) throw new Error("unauthorized");

  return createBackendJwt({
    email: token.email as string,
    provider: token.provider as "google" | "email" | undefined,
    provider_subject: token.provider_subject as string | undefined,
  });
}