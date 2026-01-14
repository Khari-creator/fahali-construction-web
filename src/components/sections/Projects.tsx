"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/types/projects";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(setProjects);
  }, []);

  const featured = projects.filter(p => p.featured).slice(0, 6);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl mb-20">
          <span className="text-red-600 font-semibold uppercase">
            Design & Build Experts
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-black">
            Projects
          </h2>

          <p className="mt-6 text-black/70">
            Luxury homes, bungalows, and modern developments.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
