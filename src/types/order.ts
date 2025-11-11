export type OrderType = {
  id: number;
  placed_at: string;
  status: string;
  total_cents: number;
  subtotal_cents: number;
  tax_cents: number;
  shipping_cents: number;
  shop: { id: number; name: string | null };
};