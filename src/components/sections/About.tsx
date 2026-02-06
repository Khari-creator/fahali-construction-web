"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Compass,
  HardHat,
  Ruler,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    label: "Projects Delivered",
    value: "120+",
  },
  {
    icon: Compass,
    label: "Years Experience",
    value: "15+",
  },
  {
    icon: HardHat,
    label: "Skilled Professionals",
    value: "80+",
  },
  {
    icon: Ruler,
    label: "Design–Build Model",
    value: "End-to-End",
  },
];

export default function About() {
  return (
    <section className="relative py-28 bg-white text-black overflow-hidden">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT — Motion Cards */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white border border-black/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <item.icon className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <p className="text-sm text-black/60">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Narrative */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-red-600 font-semibold tracking-wide uppercase">
            About Fahali Construction
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold leading-tight">
            We Design.
            <br />
            We Build.
            <br />
            We Deliver.
          </h2>

          <p className="mt-6 text-lg text-black/70 leading-relaxed">
            Fahali Construction Ltd is a full-service design and build company
            delivering residential, commercial, and infrastructure projects
            across East Africa. Our integrated approach combines architectural
            vision, engineering precision, and disciplined project management.
          </p>

          <p className="mt-4 text-lg text-black/70 leading-relaxed">
            From concept to completion, we take responsibility for every detail
            — ensuring quality, efficiency, and long-term value in every build.
          </p>

          <Link href="/about">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition"
            >
              Learn More About Us
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
