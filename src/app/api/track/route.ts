import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { shopId, productId, type } = body;

    if (!shopId || !type) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await prisma.analytics.create({
      data: {
        shopId,
        productId: productId || null,
        type,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("TRACK ERROR:", err);
    return NextResponse.json(
      { error: "Tracking failed" },
      { status: 500 }
    );
  }
}