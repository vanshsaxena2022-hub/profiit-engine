export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const revalidate = 0

import { prisma } from "@/lib/prisma"
import ProductClient from "./ProductClient"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            imageUrl: true,
          },
        },
        shop: {
          select: {
            whatsappNumber: true,
          },
        },
      },
    })

    if (!product) return notFound()

    const safeProduct = {
      id: product.id,
      name: product.name ?? "",
      description: product.description ?? "",

      // ✅ FIX — no direct imageUrl access
      imageUrl: product.images?.[0]?.imageUrl ?? null,

      // ✅ multiple images
      images: product.images.map((img) => img.imageUrl),

      whatsappNumber: product.shop?.whatsappNumber ?? null,

      arModelGlb: product.arModelGlb ?? null,
      arModelUsdz: product.arModelUsdz ?? null,
      }

    return <ProductClient product={safeProduct} />
  } catch (error) {
    console.error("Product page error:", error)
    return <div style={{ padding: 40 }}>Unexpected error loading product</div>
  }
}