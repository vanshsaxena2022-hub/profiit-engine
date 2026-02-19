import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, slug, whatsapp, ownerEmail, ownerPassword } = body;

  const hashedPassword = await bcrypt.hash(ownerPassword, 10);

  const shop = await prisma.shop.create({
    data: {
      name,
      slug,
      whatsappNumber: whatsapp,
    },
  });

  await prisma.user.create({
    data: {
      email: ownerEmail,
      password: hashedPassword,
      role: "OWNER",
      shopId: shop.id,
    },
  });

  return NextResponse.json({ success: true });
}
