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
        shop: {
          select: {
            whatsappNumber: true,
            arEnabled: true,
          },
        },
        images: {
          select: {
            imageUrl: true,
          },
        },
      },
    })

    if (!product) return notFound()

    const safeProduct = {
      id: product.id,
      name: product.name ?? "",
      description: product.description ?? "",
      imageUrl: product.images?.[0]?.imageUrl ?? null,
      whatsappNumber: product.shop?.whatsappNumber ?? null,
      arEnabled: product.shop?.arEnabled ?? false,
      arModelGlb: product.arModelGlb ?? null,
      arModelUsdz: product.arModelUsdz ?? null,
    }

    return <ProductClient product={safeProduct} />
  } catch (error) {
    console.error("Product page error:", error)
    return <div style={{ padding: 40 }}>Unexpected error loading product</div>
  }
}