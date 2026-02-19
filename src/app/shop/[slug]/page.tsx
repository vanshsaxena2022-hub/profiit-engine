import { prisma } from "@/lib/prisma";
import StoreHeader from "@/components/store/StoreHeader";
import CategoryFilter from "@/components/store/CategoryFilter";
import ProductCard from "@/components/store/ProductCard";

export default async function ShopPage({
  params,
}: {
  params: { slug: string };
}) {
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
    return <div className="p-10 text-center">Store not found</div>;
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
}

/* client wrapper */
function StoreClient({ products, categories, slug }: any) {
  "use client";
  const { useState } = require("react");
  const [active, setActive] = useState("ALL");

  const filtered =
    active === "ALL"
      ? products
      : products.filter((p: any) => p.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 space-y-5">
      <CategoryFilter
        categories={categories}
        active={active}
        onChange={setActive}
      />

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No products yet
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              shopSlug={slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
