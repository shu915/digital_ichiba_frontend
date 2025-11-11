"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/atoms/PageTitle";
import { useParams } from "next/navigation";

type OrderItem = {
  product_id: number;
  title: string;
  unit_price_cents: number;
  quantity: number;
};
type OrderDetail = {
  id: number;
  placed_at: string;
  status: string;
  subtotal_cents: number;
  tax_cents: number;
  shipping_cents: number;
  total_cents: number;
  address?: {
    full_name: string;
    phone?: string;
    postal_code: string;
    country_code: string;
    state: string;
    city: string;
    line1: string;
    line2?: string;
  } | null;
  items: OrderItem[];
};

export default function OrderShowPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/orders/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setOrder(data.order);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) {
    return (
      <div className="py-8 inner">
        <PageTitle title="注文詳細" />
        <p className="mt-6 text-center">読み込み中...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-8 inner">
        <PageTitle title="注文詳細" />
        <p className="mt-6 text-center">注文が見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="py-8 inner">
      <PageTitle title="注文詳細" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">注文情報</h2>
          <p>注文ID: {order.id}</p>
          <p>注文日時: {new Date(order.placed_at).toLocaleString("ja-JP")}</p>
          <p>ステータス: {order.status}</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">配送先</h2>
          {order.address ? (
            <>
              <p>{order.address.full_name}</p>
              <p>{order.address.postal_code}</p>
              <p>
                {order.address.state}
                {order.address.city}
                {order.address.line1}
                {order.address.line2 ? ` ${order.address.line2}` : ""}
              </p>
              {order.address.phone && <p>電話: {order.address.phone}</p>}
            </>
          ) : (
            <p>配送先の情報はありません。</p>
          )}
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <h2 className="font-bold text-lg">商品</h2>
        <table className="mt-2 w-full text-center border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">商品名</th>
              <th className="p-2">単価(税込)</th>
              <th className="p-2">数量</th>
              <th className="p-2">小計(税込)</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={`${order.id}-${it.product_id}`} className="border-b">
                <td className="p-2">{it.title}</td>
                <td className="p-2">{it.unit_price_cents}円</td>
                <td className="p-2">{it.quantity}</td>
                <td className="p-2">{it.unit_price_cents * it.quantity}円</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t">
              <td className="p-2 text-right font-bold" colSpan={3}>
                小計(税込)
              </td>
              <td className="p-2 font-bold">{order.subtotal_cents}円</td>
            </tr>
            <tr className="border-t">
              <td className="p-2 text-right font-bold" colSpan={3}>
                送料(税込)
              </td>
              <td className="p-2 font-bold">{order.shipping_cents}円</td>
            </tr>
            <tr className="border-t">
              <td className="p-2 text-right font-bold" colSpan={3}>
                合計(税込)
              </td>
              <td className="p-2 font-bold">{order.total_cents}円</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
