import { cookies } from "next/headers";

export const getUserFromCookies = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("di_user")?.value;
  if (!raw) return null;
  return JSON.parse(decodeURIComponent(raw));
};