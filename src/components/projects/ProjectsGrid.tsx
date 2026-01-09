"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "./projectsData";

export default function ProjectsGrid() {
  return (
    <>
      {/* GRID */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative h-60">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">
                {project.title}
              </h3>
              <span className="text-xs uppercase tracking-widest text-gray-500">
                {project.category}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINATION (STATIC FOR NOW, MATCHES REFERENCE) */}
      <div className="mt-16 flex justify-center items-center gap-2">
        <button className="px-3 py-2 border rounded text-gray-400">
          &laquo;
        </button>

        <button className="px-4 py-2 rounded bg-brand-accent text-white">
          1
        </button>
        <button className="px-4 py-2 border rounded">2</button>
        <button className="px-4 py-2 border rounded">3</button>
        <button className="px-4 py-2 border rounded">4</button>

        <button className="px-3 py-2 border rounded">
          &raquo;
        </button>
      </div>
    </>
  );
}
