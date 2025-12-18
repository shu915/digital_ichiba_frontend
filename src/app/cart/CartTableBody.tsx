import ProductType from "@/types/product";

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
              <figure className="mx-auto w-16 h-16 rounded overflow-hidden">
                {product.image_url && (
                  <>
                    {/* eslint-disable @next/next/no-img-element */}
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </>
                )}
              </figure>
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
