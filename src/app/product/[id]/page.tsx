export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ProductClient from "./ProductClient";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        shop: {
          select: { whatsappNumber: true },
        },
      },
    });

    if (!product) {
      return (
        <div className="p-10 text-center text-red-500">
          Product not found
        </div>
      );
    }

    return <ProductClient product={product} />;
  } catch (err) {
    console.error("PRODUCT PAGE ERROR:", err);

    return (
      <div className="p-10 text-center text-red-500">
        Failed to load product
      </div>
    );
  }
}