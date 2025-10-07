"use client";
import { handleLogout } from "@/actions/handleLogout";

export default function Logout() {
  return (
    <form
      action={handleLogout}
      onSubmit={(e) => {
        if (!confirm("ログアウトしますか？")) e.preventDefault();
      }}
    >
      <button type="submit" className="text-white font-bold cursor-pointer">
        ログアウト
      </button>
    </form>
  );
}
