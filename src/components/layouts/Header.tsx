import Image from "next/image";
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
        <div className="flex items-center gap-4">
          {session && (
            <a href="/dashboard" className="text-white font-bold">
              ダッシュボード
            </a>
          )}
          <div className="text-white font-bold">カート</div>
          {session ? <Logout /> : <LoginDialog />}
        </div>
      </div>
    </div>
  );
}
