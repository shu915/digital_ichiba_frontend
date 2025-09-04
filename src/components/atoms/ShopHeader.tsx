import Shop from "@/types/shop";
import Image from "next/image";


export default function ShopHeader({ shop }: { shop: Shop }) {
  return (
    <>
    {shop?.header_url && (
      <div className="relative w-full h-56 sm:h-60">
        <Image
          src={shop.header_url}
          alt={shop.name}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    )}
    </>
  );
}