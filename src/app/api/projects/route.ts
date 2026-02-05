import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.slug || !body.category || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, slug, category, imageUrl" },
        { status: 400 }
      );
    }

    // Normalize slug to a URL-friendly format
    const normalizeSlug = (s: string) =>
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const slug = normalizeSlug(body.slug);

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug,
        category: body.category,
        imageUrl: body.imageUrl,
        description: body.description ?? null,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    if (error instanceof Object && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 409 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { slug } = await req.json();

    await prisma.project.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const { slug, data } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { slug },
      data: {
        title: data.title,
        category: data.category,
        imageUrl: data.imageUrl,
        description: data.description ?? null,
        featured: data.featured ?? false,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    if (error instanceof Object && "code" in error && error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}