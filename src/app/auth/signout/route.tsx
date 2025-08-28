import { signOut } from "@/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  await signOut();
  (await cookies()).delete("di_user");
  return NextResponse.redirect(new URL("/", request.url));
}