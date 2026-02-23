import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ✅ DELETE PRODUCT
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.shopId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const productId = params.id;

    // ✅ ensure product belongs to shop
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        shopId: session.user.shopId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
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
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}