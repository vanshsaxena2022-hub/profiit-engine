"use client";

import { useState } from "react";
import CategoryFilter from "@/components/store/CategoryFilter";
import ProductCard from "@/components/store/ProductCard";

export default function StoreClient({
  products,
  categories,
  slug,
}: any) {
  const [active, setActive] = useState("ALL");

  const filtered =
    active === "ALL"
      ? products
      : products.filter((p: any) => p.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 space-y-5">
      <CategoryFilter
        categories={categories}
        active={active}
        onChange={setActive}
      />

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No products yet
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              shopSlug={slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}