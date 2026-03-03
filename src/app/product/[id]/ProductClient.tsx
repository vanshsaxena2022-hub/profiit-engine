"use client"

import dynamic from "next/dynamic"

const ARViewer = dynamic(() => import("@/components/ARViewer"), {
  ssr: false,
})

interface ProductType {
  id: string
  name: string
  description: string
  imageUrl: string | null
  whatsappNumber: string | null
  arModelGlb: string | null
  arModelUsdz: string | null
}

export default function ProductClient({
  product,
}: {
  product: ProductType
}) {

  const handleWhatsApp = () => {
    if (!product.whatsappNumber) return
    const url = `https://wa.me/${product.whatsappNumber}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT SIDE — IMAGE */}
          <div className="flex justify-center items-start">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-[600px] w-auto rounded-xl"
              />
            )}
          </div>

          {/* RIGHT SIDE — DETAILS */}
          <div className="flex flex-col">

            {/* Product Name */}
            <h1 className="text-3xl font-bold mb-4">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="space-y-4">

              {product.whatsappNumber && (
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  Enquire on WhatsApp
                </button>
              )}

              {product.arModelGlb && (
                <ARViewer
                  glb={product.arModelGlb}
                  usdz={product.arModelUsdz ?? undefined}
                />
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}