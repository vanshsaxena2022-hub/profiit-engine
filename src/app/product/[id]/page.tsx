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

  // STEP 1 — Fetch product safely
  try {
    product = await prisma.product.findUnique({
      where: {
        id: params.id
      }
    })
  } catch (error) {
    console.error("Product query failed:", error)
    return <div>Database connection issue</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  // STEP 2 — Fetch shop safely
  let shop = null
  try {
    shop = await prisma.shop.findUnique({
      where: {
        id: product.shopId
      },
      select: {
        whatsappNumber: true,
        arEnabled: true
      }
    })
  } catch (error) {
    console.error("Shop fetch failed:", error)
  }

  // STEP 3 — Fetch images safely
  let images: { imageUrl: string }[] = []

  try {
    images = await prisma.productImage.findMany({
      where: {
        productId: product.id
      },
      select: {
        imageUrl: true
      }
    })
  } catch (error) {
    console.error("Images fetch failed:", error)
  }

  // STEP 4 — Safe UI object
  const safeProduct = {
    id: product.id,
    name: product.name ?? "Product",
    description: product.description ?? "",
    imageUrl: images.length > 0 ? images[0].imageUrl : null,
    whatsappNumber: shop?.whatsappNumber ?? null,
    arEnabled: shop?.arEnabled ?? false,
    arModelGlb: product.arModelGlb ?? null,
    arModelUsdz: product.arModelUsdz ?? null,
  }

  return <ProductClient product={safeProduct} />
}