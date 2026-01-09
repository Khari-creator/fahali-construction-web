"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative min-h-[70vh] bg-black text-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Building Trust.
            <br />
            <span className="text-brand-accent">Delivering Excellence.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Fahali Construction Ltd is a multidisciplinary construction firm
            delivering high-quality residential, commercial, and infrastructure
            projects with precision, integrity, and innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
