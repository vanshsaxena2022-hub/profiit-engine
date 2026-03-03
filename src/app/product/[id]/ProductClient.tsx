"use client"

import dynamic from "next/dynamic"

const ARViewer = dynamic(() => import("@/components/ARViewer"), {
  ssr: false,
})

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string | null
    whatsappNumber: string | null
    arModelGlb: string | null
    arModelUsdz: string | null
  }
}

export default function ProductClient({ product }: ProductProps) {
  const handleWhatsApp = () => {
    if (!product.whatsappNumber) return

    const url = `https://wa.me/${product.whatsappNumber}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8 max-w-4xl mx-auto">

      {/* Product Image */}
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full rounded-lg mb-6"
        />
      )}

      {/* Product Info */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* WhatsApp Button */}
      {product.whatsappNumber && (
        <button
          onClick={handleWhatsApp}
          className="w-full bg-green-600 text-white py-3 rounded-lg mb-6"
        >
          Enquire on WhatsApp
        </button>
      )}

      {/* AR Section — SHOW ONLY IF GLB EXISTS */}
      {product.arModelGlb && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            View in AR
          </h2>

          <ARViewer
            glb={product.arModelGlb}
            usdz={product.arModelUsdz ?? undefined}
          />
        </div>
      )}

    </div>
  )
}