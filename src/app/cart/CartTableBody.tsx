import ProductType from "@/types/product";
import Image from "next/image";

export default function CartTableBody({
  products,
  quantityById,
}: {
  products: ProductType[];
  quantityById: Record<number, number>;
}) {
  return (
    <tbody>
      {products.map((product) => {
        const qty = quantityById[Number(product.id)] ?? 0;
        return (
          <tr key={product.id} className="border-b align-middle">
            <td className="p-2 text-center">
              <Image
                src={product.image_url}
                alt={product.name}
                width={64}
                height={64}
                className="mx-auto rounded object-cover"
              />
            </td>
            <td className="p-2">{product.name}</td>
            <td className="p-2">{product.price_including_tax_cents}円</td>
            <td className="p-2">{qty}</td>
            <td className="p-2">{product.price_including_tax_cents * qty}円</td>
          </tr>
        );
      })}
    </tbody>
  );
}
