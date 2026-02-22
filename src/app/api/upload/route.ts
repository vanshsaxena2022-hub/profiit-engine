// src/app/api/upload/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // convert file → base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      console.error("❌ IMGBB KEY MISSING");
      return NextResponse.json(
        { error: "Image service not configured" },
        { status: 500 }
      );
    }

    // upload to imgbb
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: new URLSearchParams({
          image: base64,
        }),
      }
    );

    const data = await response.json();

    if (!data?.data?.url) {
      console.error("❌ IMGBB ERROR:", data);
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.data.url, // ⭐ PUBLIC CDN URL
    });
  } catch (err) {
    console.error("❌ UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}