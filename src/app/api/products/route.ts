import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.shopId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const name = body?.name?.trim();
    const description = body?.description?.trim() || "";
    const category = body?.category?.trim();

    const images: string[] = Array.isArray(body?.images)
      ? body.images.filter(Boolean)
      : [];

    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        shopId: session.user.shopId,
      },
    });

    if (images.length > 0) {
      await prisma.productImage.createMany({
        data: images.map((url) => ({
          imageUrl: url,
          productId: product.id,
        })),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PRODUCT CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}