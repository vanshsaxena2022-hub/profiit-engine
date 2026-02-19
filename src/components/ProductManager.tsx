"use client";

import { useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  category: string;
}

export default function ProductManager({
  products,
}: {
  products: Product[];
}) {
  const [list, setList] = useState(products);
  const [category, setCategory] = useState("All");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered =
    category === "All"
      ? list
      : list.filter((p) => p.category === category);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    setLoadingId(id);
    await axios.delete(`/api/products/${id}`);
    setList((prev) => prev.filter((p) => p.id !== id));
    setLoadingId(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* header row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Product Catalogue
        </h2>

        {/* category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-3 py-2 text-sm bg-white"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {filtered.length} products
      </div>

      {/* list */}
      <div className="divide-y">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between py-4 hover:bg-gray-50 px-2 rounded-lg transition"
          >
            <div>
              <div className="font-medium text-gray-900">
                {p.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Category: {p.category}
              </div>
            </div>

            <button
              onClick={() => deleteProduct(p.id)}
              disabled={loadingId === p.id}
              className="text-sm px-4 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              {loadingId === p.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-gray-400">
            No products in this category
          </div>
        )}
      </div>
    </div>
  );
}
