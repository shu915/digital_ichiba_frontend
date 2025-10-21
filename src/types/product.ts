type ProductType = {
  id: string;
  name: string;
  shop_id: string;
  shop_name: string;
  shop_header_url: string | null;
  description: string;
  price_including_tax_cents: number;
  stock: number;
  image_url: string;
};

export default ProductType;