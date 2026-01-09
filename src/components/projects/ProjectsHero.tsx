"use client";

import { motion } from "framer-motion";

export default function ProjectsHero() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">

        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-semibold text-brand-accent uppercase"
        >
          Design & Build Experts
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-5xl md:text-6xl font-extrabold"
        >
          Projects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-3xl text-lg text-gray-600"
        >
          Our portfolio reflects excellence across residential, commercial,
          and infrastructure developments—executed with precision, quality,
          and attention to detail.
        </motion.p>

      </div>
    </section>
  );
}
