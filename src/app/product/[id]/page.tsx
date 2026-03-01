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
    },
  })

  if (!product) return notFound()

  return (
    <ProductClient
      product={{
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl ?? null,

        // IMPORTANT FIX
        whatsappNumber: product.shop?.whatsappNumber ?? null,

        arModelGlb: product.arModelGlb ?? null,
        arModelUsdz: product.arModelUsdz ?? null,
        arEnabled: product.shop?.arEnabled ?? false,
      }}
    />
  )
}