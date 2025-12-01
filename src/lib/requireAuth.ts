import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function requireAuth(redirectTo = "/") {
  const session = await auth();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}