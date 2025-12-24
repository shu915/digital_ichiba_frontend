import Link from "next/link";
import { Quicksand } from "next/font/google";
import { auth } from "@/auth";
import Logout from "../atoms/Logout";
import LoginDialog from "../organisms/LoginDialog";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function Header() {
  const session = await auth();

  return (
    <div className="bg-black">
      <div className="w-7xl mx-auto max-w-full flex flex-col sm:flex-row sm:justify-between items-center gap-y-3 p-4">
        <Link
          href="/"
          className="w-full sm:w-auto flex justify-center sm:justify-start"
        >
          <div className="flex items-center gap-2">
            <figure className="mt-1.5 w-7 h-7">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/images/tag.svg"
                alt="Digital Ichiba"
                className="w-full h-full"
                decoding="async"
              />
            </figure>
            <h1
              className={`text-2xl font-bold text-white ${quicksand.className}`}
            >
              Digital Ichiba
            </h1>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center sm:justify-end w-full sm:w-auto">
          {session && (
            <Link href="/dashboard" className="text-white font-bold">
              ダッシュボード
            </Link>
          )}
          <div className="text-white font-bold">
            <Link href="/cart">カート</Link>
          </div>
          {session ? <Logout /> : <LoginDialog />}
        </div>
      </div>
    </div>
  );
}
