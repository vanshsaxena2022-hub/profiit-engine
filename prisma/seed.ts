import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  // ✅ create demo shop
  const shop = await prisma.shop.upsert({
    where: { slug: "demo-decor" },
    update: {},
    create: {
      name: "Demo Decor",
      slug: "demo-decor",
      whatsappNumber: "919999999999",
      tagline: "Premium Home Decor",
      logoUrl: "",
    },
  });

  // ✅ hash password
  const hashedPassword = await bcrypt.hash("demo123", 10);

  // ✅ create demo user
  await prisma.user.upsert({
    where: { email: "demo@store.com" },
    update: {},
    create: {
      email: "demo@store.com",
      password: hashedPassword,
      shopId: shop.id,
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });