export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const revalidate = 0

import { prisma } from "@/lib/prisma"
import ProductClient from "./ProductClient"

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {

  let product: any = null

  try {
    const result: any = await prisma.$queryRawUnsafe(`
      SELECT * FROM "Product"
      WHERE id = '${params.id}'
    `)

    product = result?.[0]

    if (!product) {
      return <div>Product not found in DB</div>
    }

  } catch (error) {
    console.error("RAW QUERY ERROR:", error)
    return <div>Raw DB query failed</div>
  }

  const safeProduct = {
    id: product.id,
    name: product.name ?? "Product",
    description: product.description ?? "",
    imageUrl: null,
    whatsappNumber: null,
    arEnabled: false,
    arModelGlb: product.arModelGlb ?? null,
    arModelUsdz: product.arModelUsdz ?? null,
  }

  return <ProductClient product={safeProduct} />
}