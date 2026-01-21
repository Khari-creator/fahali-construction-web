import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Try Vercel Blob Storage if token is available
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(`uploads/${Date.now()}-${file.name}`, file);
        return NextResponse.json({ path: blob.url });
      } catch (blobError) {
        console.error("Blob storage error:", blobError);
        // Fall through to data URL
      }
    } else {
      console.warn("BLOB_READ_WRITE_TOKEN not set, using data URL fallback");
    }

    // Fallback: Convert to base64 data URL for development
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;
    
    return NextResponse.json({ path: dataUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
