import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const { put } = await import("@vercel/blob");

    const blob = await put(
      `uploads/${Date.now()}-${file.name}`,
      file,
      {
        access: "public", // REQUIRED
        contentType: file.type, // REQUIRED
      }
    );

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
