"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  description: string;
  images?: { imageUrl: string }[];
  shop?: { whatsappNumber: string };
  arModelUrl?: string | null;
};

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/public-product/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Fetch failed");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("PRODUCT LOAD ERROR:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  // ✅ loading state
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ✅ error state
  if (error || !product) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load product
      </div>
    );
  }

  const images = product.images ?? [];
  const currentImage = images[index]?.imageUrl || "/placeholder.png";

  return (
    <div className="min-h-screen bg-white p-6 max-w-xl mx-auto">
      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden border">
        <img
          src={currentImage}
          className="w-full h-80 object-cover"
          alt={product.name}
        />
      </div>

      {/* DOTS */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 my-3">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                i === index ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* INFO */}
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <a
          href={`https://wa.me/${product.shop?.whatsappNumber ?? ""}`}
          className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-semibold"
        >
          WhatsApp
        </a>

        {product.arModelUrl && (
          <button className="flex-1 bg-black text-white py-3 rounded-xl font-semibold">
            View in AR
          </button>
        )}
      </div>
    </div>
  );
}