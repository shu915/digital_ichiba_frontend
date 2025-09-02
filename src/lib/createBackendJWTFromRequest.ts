import { getToken } from "next-auth/jwt";
import createBackendJWT from "@/lib/createBackendJWT";


export default async function createBackendJWTFromRequest(request: Request): Promise<string> {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });
  if (!token?.email) throw new Error("unauthorized");

  return await createBackendJWT({
    email: token.email as string,
    provider: token.provider as "google" | "email" | undefined,
    provider_subject: token.provider_subject as string | undefined,
  });
}