import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // Try several slug variants to be tolerant of un-normalized slugs
    const normalizeSlug = (s: string) =>
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const decoded = decodeURIComponent(slug || "");
    const candidates = Array.from(new Set([
      slug,
      decoded,
      // replace spaces with hyphens and vice-versa
      (slug || "").replace(/%20/g, " "),
      (slug || "").replace(/-/g, " "),
      normalizeSlug(slug || ""),
      normalizeSlug(decoded || ""),
    ].filter(Boolean)));

    const project = await prisma.project.findFirst({
      where: { slug: { in: candidates } },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
