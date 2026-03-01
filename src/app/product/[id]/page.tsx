export const dynamic = "force-dynamic"
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
    include: { 
      shop: true,
      images: true
    },
  })

  if (!product || !product.shop) return notFound()

  const safeProduct = {
    id: product.id,
    name: product.name ?? "",
    description: product.description ?? "",
    imageUrl: product.images?.[0]?.imageUrl ?? null,
    whatsappNumber: product.shop.whatsappNumber ?? null,
    arEnabled: product.shop.arEnabled ?? false,
    arModelGlb: product.arModelGlb ?? null,
    arModelUsdz: product.arModelUsdz ?? null,
  }

  return <ProductClient product={safeProduct} />
}