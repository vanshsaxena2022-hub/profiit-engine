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
    // STEP 1 — Fetch main product
    product = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!product) return notFound()

  } catch (error) {
    console.error("Product fetch error:", error)
    return <div>Unable to load product</div>
  }

  // STEP 2 — Fetch shop safely
  let shop = null
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
  } catch (error) {
    console.error("Shop fetch error:", error)
  }

  // STEP 3 — Fetch images safely
  let images: { imageUrl: string }[] = []

  try {
    images = await prisma.productImage.findMany({
      where: { productId: product.id },
      select: {
        imageUrl: true
      }
    })
  } catch (error) {
    console.error("Image fetch error:", error)
  }

  // STEP 4 — Build UI-safe object
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