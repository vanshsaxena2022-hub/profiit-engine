"use client"

import { useRef, useState } from "react"
import PeddleWatermark from "@/components/PeddleWatermark"
import dynamic from "next/dynamic"

const ARViewer = dynamic(() => import("@/components/ARViewer"), {
  ssr: false,
})

interface ProductType {
  id: string
  name: string
  description: string

  imageUrl: string | null
  images?: string[]

  whatsappNumber: string | null
  arModelGlb: string | null
  arModelUsdz: string | null
}

export default function ProductClient({
  product,
}: {
  product: ProductType
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const handleWhatsApp = async () => {
  if (!product.whatsappNumber) return

  // 🔥 TRACK FIRST
  try {
    await fetch("/api/track", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
      body: JSON.stringify({
      productId: product.id,
      type: "whatsapp_click",
      }),
      })
      
  } catch (err) {
    console.log("Tracking failed", err)
  }

  // 🔥 THEN REDIRECT
  const productUrl = window.location.href

  const message = `Hi, I’m interested in this product:

  Product: ${product.name}
  Link: ${productUrl}

  Can I know more about it?`

  const url = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`

  window.open(url, "_blank")
    }


  // ✅ merge images safely
  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
      ? [product.imageUrl]
      : []

  // 👉 scroll to image (for dots + arrows)
  const scrollToIndex = (i: number) => {
    if (!scrollRef.current) return

    const width = scrollRef.current.clientWidth
    scrollRef.current.scrollTo({
      left: i * width,
      behavior: "smooth",
    })

    setIndex(i)
  }

  const next = () => {
    const newIndex = index === allImages.length - 1 ? 0 : index + 1
    scrollToIndex(newIndex)
  }

  const prev = () => {
    const newIndex = index === 0 ? allImages.length - 1 : index - 1
    scrollToIndex(newIndex)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* ✅ CAROUSEL */}
        {allImages.length > 0 && (
          <div className="mb-6 relative">

            {/* SCROLL AREA (SWIPE ENABLED) */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
              onScroll={(e) => {
                const el = e.currentTarget
                const newIndex = Math.round(el.scrollLeft / el.clientWidth)
                setIndex(newIndex)
              }}
            >
              {allImages.map((img, i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 w-full flex justify-center"
                >
                  <img
                    src={img}
                    alt={product.name}
                    className="max-h-[300px] w-auto rounded-xl shadow-sm"
                  />
                </div>
              ))}
            </div>

            {/* ✅ ARROW BUTTONS (clean overlay) */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ‹
                </button>

                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ›
                </button>
              </>
            )}

            {/* ✅ DOTS */}
            <div className="flex justify-center gap-2 mt-3">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    i === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

          </div>
        )}

        {/* NAME */}
        <h1 className="text-3xl font-bold mb-2">
          {product.name}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* WHATSAPP */}
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

        {/* WATERMARK */}
        <div className="text-center text-sm text-gray-500 mt-10">
          Proudly Built by <span className="font-semibold">Peddle Profit</span>
        </div>

        <PeddleWatermark />
      </div>
    </div>
  )
}