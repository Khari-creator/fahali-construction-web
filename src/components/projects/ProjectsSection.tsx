"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

/* ---------- TYPES ---------- */
type Project = {
  slug: string;
  title: string;
  category: "Bungalows" | "Maisonettes" | "Apartments" | "Commercial";
  image: string;
  featured: boolean;
};

type Props = {
  initialCategory?: string;
  showTabs?: boolean;
  onlyFeatured?: boolean; // <-- IMPORTANT
};

/* ---------- COMPONENT ---------- */
export default function ProjectsSection({
  initialCategory = "All",
  showTabs = true,
  onlyFeatured = false,
}: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(initialCategory);

  /* ---------- FETCH FROM CMS ---------- */
  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then((apiResponse: { projects: Project[] }) => {
        // Safely access the nested projects array or default to an empty array
        const projectsArray = apiResponse.projects || [];

        setProjects(
          onlyFeatured 
            ? projectsArray.filter(p => p.featured) 
            : projectsArray
        );
      });
  }, [onlyFeatured]);

  /* ---------- FILTER ---------- */
  const filtered =
    active === "All"
      ? projects
      : projects.filter(p => p.category === active);

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* CATEGORY TABS */}
        {showTabs && (
          <div className="flex flex-wrap gap-3 mb-14 justify-center">
            {["All", "Bungalows", "Maisonettes", "Apartments", "Commercial"].map(
              cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-6 py-2 text-xs uppercase tracking-wider border transition
                    ${
                      active === cat
                        ? "border-black bg-white text-black"
                        : "border-gray-300 text-gray-600 hover:border-black"
                    }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        )}

        {/* PROJECT GRID */}
        <motion.div
          layout
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map(project => (
             <ProjectCard
           key={project.slug}
            project={project}
/>

            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
