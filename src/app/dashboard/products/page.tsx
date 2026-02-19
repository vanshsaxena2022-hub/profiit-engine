import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProductManager from "@/components/ProductManager";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const products = await prisma.product.findMany({
    where: { shopId: session.user.shopId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      category: true,
    },
  });

  return <ProductManager products={products} />;
}
