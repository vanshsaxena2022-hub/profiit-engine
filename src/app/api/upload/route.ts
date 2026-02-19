import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("UPLOAD ROUTE HIT");

    const formData = await req.formData();
    console.log("FORMDATA RECEIVED");

    const file = formData.get("file") as File | null;
    console.log("FILE:", file?.name);

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    console.log("UPLOAD DIR:", uploadDir);

    // ✅ SAFE DIR ENSURE (Windows-proof)
    try {
      const stat = await fs.promises.stat(uploadDir).catch(() => null);

      if (stat && !stat.isDirectory()) {
        // uploads exists but is a file → remove it
        await fs.promises.unlink(uploadDir);
      }

      await fs.promises.mkdir(uploadDir, { recursive: true });
    } catch (e) {
      console.error("DIR PREP ERROR:", e);
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.promises.writeFile(filePath, buffer);

    console.log("FILE WRITTEN");

    return NextResponse.json({
      url: `/uploads/${fileName}`,
    });
  } catch (err) {
    console.error("UPLOAD CRASH FULL:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
