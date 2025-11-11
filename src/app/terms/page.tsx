import PageTitle from "@/components/atoms/PageTitle";

export default function TermsPage() {
  return (
    <div className="py-8 inner">
      <PageTitle title="利用規約" />

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">1. はじめに</h2>
        <p className="leading-7">
          本規約は、Digital
          Ichiba（以下「本サービス」）の提供条件および本サービスの利用に関するユーザーと運営者との間の権利義務関係を定めるものです。ユーザーは本規約に同意の上、本サービスをご利用ください。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">2. 定義</h2>
        <p className="leading-7">
          「ユーザー」とは、本サービスを利用する個人または法人をいいます。「出品者」とは、本サービス上で商品を出品・販売する者をいいます。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">3. アカウントとセキュリティ</h2>
        <p className="leading-7">
          ユーザーは、自己の責任においてアカウント情報を管理し、第三者に利用させないものとします。アカウントの不正使用による損害について、運営者は責任を負いません。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">4. 禁止事項</h2>
        <ul className="list-disc pl-5 space-y-1 leading-7">
          <li>法令または公序良俗に違反する行為</li>
          <li>知的財産権、プライバシー権を侵害する行為</li>
          <li>不正アクセス、サービス運用の妨害、スパム行為</li>
          <li>虚偽の情報の登録・掲載・表示</li>
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">5. 取引と決済</h2>
        <p className="leading-7">
          本サービスの決済はStripeを利用します。決済・返金・請求に関する条件はStripeの規約にも従うものとします。出品者は適切な表示と法令遵守の責任を負います。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">6. 免責事項</h2>
        <p className="leading-7">
          運営者は、本サービスに起因してユーザーに生じた損害について、直接的または通常生ずべき損害の範囲でのみ責任を負います。ただし、運営者に故意または重過失がある場合を除きます。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">7. 規約の変更</h2>
        <p className="leading-7">
          本規約は、必要に応じて改定されることがあります。重要な変更がある場合は、サイト上で通知します。改定後の規約は、サイトに掲示した時点より効力を生じます。
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-bold">8. お問い合わせ</h2>
        <p className="leading-7">
          本規約に関するお問い合わせは、本サイトのお問い合わせ手段よりご連絡ください。
        </p>
      </section>
    </div>
  );
}
