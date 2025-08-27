// src/components/atoms/Logout.tsx
import { signOut } from "@/auth";
import { cookies } from "next/headers";

export default function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        (await cookies()).delete("di_user");
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="text-white font-bold cursor-pointer">ログアウト</button>
    </form>
  );
}