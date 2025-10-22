import Image from "next/image";
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
      <div className="w-7xl mx-auto max-w-full flex justify-between items-center p-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <figure className="mt-1.5">
              <Image
                src="/images/tag.svg"
                alt="Digital Ichiba"
                width={28}
                height={28}
              />
            </figure>
            <h1
              className={`text-2xl font-bold text-white ${quicksand.className}`}
            >
              Digital Ichiba
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-4">
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
