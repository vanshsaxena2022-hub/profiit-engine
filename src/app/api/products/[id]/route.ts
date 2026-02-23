import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Context = {
  params: {
    id: string;
  };
};

export async function DELETE(
  req: NextRequest,
  context: Context
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.shopId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const productId = context.params.id;

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

    await prisma.productImage.deleteMany({
      where: { productId },
    });

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