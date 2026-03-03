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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* Product Image */}
        {product.imageUrl && (
         <div className="w-full bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
          <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-96 w-auto object-contain"
                />
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

        {/* WhatsApp Button */}
        {product.whatsappNumber && (
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 text-white py-3 rounded-xl mb-4 font-semibold"
          >
            Enquire on WhatsApp
          </button>
        )}

        {/* AR Button (only if model exists) */}
        {product.arModelGlb && (
          <div className="mt-4">
            <ARViewer
              glb={product.arModelGlb}
              usdz={product.arModelUsdz ?? undefined}
            />
          </div>
        )}

      </div>
    </div>
  )
}