// src/app/shop/[id]/page.tsx

export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import StoreHeader from "@/components/store/StoreHeader";
import StoreClient from "@/components/store/StoreClient";

export default async function ShopPage(props: any) {
  try {
    // ✅ robust param handling (important for Next 15/16)
    const params = await props.params;
    const shopId = params?.id;

    if (!shopId) {
      return (
        <div className="p-10 text-center text-red-500">
          Invalid store URL
        </div>
      );
    }

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
      include: {
        products: {
          include: {
            images: {
              select: {
                id: true,
                imageUrl: true,
                productId: true,
              },
            },
          },
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

    // ✅ safe serialization for server → client
    const safeProducts = JSON.parse(
      JSON.stringify(shop.products)
    );

    const categories = Array.from(
      new Set(safeProducts.map((p: any) => p.category))
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <StoreHeader
          name={shop.name}
          tagline={shop.tagline}
          logoUrl={shop.logoUrl}
        />

        <StoreClient
          products={safeProducts}
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