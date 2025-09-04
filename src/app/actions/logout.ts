"use server";
import { cookies } from "next/headers";
import { signOut } from "@/auth";

export async function logoutAction() {
  (await cookies()).delete("di_data");
  await signOut({ redirectTo: "/" });
}
