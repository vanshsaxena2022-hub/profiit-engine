import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 🔒 not logged in
  if (!session?.user?.shopId) {
    redirect("/login");
  }

  // ✅ fetch shop safely
  const shop = await prisma.shop.findUnique({
    where: { id: session.user.shopId },
  });

  if (!shop) {
    return <div className="p-10">Shop not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold">{shop.name}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {shop.tagline || "Dashboard"}
        </p>

        <nav className="space-y-3">
          <a href="/dashboard" className="block">
            Overview
          </a>
          <a href="/dashboard/products" className="block">
            Products
          </a>
          <a href="/dashboard/add-product" className="block">
            Add Product
          </a>
          <a href="/dashboard/analytics" className="block">
            Analytics
          </a>
        </nav>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
