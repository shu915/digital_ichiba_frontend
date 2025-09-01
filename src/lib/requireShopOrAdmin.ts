import getDataFromCookies from "@/lib/getDataFromCookies";
import { redirect } from "next/navigation";


export default async function requireShopOrAdmin() {
  const data = await getDataFromCookies();
  const user = data?.user;
  if (!["shop", "admin"].includes(user?.role ?? "")) {
    redirect("/dashboard");
  }
  return data;
}
