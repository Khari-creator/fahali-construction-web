"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Use Next.js Image for 2026 performance standards
import { Project } from "./projectsData";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    // We keep motion.div here for individual card entry/exit behavior
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill // Fills the container; requires 'relative' on parent
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-black/60">
          {project.category}
        </p>
      </div>
    </motion.div>
  );
}
