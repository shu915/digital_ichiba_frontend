import Link from "next/link";

export default async function Footer() {
  return (
    <div className="bg-black py-8">
      <div className="inner flex justify-between items-top text-white font-bold">
        <div>
          <Link href="/shops">
            <span className="font-bold text-white">ショップ一覧</span>
          </Link>
        </div>

        <ul className="flex flex-col gap-2">
          <li>
            <a href="#">このサイトについて</a>
          </li>
          <li>
            <a href="#">プライバシーポリシー</a>
          </li>
          <li>
            <a href="#">利用規約</a>
          </li>
        </ul>
      </div>
      <small className="text-center text-white block">
        &copy; 2025 Digital Ichiba
      </small>
    </div>
  );
}
