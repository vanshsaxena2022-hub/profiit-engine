import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { productId, type } = await req.json()

    if (!productId || !type) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    // 🔥 get shopId from product (AUTO FIX)
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { shopId: true },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    await prisma.analytics.create({
      data: {
        productId,
        shopId: product.shopId, // ✅ AUTO FETCHED
        type,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("TRACK ERROR:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}