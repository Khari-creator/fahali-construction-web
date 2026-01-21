"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "@/types/projects";

export default function ProjectsHero() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to load projects");
        }

        setProjects(data.projects as Project[]);
      } catch (err) {
        console.error(err);
        setError("Unable to load projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="projects-hero">
      <h1>Our Projects</h1>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={300}
              className="project-image"
            />

            <h3>{project.title}</h3>
            <p>{project.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
