"use client"

import { useRef, useState, useEffect } from "react"
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
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsApp = async () => {
    if (!product.whatsappNumber) return

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

    const productUrl = window.location.href

    const message = `Hi, I’m interested in this product:

Product: ${product.name}
Link: ${productUrl}

Can I know more about it?`

    const url = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
      ? [product.imageUrl]
      : []

  const scrollToIndex = (i: number) => {
    if (!scrollRef.current) return

    const width = scrollRef.current.clientWidth
    scrollRef.current.scrollTo({
      left: i * width,
      behavior: "smooth",
    })

    setIndex(i)
  }

  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            type: "link_open",
          }),
        })
      } catch (err) {
        console.log("Tracking failed", err)
      }
    }

    trackView()
  }, [product.id])

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

        {/* CAROUSEL */}
        {allImages.length > 0 && (
          <div className="mb-6 relative">

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
                    onClick={() => {
                      setIndex(i)
                      setIsOpen(true)
                    }}
                    className="max-h-[300px] w-auto rounded-xl shadow-sm cursor-pointer hover:scale-105 transition"
                  />
                </div>
              ))}
            </div>

            {/* PREMIUM ARROWS */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/30 border border-white/20 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  ‹
                </button>

                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/30 border border-white/20 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  ›
                </button>
              </>
            )}

            {/* DOTS */}
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

        {/* FULLSCREEN IMAGE VIEW */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            <img
              src={allImages[index]}
              className="max-h-[90vh] max-w-[90vw] rounded-xl"
            />
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