import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File required" }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Missing blob token" }, { status: 500 });
    }

    // NEXT.JS 16 / VERCEL BLOB 2026 FIX:
    // In newer SDK versions, options are more restricted. 
    // If 'addRandomSuffix' is causing a TS error, use 'allowOverwrite: false' 
    // which is the default behavior to ensure uniqueness.
    const blob = await put(file.name, file, {
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
