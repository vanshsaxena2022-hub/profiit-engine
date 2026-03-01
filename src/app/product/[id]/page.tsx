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

  let product

  try {
    // STEP 1 — fetch ONLY product first (safe)
    product = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!product) return notFound()

  } catch (err) {
    console.error("Product fetch failed:", err)
    return <div>Database error</div>
  }

  // STEP 2 — fetch relations separately (safe)
  let shop = null
  let images = []

  try {
    if (product.shopId) {
      shop = await prisma.shop.findUnique({
        where: { id: product.shopId },
        select: {
          whatsappNumber: true,
          arEnabled: true
        }
      })
    }
  } catch (err) {
    console.error("Shop fetch failed:", err)
  }

  try {
    images = await prisma.productImage.findMany({
      where: { productId: product.id },
      select: {
        imageUrl: true
      }
    })
  } catch (err) {
    console.error("Images fetch failed:", err)
  }

  const safeProduct = {
    id: product.id,
    name: product.name ?? "",
    description: product.description ?? "",
    imageUrl: images?.[0]?.imageUrl ?? null,
    whatsappNumber: shop?.whatsappNumber ?? null,
    arEnabled: shop?.arEnabled ?? false,
    arModelGlb: product.arModelGlb ?? null,
    arModelUsdz: product.arModelUsdz ?? null,
  }

  return <ProductClient product={safeProduct} />
}