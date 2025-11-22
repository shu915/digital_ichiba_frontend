import createBackendJwt from "@/lib/createBackendJwt";
import { auth } from "@/auth";

export default async function createBackendJwtFromSession(): Promise<string> {
  const session = await auth();
  const email = session?.user?.email as string | undefined;
  if (!email) throw new Error("unauthorized");

  return createBackendJwt({
    email,
    provider: session?.user.provider,
    provider_subject: session?.user.provider_subject,
  });
}
