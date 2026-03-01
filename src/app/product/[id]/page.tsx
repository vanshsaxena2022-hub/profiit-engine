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
        description: product.description ?? "",
        imageUrl: product.imageUrl ?? "",
        whatsappNumber: product.shop?.whatsappNumber ?? "",
        arModelGlb: product.arModelGlb ?? "",
        arModelUsdz: product.arModelUsdz ?? "",
        arEnabled: product.shop?.arEnabled ?? false,
      }}
    />
  )
}