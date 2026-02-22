export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import StoreHeader from "@/components/store/StoreHeader";
import StoreClient from "@/components/store/StoreClient";

export default async function ShopPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const shop = await prisma.shop.findUnique({
      where: { slug: params.slug },
      include: {
        products: {
          include: { images: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!shop) {
      return (
        <div className="p-10 text-center text-gray-500">
          Store not found
        </div>
      );
    }

    const categories = Array.from(
      new Set(shop.products.map((p) => p.category))
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <StoreHeader
          name={shop.name}
          tagline={shop.tagline}
          logoUrl={shop.logoUrl}
        />

        <StoreClient
          products={shop.products}
          categories={categories}
          slug={shop.slug}
        />
      </div>
    );
  } catch (err) {
    console.error("SHOP PAGE ERROR:", err);
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load store
      </div>
    );
  }
}