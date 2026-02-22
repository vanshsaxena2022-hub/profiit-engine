// src/app/dashboard/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import KPIGrid from "@/components/KPIGrid";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.shopId) {
    redirect("/login");
  }

  const shopId = session.user.shopId;

  // ✅ KPI calculations
  const [totalProducts, arProducts] = await Promise.all([
    prisma.product.count({
      where: { shopId },
    }),
    prisma.product.count({
      where: {
        shopId,
        arModelUrl: { not: null },
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>

      <KPIGrid
        totalProducts={totalProducts}
        arProducts={arProducts}
      />
    </div>
  );
}