// src/app/api/products/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 🔒 auth guard
    if (!session?.user?.shopId) {
      console.error("❌ Missing shopId in session");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const name = body?.name;
    const description = body?.description;
    const category = body?.category;

    // ⭐ CRITICAL: normalize images safely
    let images: string[] = [];

    if (Array.isArray(body?.images)) {
      images = body.images.filter(Boolean);
    }

    console.log("📦 PRODUCT CREATE INPUT:", {
      name,
      category,
      imagesCount: images.length,
      imagesSample: images?.[0],
    });

    if (!name || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ create product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        shopId: session.user.shopId,
      },
    });

    // ✅ create images (ONLY if valid)
    if (images.length > 0) {
      await prisma.productImage.createMany({
        data: images.map((url) => ({
          imageUrl: url,
          productId: product.id,
        })),
      });

      console.log("✅ Images inserted:", images.length);
    } else {
      console.warn("⚠️ No images received in product create");
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("❌ PRODUCT CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}