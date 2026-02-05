import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { projectId, imageUrl } = await req.json();

    if (!projectId || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing projectId or imageUrl" },
        { status: 400 }
      );
    }

    // Verify project exists before creating image
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const image = await prisma.projectImage.create({
      data: {
        projectId,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to add image" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { imageId } = await req.json();

    if (!imageId) {
      return NextResponse.json(
        { success: false, error: "Missing imageId" },
        { status: 400 }
      );
    }

    await prisma.projectImage.delete({
      where: { id: imageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
