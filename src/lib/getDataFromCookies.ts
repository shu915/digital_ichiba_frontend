import { cookies } from "next/headers";

export default async function getDataFromCookies() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("di_data")?.value;
  if (!raw) return null;
  const data = JSON.parse(decodeURIComponent(raw));
  return data;
};