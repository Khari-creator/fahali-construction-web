import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Project } from "@/types/projects";

const filePath = path.join(process.cwd(), "src/data/projects.json");

function readProjects(): Project[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  if (!data) return [];
  return JSON.parse(data);
}

function writeProjects(data: Project[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(readProjects());
}

export async function POST(req: Request) {
  const project: Project = await req.json();
  const projects = readProjects();
  projects.push(project);
  writeProjects(projects);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const { slug, data } = await req.json();
  const projects = readProjects().map(p =>
    p.slug === slug ? data : p
  );
  writeProjects(projects);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { slug } = await req.json();
  const projects = readProjects().filter(p => p.slug !== slug);
  writeProjects(projects);
  return NextResponse.json({ success: true });
}
