"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import ARViewer from "@/components/ARViewer";

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAR, setShowAR] = useState(false);

  // ✅ FETCH PRODUCT SAFELY
  useEffect(() => {
  if (!params?.id) return;

  let cancelled = false;

  const load = async () => {
    try {
      const controller = new AbortController();

      // ⏱️ timeout protection (VERY IMPORTANT on Render)
      const timeout = setTimeout(() => {
        controller.abort();
      }, 15000);

      const res = await fetch(
        `/api/public-product/${params.id}`,
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await res.json();

      if (!cancelled) {
        setProduct(data);
      }

      // ✅ safe analytics
      if (data?.shopId && data?.id) {
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
    } catch (err) {
      console.error("PRODUCT LOAD ERROR:", err);

      if (!cancelled) {
        setProduct({ error: true });
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  load();

  return () => {
    cancelled = true;
  };
}, [params?.id]);

  // ✅ LOADING STATE
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ✅ PRODUCT NOT FOUND GUARD
  if (!product || product.error) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found
      </div>
    );
  }

  // ✅ SAFE IMAGES
  const images = Array.isArray(product.images)
    ? product.images
    : [];

  const currentImage =
    images[index]?.imageUrl || "/placeholder.png";

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
      )}

      {/* INFO */}
      <h1 className="text-2xl font-bold mt-4">
        {product.name}
      </h1>

      <p className="text-gray-600 mb-6">
        {product.description}
      </p>

      {/* BUTTONS */}
      <div className="flex gap-3">
        {/* ✅ SAFE WHATSAPP */}
        <a
          href={`https://wa.me/${
            product.shop?.whatsappNumber || ""
          }`}
          onClick={() => {
            try {
              if (!product?.shopId) return;

              fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  shopId: product.shopId,
                  productId: product.id,
                  type: "whatsapp_click",
                }),
              }).catch(() => {});
            } catch (e) {
              console.error("WA TRACK ERROR:", e);
            }
          }}
          className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-semibold"
        >
          WhatsApp
        </a>

        {/* ✅ AR BUTTON */}
        {product.arModelUrl && (
          <button
            onClick={() => setShowAR(true)}
            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold"
          >
            View in AR
          </button>
        )}
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