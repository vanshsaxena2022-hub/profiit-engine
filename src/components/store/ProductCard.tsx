import Link from "next/link";

export default function ProductCard({
  product,
  shopSlug,
}: {
  product: any;
  shopSlug: string;
}) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-2xl overflow-hidden border hover:shadow-md transition"
    >
      <div className="aspect-square bg-gray-100">
        <img
          src={product.images?.[0]?.url || "/placeholder.png"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {product.category}
        </p>
      </div>
    </Link>
  );
}
