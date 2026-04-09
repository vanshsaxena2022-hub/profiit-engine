"use client";

import PeddleWatermark from "@/components/PeddleWatermark";
import { useState, useMemo } from "react";
import CategoryFilter from "@/components/store/CategoryFilter";
import ProductCard from "@/components/store/ProductCard";

export default function StoreClient({
  products,
  categories,
  slug,
}: any) {
  const [active, setActive] = useState("ALL");

  // ✅ filter products
  const filtered = useMemo(() => {
    if (!products) return [];
    return active === "ALL"
      ? products
      : products.filter((p: any) => p.category === active);
  }, [products, active]);

  // ✅ LIMIT visible products (extra safety layer)
  const visibleProducts = useMemo(() => {
    return filtered.slice(0, 20);
  }, [filtered]);

  // ✅ loading state (safety)
  if (!products) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 space-y-5">
      <CategoryFilter
        categories={categories}
        active={active}
        onChange={setActive}
      />

      {visibleProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No products yet
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              shopSlug={slug}
            />
          ))}
        </div>
      )}

      <PeddleWatermark />
    </div>
  );
}