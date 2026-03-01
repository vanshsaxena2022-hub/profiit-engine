import { prisma } from "@/lib/prisma"
import ProductClient from "./ProductClient"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { shop: true },
  })

  if (!product) return notFound()

  // 🔥 STRIP PRISMA OBJECT → SAFE JSON
  const safeProduct = JSON.parse(JSON.stringify({
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,

    whatsappNumber: product.shop?.whatsappNumber ?? null,
    arEnabled: product.shop?.arEnabled ?? false,

    arModelGlb: product.arModelGlb,
    arModelUsdz: product.arModelUsdz,
  }))

  return <ProductClient product={safeProduct} />
}