"use client";

import { motion } from "framer-motion";
import { Project } from "./projectsData";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl overflow-hidden bg-white shadow-md"
    >
      <div className="h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-black">
          {project.title}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-black/60">
          {project.category}
        </p>
      </div>
    </motion.div>
  );
}
