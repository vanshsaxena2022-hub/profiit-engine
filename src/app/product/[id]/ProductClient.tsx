"use client"

import dynamic from "next/dynamic"

// 🔒 AR loads ONLY on browser
const ARViewer = dynamic(() => import("@/components/ARViewer"), {
  ssr: false,
})

type Product = {
  id: string
  name: string
  description?: string
  imageUrl?: string | null
  whatsappNumber?: string | null
  arEnabled?: boolean
  arModelGlb?: string | null
  arModelUsdz?: string | null
}

export default function ProductClient({ product }: { product: Product }) {

  const handleWhatsApp = () => {
    if (!product.whatsappNumber) return

    const message = `Hi, I'm interested in ${product.name}`
    const url = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-white p-4">

      {/* Product Image */}
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-h-[400px] object-cover rounded-xl"
        />
      )}

      {/* Product Info */}
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>

      {product.description && (
        <p className="text-gray-600 mt-2">{product.description}</p>
      )}

      {/* WhatsApp CTA */}
      {product.whatsappNumber && (
        <button
          onClick={handleWhatsApp}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
        >
          Enquire on WhatsApp
        </button>
      )}

      {/* 🔥 AR Viewer (only if valid) */}
      {product.arEnabled && product.arModelGlb && (
        <div className="mt-6">
          <ARViewer
            glb={product.arModelGlb}
            usdz={product.arModelUsdz ?? undefined}
          />
        </div>
      )}

    </div>
  )
}