import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@store.com";
  const password = "demo123";

  // check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Demo user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // create demo shop
  const shop = await prisma.shop.create({
    data: {
      name: "Demo Decor",
      slug: "demo-decor",
      whatsappNumber: "919999999999",
      tagline: "Premium Furniture Store",
    },
  });

  // create demo user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      shopId: shop.id,
    },
  });

  console.log("✅ Demo data seeded");
}

main()
  .catch((e) => {
    console.error("SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
