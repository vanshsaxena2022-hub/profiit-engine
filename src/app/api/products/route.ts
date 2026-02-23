import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("📦 PRODUCT CREATE HIT");

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
    console.log("📥 BODY:", body);

    const name = body?.name?.trim();
    const description = body?.description?.trim();
    const category = body?.category?.trim();

    // ✅ normalize images safely
    let images: string[] = [];

    if (Array.isArray(body?.images)) {
      images = body.images.filter(
        (url: any) => typeof url === "string" && url.length > 5
      );
    }

    // 🔴 required validation
    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category required" },
        { status: 400 }
      );
    }

    // ✅ create product
    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        category,
        shopId: session.user.shopId,
      },
    });

    console.log("✅ PRODUCT CREATED:", product.id);

    // ✅ create images if exist
    if (images.length > 0) {
      await prisma.productImage.createMany({
        data: images.map((url) => ({
          imageUrl: url,
          productId: product.id,
        })),
      });

      console.log("🖼️ Images inserted:", images.length);
    }

    return NextResponse.json(
      { success: true, productId: product.id },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(
      "❌ PRODUCT CREATE ERROR FULL:",
      err?.message || err
    );

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}