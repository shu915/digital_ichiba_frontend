import { cookies } from "next/headers";

export const getUserFromCookies = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("di_user")?.value;
  const user = raw ? JSON.parse(decodeURIComponent(raw)) : null;
  return user;
};