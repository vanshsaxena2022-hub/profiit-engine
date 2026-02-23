"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ARViewer from "@/components/ARViewer";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAR, setShowAR] = useState(false);

  useEffect(() => {
  if (!id) return;

  async function load() {
    try {
      const res = await fetch(`/api/public-product/${id}`);
      const data = await res.json();
      setProduct(data);

      // ✅ TRACK LINK OPEN (non-blocking)
      if (data?.shopId) {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shopId: data.shopId,
            productId: data.id,
            type: "link_open",
          }),
        }).catch(() => {});
      }
    } catch (e) {
      console.error("PRODUCT LOAD ERROR:", e);
    } finally {
      setLoading(false);
    }
  }

  load();
}, [id]);


  const images = product.images || [];
  const currentImage =
    images[index]?.imageUrl || "/placeholder.png";

  return (
    <div className="min-h-screen bg-white p-6 max-w-xl mx-auto">
      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden border">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-80 object-cover"
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
      <h1 className="text-2xl font-bold">
        {product.name}
      </h1>

      <p className="text-gray-600 mb-6">
        {product.description}
      </p>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <a
          href={`https://wa.me/${product.shop?.whatsappNumber}`}
          onClick={() => {
          fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          shopId: product.shopId,
          productId: product.id,
          type: "whatsapp_click",
                       }),
                    }).catch(() => {});
                    }}
             className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-semibold"
                        >
                   WhatsApp
                     </a>


        <button
          onClick={() => setShowAR(true)}
          disabled={!product.arModelUrl}
          className="flex-1 bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-40"
        >
          View in AR
        </button>
      </div>

      {/* ✅ AR MODAL */}
      {showAR && product.arModelUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-2xl w-full relative">
            <button
              onClick={() => setShowAR(false)}
              className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-lg"
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