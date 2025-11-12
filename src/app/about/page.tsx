import PageTitle from "@/components/atoms/PageTitle";

export default function AboutPage() {
  return (
    <div className="py-8 inner">
      <PageTitle title="このサイトについて" />

      <section className="mt-6 space-y-4">
        <h2 className="text-xl font-bold">概要</h2>
        <p className="leading-7">
          このサイトはShuのHappiness Chainの卒業ポートフォリオです。
        </p>
        <p className="leading-7">
          Digital
          Ichibaは、ハンドメイド作家や衣料品、雑貨、生活用品などの小規模セレクトショップのオーナー向けに、SNSと直結して5分でオンラインショップを開設できるECプラットフォームです。シングルページアプリケーション（SPA）によるスムーズな操作性と、Stripeによる信頼性の高い決済機能を搭載。在庫管理やモバイル最適化も完備し、日常の投稿からそのまま販売につなげられます。誰でもスムーズに販路を広げ、ブランドの魅力を最大限に発信できる環境を提供します。
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">バージョン情報</h2>
        <p>このリポジトリのバージョン情報です。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">フロントエンド</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>TypeScript 5.9.2</li>
              <li>React 19.1.0</li>
              <li>Next.js 15.5.0</li>
              <li>Auth.js 5.0.0-beta.29</li>
              <li>TailwindCSS 4.1.12</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">バックエンド</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ruby 3.3.9</li>
              <li>Rails 8.0.2.1</li>
              <li>Postgresql 16.10</li>
              <li>Docker 28.4.0</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
