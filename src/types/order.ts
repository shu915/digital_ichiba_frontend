export type CustomerOrderType = {
  id: number;
  placed_at: string;
  status: string;
  total_cents: number;
  subtotal_cents: number;
  tax_cents: number;
  shipping_cents: number;
  shop: { id: number; name: string | null };
};

export type CustomerOrderItemType = {
  product_id: number;
  title: string;
  unit_price_cents: number;
  quantity: number;
};

export type CustomerOrderDetailType = {
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
  items: CustomerOrderItemType[];
};

export type ShopOrderType = {
  id: number;
  placed_at: string;
  status: string;
  total_cents: number;
  subtotal_cents: number;
  tax_cents: number;
  shipping_cents: number;
  shop: { id: number; name: string | null };
  customer: { id: number; email: string | null; name: string | null };
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
};

export type ShopOrderDetailType = {
  id: number;
  placed_at: string;
  status: string;
  subtotal_cents: number;
  tax_cents: number;
  shipping_cents: number;
  total_cents: number;
  customer?: { id: number; email: string | null; name: string | null };
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
  items: {
    product_id: number;
    title: string;
    unit_price_cents: number;
    quantity: number;
  }[];
};
