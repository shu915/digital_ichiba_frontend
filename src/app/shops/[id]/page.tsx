import Shop from "@/types/shop";
import Image from "next/image";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_URL}/api/shops/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  console.log(res);
  const data = await res.json();
  const shop: Shop = data.shop;

  return (
    <div>
      {shop?.header_url && (
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src={shop.header_url}
            alt={shop.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex">
        {shop?.icon_url && (
          <Image
            src={shop?.icon_url}
            alt={shop?.name}
            width={240}
            height={240}
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{shop?.name}</h1>
          <p>{shop?.description}</p>
        </div>
      </div>
    </div>
  );
}
