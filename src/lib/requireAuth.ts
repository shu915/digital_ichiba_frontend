import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserFromCookies } from "./getUserFromCookies";
import { signOut } from "@/auth";

export async function requireAuth(redirectTo = "/") {
  const session = await auth();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}