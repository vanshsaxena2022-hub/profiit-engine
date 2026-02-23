import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ NEXT 15+ FIX — await params
    const { id: productId } = await context.params;

    if (!productId) {
      return NextResponse.json(
        { error: "Product id missing" },
        { status: 400 }
      );
    }

    // delete images first
    await prisma.productImage.deleteMany({
      where: { productId },
    });

    // delete product
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}