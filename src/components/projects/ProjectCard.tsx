"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "./projectsData";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <Link href={`/projects/${project.slug}`}>

        {/* IMAGE */}
        <div className="relative h-60">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          {/* subtle image balance */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* TEXT */}
        <div className="p-5">
          <h3 className="font-semibold text-[15px] text-gray-900 uppercase tracking-wide">
            {project.title}
          </h3>

          <span className="mt-1 block text-xs font-medium text-gray-600 uppercase">
            {project.category}
          </span>
        </div>

      </Link>
    </motion.div>
  );
}
