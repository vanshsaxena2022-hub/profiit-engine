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

  // ✅ ALL KPI QUERIES IN PARALLEL (fast)
  const [
    totalProducts,
    arProducts,
    linkOpens,
    whatsappClicks,
  ] = await Promise.all([
    // total products
    prisma.product.count({
      where: { shopId },
    }),

    // products with AR
    prisma.product.count({
      where: {
        shopId,
        arModelUrl: { not: null },
      },
    }),

    // link opens
    prisma.analytics.count({
      where: {
        shopId,
        type: "link_open",
      },
    }),

    // whatsapp clicks
    prisma.analytics.count({
      where: {
        shopId,
        type: "whatsapp_click",
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>

      <KPIGrid
        totalProducts={totalProducts}
        arProducts={arProducts}
        linkOpens={linkOpens}
        whatsappClicks={whatsappClicks}
      />
    </div>
  );
}