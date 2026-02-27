import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { productId, arUrl } = await req.json();

    if (!productId || !arUrl) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: { arModelUrl: arUrl },
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}