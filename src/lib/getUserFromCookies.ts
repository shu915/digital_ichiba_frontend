import { cookies } from "next/headers";

export const getUserFromCookies = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("di_user")?.value;
  if (!raw) return null;
  const data = JSON.parse(decodeURIComponent(raw));
  return data;
};