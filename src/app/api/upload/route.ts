import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("UPLOAD HIT");

    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      console.error("❌ IMGBB_API_KEY missing");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    // ✅ correct imgbb format
    const body = new URLSearchParams();
    body.append("image", base64);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      body.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 20000,
      }
    );

    const url = response.data?.data?.url;

    if (!url) {
      console.error("❌ ImgBB returned no URL", response.data);
      throw new Error("ImgBB upload failed");
    }

    console.log("✅ IMG UPLOADED:", url);

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("❌ UPLOAD ERROR FULL:", err?.response?.data || err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}