// src/components/store/ProductCard.tsx

import Link from "next/link";

export default function ProductCard({
  product,
  shopSlug,
}: {
  product: any;
  shopSlug: string;
}) {
  // ✅ safe image fallback
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
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png"; // 🔥 fallback if image fails
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">
          {product?.name || "Untitled Product"}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {product?.category || "General"}
        </p>
      </div>
    </Link>
  );
}