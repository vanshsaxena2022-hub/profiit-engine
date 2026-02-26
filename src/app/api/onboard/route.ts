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

    if (!name || !slug || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🏪 CREATE SHOP
    const shop = await prisma.shop.create({
      data: {
        name,
        slug,
        whatsappNumber,
        tagline,
        logoUrl,
      },
    });

    // 👤 CREATE OWNER USER
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        shopId: shop.id,
      },
    });

    return NextResponse.json({
      success: true,
      shopId: shop.id,
    });

  } catch (error) {
    console.error("ONBOARD ERROR:", error);
    return NextResponse.json(
      { error: "Failed to onboard store" },
      { status: 500 }
    );
  }
}