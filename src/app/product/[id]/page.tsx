"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ARViewer from "@/components/ARViewer";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAR, setShowAR] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/public-product/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6 text-red-500">Failed to load product</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* PRODUCT IMAGE */}
      {product.images?.[0]?.imageUrl && (
        <img
          src={product.images[0].imageUrl}
          className="rounded-xl mb-6 w-full"
        />
      )}

      {/* PRODUCT NAME */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

      {/* DESCRIPTION */}
      <p className="mb-6 text-gray-600">{product.description}</p>

      {/* BUTTONS */}
      <div className="flex gap-4">

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/${product.shop.whatsappNumber}`}
          target="_blank"
          className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-semibold"
        >
          WhatsApp
        </a>

        {/* AR BUTTON → Only if AR exists */}
        {product.arModelUrl && (
          <button
            onClick={() => setShowAR(true)}
            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold"
          >
            View in AR
          </button>
        )}

      </div>

      {/* AR MODAL */}
      {showAR && product.arModelUrl && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl p-4 w-full max-w-xl relative">

            <button
              onClick={() => setShowAR(false)}
              className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded"
            >
              Close
            </button>

            <ARViewer src={product.arModelUrl} />

          </div>

        </div>
      )}
    </div>
  );
}