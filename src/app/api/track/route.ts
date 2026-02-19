import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.analytics.create({
    data: {
      shopId: body.shopId,
      productId: body.productId || null,
      type: body.type,
    },
  });

  return NextResponse.json({ success: true });
}
