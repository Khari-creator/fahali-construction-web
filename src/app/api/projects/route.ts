import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function GET() {
  const { data } = await supabase.from("projects").select("*");
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { title, slug, category, image, featured } = body;

  if (!title || !slug || !category || !image) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  await supabase.from("projects").insert({
    title,
    slug,
    category,
    image,
    featured,
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const { slug, data } = await req.json();

  await supabase
    .from("projects")
    .update(data)
    .eq("slug", slug);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { slug } = await req.json();

  await supabase.from("projects").delete().eq("slug", slug);

  return NextResponse.json({ success: true });
}
