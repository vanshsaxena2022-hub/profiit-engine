export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { prisma } from "@/lib/prisma"
import ProductClient from "./ProductClient"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {

  let product = null

  try {
    product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { 
        shop: true,
        images: true
      },
    })
  } catch (err) {
    console.error("PRISMA ERROR:", err)
    return <div>Database error</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

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
}