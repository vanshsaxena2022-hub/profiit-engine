"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

const ARViewer = dynamic(() => import("@/components/ARViewer"), {
  ssr: false,
})

type ProductProps = {
  product: {
    id: string
    name: string
    description: string
    imageUrl?: string | null
    whatsappNumber?: string | null
    arModelGlb?: string | null
    arModelUsdz?: string | null
    arEnabled?: boolean
  }
}

export default function ProductClient({ product }: ProductProps) {

  const [showAR, setShowAR] = useState(false)

  const openWhatsApp = () => {
    if (!product.whatsappNumber) return
    const message = encodeURIComponent(`Hi, I'm interested in ${product.name}`)
    window.open(`https://wa.me/${product.whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-w-md rounded mb-4"
        />
      )}

      <p className="mb-6">{product.description}</p>

      <div className="flex gap-4">

        {product.whatsappNumber && (
          <button
            onClick={openWhatsApp}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            WhatsApp
          </button>
        )}

        {product.arEnabled && product.arModelGlb && (
          <button
            onClick={() => setShowAR(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            View In Your Room
          </button>
        )}

      </div>

      {showAR && (
        <ARViewer
          glb={product.arModelGlb}
          usdz={product.arModelUsdz}
        />
      )}

    </div>
  )
}