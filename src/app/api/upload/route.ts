import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    // Basic validation: types and size
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSizeBytes = parseInt(process.env.MAX_UPLOAD_SIZE || "5242880", 10); // default 5MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Unsupported file type" }, { status: 400 });
    }

    // Some runtimes provide `size` on File; otherwise rely on ArrayBuffer length after reading

    const SUPABASE_URL = process.env.SUPABASE_URL;
    // Accept multiple possible env names for the service role key (some setups use *_KEY suffix)
    const SUPABASE_SERVICE_ROLE =
      process.env.SUPABASE_SERVICE_ROLE ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_KEY ||
      process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      // Log which env variable keys are present (do not log values)
      const present = {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE: !!process.env.SUPABASE_SERVICE_ROLE,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
        SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
        SUPABASE_STORAGE_BUCKET: !!process.env.SUPABASE_STORAGE_BUCKET,
      };
      console.error("Missing Supabase environment variables - presence:", present);
      return NextResponse.json({ success: false, error: "Server configuration error: missing Supabase keys" }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    // Use bucket 'project-images' (create in Supabase) — fallback to 'uploads'
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "project-images";
    const filename = `projects/${Date.now()}-${file.name}`;

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer();
    if (arrayBuffer.byteLength > maxSizeBytes) {
      return NextResponse.json({ success: false, error: "File too large" }, { status: 400 });
    }
    // Use Node Buffer for server-side upload to Supabase
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage.from(bucket).upload(filename, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      // Log full error for server-side debugging
      console.error("Supabase upload error:", error);
      // Return detailed error temporarily to help diagnose production failures (remove after debugging)
      const message = (error.message || JSON.stringify(error));
      const status = (error.status || 500);
      return NextResponse.json({ success: false, error: message }, { status });
    }

    // Get public URL
    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return NextResponse.json({ success: true, url: publicData.publicUrl, path: data.path });
  } catch (error) {
    console.error("Upload error:", error);
    // Surface unexpected errors during debugging
    const message = (error instanceof Error ? error.message : String(error));
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
