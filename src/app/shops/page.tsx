export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ShopsPage() {
  const shops = await prisma.shop.findMany();

  return (
    <div style={{ padding: 30 }}>
      <h1>All Shops</h1>

      <div style={{ marginTop: 20 }}>
        {shops.map((shop) => (
          <div key={shop.id} style={{ marginBottom: 15 }}>
            <Link href={`/shop/${shop.slug}`}>
              <button>{shop.name}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
