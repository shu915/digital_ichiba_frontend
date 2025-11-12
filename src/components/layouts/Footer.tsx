import Link from "next/link";

export default async function Footer() {
  return (
    <div className="bg-black py-8">
      <div className="inner flex flex-col sm:flex-row justify-between items-start gap-6 text-white font-bold">
        <div className="w-full sm:w-auto">
          <Link href="/shops">
            <span className="font-bold text-white">ショップ一覧</span>
          </Link>
        </div>

        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/about">このサイトについて</Link>
          </li>
          <li>
            <Link href="/privacy">プライバシーポリシー</Link>
          </li>
          <li>
            <Link href="/terms">利用規約</Link>
          </li>
        </ul>
      </div>
      <small className="text-center text-white block mt-6 sm:mt-8">
        &copy; 2025 Digital Ichiba
      </small>
    </div>
  );
}
