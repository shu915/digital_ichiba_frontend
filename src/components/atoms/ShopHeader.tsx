import Image from "next/image";


export default function ShopHeader({ shop_header_url, shop_name }: { shop_header_url: string | null, shop_name: string }) {
  return (
    <>
    {shop_header_url && (
        <div className="relative w-full h-56 sm:h-60">
        <Image
          src={shop_header_url}
          alt={shop_name}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    )}
    </>
  );
}