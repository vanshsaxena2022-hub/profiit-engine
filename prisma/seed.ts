import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  // create shop
  const shop = await prisma.shop.upsert({
    where: { slug: "demo-decor" },
    update: {},
    create: {
      name: "Demo Decor",
      slug: "demo-decor",
      whatsappNumber: "919999999999",
      tagline: "Premium Furniture Store",
    },
  });

  // 🔐 HASH PASSWORD PROPERLY
  const hashedPassword = await bcrypt.hash("demo123", 10);

  // create user
  await prisma.user.upsert({
    where: { email: "demo@store.com" },
    update: {},
    create: {
      email: "demo@store.com",
      password: hashedPassword, // ✅ IMPORTANT
      shopId: shop.id,
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());