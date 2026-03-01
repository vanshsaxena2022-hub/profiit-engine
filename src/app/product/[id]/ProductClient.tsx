"use client"

import { useState } from "react"
import ARViewer from "@/components/ARViewer"

type ProductType = {
  id: string
  name: string
  description: string
  imageUrl?: string | null
  whatsappNumber?: string | null
  arModelGlb?: string | null
  arModelUsdz?: string | null
  arEnabled?: boolean
}

export default function ProductClient({ product }: { product: ProductType }) {

  const [showAR, setShowAR] = useState(false)

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">{product.name}</h1>

      <p className="mt-2 text-gray-600">{product.description}</p>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-w-md mt-4 rounded-xl"
        />
      )}

      {product.whatsappNumber && (
        <a
          href={`https://wa.me/${product.whatsappNumber}`}
          target="_blank"
          className="block mt-4 bg-green-600 text-white px-6 py-3 rounded-xl text-center"
        >
          WhatsApp
        </a>
      )}

      {product.arEnabled && product.arModelGlb && (
        <button
          onClick={() => setShowAR(true)}
          className="bg-black text-white px-6 py-3 rounded-xl mt-4"
        >
          View in your space
        </button>
      )}

      {showAR && product.arModelGlb && (
        <div className="fixed inset-0 bg-white z-50">

          <button
            onClick={() => setShowAR(false)}
            className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded"
          >
            Close
          </button>

          <ARViewer
            glb={product.arModelGlb}
            usdz={product.arModelUsdz || undefined}
          />

        </div>
      )}

    </div>
  )
}