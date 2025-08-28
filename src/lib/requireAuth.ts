import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth(redirectTo = "/") {
  const session = await auth();
  if (!session) redirect(redirectTo);
  return session;
}