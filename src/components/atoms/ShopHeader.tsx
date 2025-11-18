
export default function ShopHeader({ shop_header_url, shop_name }: { shop_header_url: string | null, shop_name: string }) {
  return (
    <>
    {shop_header_url && (
        <figure className="relative w-full h-56 sm:h-60 overflow-hidden">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={shop_header_url}
            alt={shop_name}
            className="w-full h-full object-cover"
          />
        </figure>
    )}
    </>
  );
}