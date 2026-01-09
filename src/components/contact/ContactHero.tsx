"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="bg-gray-100 py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Let’s Build Something Exceptional
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Get in touch with Fahali Construction Ltd for residential,
          commercial, and infrastructure projects.
        </motion.p>
      </div>
    </section>
  );
}
