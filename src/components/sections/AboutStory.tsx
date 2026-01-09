"use client";

import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section className="py-28 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Fahali Construction Ltd is a Kenyan-based construction company
            offering integrated design, engineering, construction, and project
            management services. We partner with clients from concept to
            completion, delivering projects that meet the highest standards of
            safety, quality, and performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-neutral-100 p-10 rounded-2xl"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Why Clients Choose Us
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>• End-to-end construction expertise</li>
            <li>• Experienced engineers and project managers</li>
            <li>• Transparent processes and communication</li>
            <li>• Timely delivery with cost control</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
