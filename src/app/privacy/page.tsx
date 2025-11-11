import PageTitle from "@/components/atoms/PageTitle";

export default function PrivacyPage() {
  return (
    <div className="py-8 inner">
      <PageTitle title="プライバシーポリシー" />

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">1. 基本方針</h2>
        <p className="leading-7">
          本サイトは、ユーザーの個人情報の重要性を認識し、関連法令およびガイドラインを遵守して、適切な取扱いと保護に努めます。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">2. 収集する情報</h2>
        <ul className="list-disc pl-5 space-y-1 leading-7">
          <li>アカウント情報（氏名、メールアドレス等）</li>
          <li>配送情報（氏名、住所、電話番号等）</li>
          <li>
            決済関連情報（Stripe経由で処理。カード情報は本サイトで保持しません）
          </li>
          <li>Cookie、アクセスログ等</li>
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">3. 利用目的</h2>
        <ul className="list-disc pl-5 space-y-1 leading-7">
          <li>ユーザー認証、セッション管理</li>
          <li>商品の購入・配送・サポート対応</li>
          <li>不正利用の防止、サービス品質の改善</li>
          <li>法令遵守のための対応</li>
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">4. Cookie等の利用</h2>
        <p className="leading-7">
          本サイトは、ログイン状態の維持や利用状況の把握のためにCookie等を使用します。ブラウザの設定によりCookieを無効化できますが、機能の一部が利用できない場合があります。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">5. 第三者提供</h2>
        <p className="leading-7">
          法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。決済処理等、委託先（Stripe等）に必要な範囲で提供することがあります。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">6. 安全管理措置</h2>
        <p className="leading-7">
          個人情報の漏えい、滅失または毀損の防止その他安全管理のため、適切な技術的・組織的措置を講じます。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">7. 開示・訂正・削除</h2>
        <p className="leading-7">
          本人からの請求に基づき、保有する個人情報の開示・訂正・削除等に適切に対応します。手続きの詳細はお問い合わせください。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">8. 改定</h2>
        <p className="leading-7">
          本ポリシーは必要に応じて改定されます。重要な変更はサイト上でお知らせします。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">9. 連絡先</h2>
        <p className="leading-7">
          本ポリシーに関するお問い合わせは、本サイトのお問い合わせ手段よりご連絡ください。
        </p>
      </section>
    </div>
  );
}
