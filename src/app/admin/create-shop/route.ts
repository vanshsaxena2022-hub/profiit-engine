"use client";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      shopName,
      slug,
      whatsappNumber,
      tagline,
      ownerEmail,
      ownerPassword,
    } = body;

    // 🔒 basic validation
    if (!shopName || !slug || !ownerEmail || !ownerPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔍 check if shop slug exists
    const existingShop = await prisma.shop.findUnique({
      where: { slug },
    });

    if (existingShop) {
      return NextResponse.json(
        { error: "Shop slug already exists" },
        { status: 400 }
      );
    }

    // 🔍 check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: ownerEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(ownerPassword, 10);

    // 🏪 create shop
    const shop = await prisma.shop.create({
      data: {
        name: shopName,
        slug,
        whatsappNumber,
        tagline: tagline || null,
      },
    });

          const router = useRouter();

          useEffect(() => {
          const auth = localStorage.getItem("admin-auth");

           if (!auth) {
           router.push("/admin/login");
               }
              }, []);

    // 👤 create owner user (NO ROLE — important)
    await prisma.user.create({
      data: {
        email: ownerEmail,
        password: hashedPassword,
        shopId: shop.id,
      },
    });

    return NextResponse.json({
      success: true,
      shopId: shop.id,
    });
  } catch (error) {
    console.error("CREATE SHOP ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create shop" },
      { status: 500 }
    );
  }
}
