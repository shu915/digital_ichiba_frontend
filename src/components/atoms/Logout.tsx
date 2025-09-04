"use client";
import { logoutAction } from "@/app/actions/logout";

export default function Logout() {
  return (
    <form
      action={logoutAction}
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
