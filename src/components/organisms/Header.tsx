import LoginDialog from "./LoginDialog";
import Image from "next/image";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Header() {

  return (
    <div className="bg-black">
      <div className="w-7xl mx-auto max-w-full flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <figure className="mt-1.5">
            <Image src="/images/tag.svg" alt="Digital Ichiba" width={28} height={28} />
          </figure>
          <h1 className={`text-2xl font-bold text-white ${quicksand.className}`}>
            Digital Ichiba
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LoginDialog />
          <div className="text-white font-bold">カート</div>
        </div>
      </div>
    </div>
  );
}
