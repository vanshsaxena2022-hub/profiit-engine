import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@peddle.com";
  const newPassword = "admin123";

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const admin = await prisma.user.findFirst({
    where: {
      role: "SUPER_ADMIN",
    },
  });

  if (!admin) {
    console.log("❌ No SUPER_ADMIN found");
    return;
  }

  await prisma.user.update({
    where: { id: admin.id },
    data: { password: hashedPassword },
  });

  console.log("✅ SUPER_ADMIN password reset");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
