import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import KPIGrid from "@/components/KPIGrid";

export default async function OverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const products = await prisma.product.findMany({
    where: { shopId: session.user.shopId },
  });

  const categories = new Set(products.map((p) => p.category));

  return (
    <div className="space-y-8">
      <KPIGrid
        totalProducts={products.length}
        totalCategories={categories.size}
      />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Performance Overview
        </h2>

        <p className="text-sm text-gray-500">
          Advanced analytics and growth insights will appear
          here as your catalogue activity increases.
        </p>
      </div>
    </div>
  );
}
