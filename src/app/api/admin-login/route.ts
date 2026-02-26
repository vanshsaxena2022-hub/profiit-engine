import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  if (
    email === process.env.SUPER_ADMIN_EMAIL &&
    password === process.env.SUPER_ADMIN_PASSWORD
  ) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}