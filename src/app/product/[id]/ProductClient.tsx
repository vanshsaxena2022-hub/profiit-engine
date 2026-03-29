"use client"

import { useState } from "react"
import PeddleWatermark from "@/components/PeddleWatermark"
import dynamic from "next/dynamic"

const ARViewer = dynamic(() => import("@/components/ARViewer"), {
  ssr: false,
})

interface ProductType {
  id: string
  name: string
  description: string

  imageUrl: string | null   // ✅ keep
  images?: string[]         // ✅ add

  whatsappNumber: string | null
  arModelGlb: string | null
  arModelUsdz: string | null
}

export default function ProductClient({
  product,
}: {
  product: ProductType
}) {
  const [index, setIndex] = useState(0)

  const handleWhatsApp = () => {
    if (!product.whatsappNumber) return
    const url = `https://wa.me/${product.whatsappNumber}`
    window.open(url, "_blank")
  }

  // ✅ merge logic (no breaking change)
  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
      ? [product.imageUrl]
      : []

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* ✅ CAROUSEL */}
        {allImages.length > 0 && (
          <div className="mb-6">

            <div className="flex justify-center">
              <img
                src={allImages[index]}
                alt={product.name}
                className="max-h-[300px] w-auto rounded-xl shadow-sm"
              />
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-2 mt-3">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* ARROWS */}
            {allImages.length > 1 && (
              <div className="flex justify-between mt-3">
                <button
                  onClick={() =>
                    setIndex((prev) =>
                      prev === 0 ? allImages.length - 1 : prev - 1
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  ◀
                </button>

                <button
                  onClick={() =>
                    setIndex((prev) =>
                      prev === allImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        )}

        {/* Product Name */}
        <h1 className="text-3xl font-bold mb-2">
          {product.name}
        </h1>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* WhatsApp */}
        {product.whatsappNumber && (
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 text-white py-3 rounded-xl mb-4 font-semibold"
          >
            Enquire on WhatsApp
          </button>
        )}

        {/* AR */}
        {product.arModelGlb && (
          <div className="mt-4">
            <ARViewer
              glb={product.arModelGlb}
              usdz={product.arModelUsdz ?? undefined}
            />
          </div>
        )}

        {/* Watermark */}
        <div className="text-center text-sm text-gray-500 mt-10">
          Proudly Built by <span className="font-semibold">Peddle Profit</span>
        </div>

        <PeddleWatermark />
      </div>
    </div>
  )
}