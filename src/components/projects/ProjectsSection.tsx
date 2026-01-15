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
  onlyFeatured?: boolean;
};

/* ---------- COMPONENT ---------- */
export default function ProjectsSection({
  initialCategory = "All",
  showTabs = true,
  onlyFeatured = false,
}: Props) {
  // 1. Always initialize with an empty array
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(initialCategory);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH FROM CMS ---------- */
  useEffect(() => {
    let isMounted = true;

    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((apiResponse) => {
        if (!isMounted) return;

        // 2. Validate that 'projects' exists and is an array before setting state
        const rawData = apiResponse?.projects;
        const validatedData = Array.isArray(rawData) ? rawData : [];

        setProjects(
          onlyFeatured 
            ? validatedData.filter((p: Project) => p.featured) 
            : validatedData
        );
      })
      .catch((err) => {
        console.error("Projects Fetch Error:", err);
        if (isMounted) setProjects([]); // Fallback to empty array on error
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [onlyFeatured]);

  /* ---------- FILTER LOGIC (DEFENSIVE) ---------- */
  // 3. Ensure we are working with an array even if state somehow becomes null/undefined
  const safeProjects = Array.isArray(projects) ? projects : [];

  const filtered = active === "All"
      ? safeProjects
      : safeProjects.filter((p) => p.category === active);

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* CATEGORY TABS */}
        {showTabs && (
          <div className="flex flex-wrap gap-3 mb-14 justify-center">
            {["All", "Bungalows", "Maisonettes", "Apartments", "Commercial"].map(
              (cat) => (
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
        {loading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : (
          <motion.div
            layout
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={project.slug}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No projects found in this category.
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
