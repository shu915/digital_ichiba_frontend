import { getUserFromCookies } from "@/lib/getUserFromCookies";
import { auth } from "@/auth";

export default async function Footer() {
  const user = await getUserFromCookies();
  const session = await auth();
  
  return (
    <div className="bg-black py-6">
      <div className="w-7xl mx-auto max-w-full flex justify-between items-top p-4 text-white font-bold">
        <ul className="flex flex-col gap-2">
          <li>
            <a href="#">
              このサイトについて
            </a>
          </li>
          <li>
            <a href="#">
              プライバシーポリシー
            </a>
          </li>
          <li>
            <a href="#">
              利用規約
            </a>
          </li>
        </ul>
        <div>
          ダミー
        </div>
      </div>
      <small className="text-center text-white block">
        &copy; 2025 Digital Ichiba
      </small>
    </div>
  );
}