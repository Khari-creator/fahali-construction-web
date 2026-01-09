"use client";

import { motion } from "framer-motion";

const values = [
  {
    title: "Integrity",
    text: "We operate with honesty, transparency, and accountability in every engagement.",
  },
  {
    title: "Quality",
    text: "We deliver superior workmanship that meets the highest construction standards.",
  },
  {
    title: "Safety",
    text: "Safety is embedded in every process, protecting people and property.",
  },
  {
    title: "Innovation",
    text: "We embrace modern technologies and efficient construction solutions.",
  },
];

export default function AboutValues() {
  return (
    <section className="relative py-28 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-brand-accent mb-3">
            What Drives Us
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black">
            Our Core Values
          </h2>
        </motion.div>

        {/* Value Cards */}
        <div className="grid gap-8 md:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white p-8 rounded-2xl border border-neutral-200
                         hover:border-brand-accent transition"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-brand-accent transition-all duration-300 group-hover:w-full" />

              <h3 className="text-xl font-bold text-black mb-3">
                {value.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
