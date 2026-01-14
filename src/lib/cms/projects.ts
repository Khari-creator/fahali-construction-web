import fs from "fs";
import path from "path";

export type Project = {
  slug: string;
  title: string;
  category: "Bungalows" | "Maisonettes" | "Apartments" | "Commercial";
  image: string;
  featured?: boolean;
};

const filePath = path.join(
  process.cwd(),
  "src/lib/cms/projects.json"
);

export function getProjects(): Project[] {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function saveProjects(projects: Project[]) {
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
}

export function updateProject(slug: string, data: Partial<Project>) {
  const projects = getProjects();
  const index = projects.findIndex(p => p.slug === slug);

  if (index === -1) return;

  projects[index] = { ...projects[index], ...data };
  saveProjects(projects);
}

export function deleteProject(slug: string) {
  const projects = getProjects().filter(p => p.slug !== slug);
  saveProjects(projects);
}
