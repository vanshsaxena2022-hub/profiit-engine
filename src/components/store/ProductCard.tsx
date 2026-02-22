// src/components/store/ProductCard.tsx

import Link from "next/link";

export default function ProductCard({
  product,
  shopSlug,
}: {
  product: any;
  shopSlug: string;
}) {
  // ✅ correct image mapping
  const image =
    product?.images?.[0]?.imageUrl || "/placeholder.png";

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-2xl overflow-hidden border hover:shadow-md transition block"
    >
      {/* image */}
      <div className="aspect-square bg-gray-100">
        <img
          src={image}
          alt={product?.name || "product"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">
          {product?.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {product?.category}
        </p>
      </div>
    </Link>
  );
}