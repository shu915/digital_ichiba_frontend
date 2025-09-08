export type Product = {
  id: string;
  name: string;
  shop_id: string;
  shop_name: string;
  description: string;
  price_including_tax_cents: number;
  stock: number;
  image_url: string;
};