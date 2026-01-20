import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const filePath = `/uploads/${Date.now()}-${file.name}`;
  fs.writeFileSync(path.join(process.cwd(), "public", filePath), buffer);

  return NextResponse.json({ path: filePath });
}
