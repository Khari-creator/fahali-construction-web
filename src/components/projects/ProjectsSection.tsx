"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {projects, Project } from "./projectsData";
import ProjectCard from "./ProjectCard";

const categories = [
  "All",
  "Bungalows",
  "Maisonettes",
  "Apartments",
  "Commercial",
] as const;

type Category = typeof categories[number];

interface ProjectsSectionProps {
  initialCategory?: Exclude<Category, "All">;
  showTabs?: boolean;
}

export default function ProjectsSection({
  initialCategory,
  showTabs = true,
}: ProjectsSectionProps) {
  const [active, setActive] = useState<Category>(
    initialCategory ?? "All"
  );

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* CATEGORY TABS */}
        {showTabs && (
          <div className="flex flex-wrap gap-3 mb-14 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2 text-xs uppercase tracking-wider border transition
                  ${
                    active === cat
                      ? "border-black text-black bg-white"
                      : "border-gray-300 text-gray-700 hover:border-black hover:text-black"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* GRID */}
        <motion.div
          layout
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
