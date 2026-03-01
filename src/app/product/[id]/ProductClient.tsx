"use client"

import Image from "next/image"
import ARLauncher from "@/components/ARLauncher"

type Product = {
  id: string
  name: string
  description: string
  imageUrl?: string | null
  whatsappNumber: string
  arModelGlb?: string | null
  arModelUsdz?: string | null
  arEnabled: boolean
}

export default function ProductClient({ product }: { product: Product }) {

  const whatsappLink = `https://wa.me/${product.whatsappNumber}?text=Hi, I'm interested in ${product.name}`

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* PRODUCT IMAGE */}
      {product.imageUrl && (
        <div className="relative w-full h-[300px] mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      )}

      {/* PRODUCT INFO */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* WHATSAPP CTA */}
      <a
        href={whatsappLink}
        target="_blank"
        className="block w-full text-center bg-green-600 text-white py-3 rounded-lg mb-4"
      >
        Enquire on WhatsApp
      </a>

      {/* AR BUTTON */}
      {product.arEnabled && (product.arModelGlb || product.arModelUsdz) && (
        <ARLauncher
          glb={product.arModelGlb}
          usdz={product.arModelUsdz}
        />
      )}

    </div>
  )
}