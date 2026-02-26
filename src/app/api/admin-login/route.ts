import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const admin = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin || admin.shopId) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}