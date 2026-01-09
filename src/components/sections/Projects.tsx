"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";

type Project = {
  title: string;
  category: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Karen 6 Bedroom Villa",
    category: "Maisonettes",
    image: "/images/villa-1.jpg",
  },
  {
    title: "5 Bedroom Manor",
    category: "Maisonettes",
    image: "/images/villa-2.jpg",
  },
  {
    title: "4 Bedroom Maisonette",
    category: "Maisonettes",
    image: "/images/villa-3.jpg",
  },
  {
    title: "Luxury Bungalow",
    category: "Bungalows",
    image: "/images/bungalow-1.jpg",
  },
  {
    title: "Contemporary Bungalow",
    category: "Bungalows",
    image: "/images/bungalow-2.jpg",
  },
  {
    title: "Modern Bungalow",
    category: "Bungalows",
    image: "/images/bungalow-3.jpg",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-red-600 font-semibold uppercase tracking-wide">
            Design & Build Experts
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold text-black">
            Projects
          </h2>

          <p className="mt-6 text-lg text-black/70 leading-relaxed">
            We bring architectural vision to life through exceptional
            craftsmanship — delivering luxury residences, apartments,
            bungalows, and infrastructure projects across the region.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() =>
                  setActiveIndex(isActive ? null : index)
                }
                className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-md bg-white"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-black">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm uppercase tracking-wide text-black/60">
                    {project.category}
                  </p>
                </div>

                {/* Click Overlay */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-600/90 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="w-14 h-14 bg-white rounded-xl flex items-center justify-center"
                      >
                        <Eye className="w-6 h-6 text-red-600" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
