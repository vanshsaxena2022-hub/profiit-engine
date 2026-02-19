import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.shopId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description, category, images } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name required" },
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

    // ✅ create images
    if (images?.length) {
      await prisma.productImage.createMany({
        data: images.map((url: string) => ({
          url,
          productId: product.id,
        })),
      });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("PRODUCT CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
