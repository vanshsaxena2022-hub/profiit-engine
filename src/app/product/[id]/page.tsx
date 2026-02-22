"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function ProductPage({ params }: any) {
  const [product, setProduct] = useState<any>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/public-product/${params.id}`)
      .then((r) => r.json())
      .then(setProduct)
      .catch((e) => {
        console.error("PRODUCT LOAD ERROR:", e);
      });
  }, [params.id]);

  if (!product) return <div className="p-10">Loading...</div>;

  const images = product.images || [];

  const currentImage =
    images[index]?.imageUrl || "/placeholder.png";

  return (
    <div className="min-h-screen bg-white p-6 max-w-xl mx-auto">
      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden border">
        <img
          src={currentImage}
          className="w-full h-80 object-cover"
          loading="lazy"
        />
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 my-3">
        {images.map((_: any, i: number) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              i === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* INFO */}
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <a
          href={`https://wa.me/${product.shop?.whatsappNumber || ""}`}
          className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-semibold"
        >
          WhatsApp
        </a>

        <button className="flex-1 bg-black text-white py-3 rounded-xl font-semibold">
          View in AR
        </button>
      </div>
    </div>
  );
}