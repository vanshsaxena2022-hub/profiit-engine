import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      slug,
      email,
      password,
      whatsappNumber,
      tagline,
      logoUrl,
    } = body;

    // 🔒 Basic validation
    if (!name || !slug || !email || !password || !whatsappNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🚫 Check duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    // 🚫 Check duplicate slug
    const existingShop = await prisma.shop.findUnique({
      where: { slug },
    });

    if (existingShop) {
      return NextResponse.json(
        { error: "Store slug already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧠 Transaction = atomic creation
    const result = await prisma.$transaction(async (tx) => {
      const shop = await tx.shop.create({
        data: {
          name,
          slug,
          whatsappNumber,
          tagline,
          logoUrl,
        },
      });

      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          shopId: shop.id,
        },
      });

      return { shop, user };
    });

    return NextResponse.json({ success: true, shopId: result.shop.id });

  } catch (err) {
    console.error("STORE CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Store creation failed" },
      { status: 500 }
    );
  }
}