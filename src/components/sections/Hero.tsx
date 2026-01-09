"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  HardHat,
  Timer,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "120+",
    label: "Projects Completed",
  },
  {
    icon: HardHat,
    value: "15+",
    label: "Years Experience",
  },
  {
    icon: Timer,
    value: "98%",
    label: "On-Time Delivery",
  },
  {
    icon: CheckCircle,
    value: "100%",
    label: "Quality Assurance",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2">

        {/* LEFT: TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Building Excellence <br />
            <span className="text-brand-accent">
              Across Kenya
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-300">
            Fahali Construction Ltd delivers end-to-end construction solutions —
            from architectural design and engineering to project management and
            real estate development.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="rounded-md bg-brand-accent px-8 py-4 font-semibold text-black"
            >
              Request a Quote
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/projects"
              className="rounded-md border border-gray-600 px-8 py-4 font-semibold text-white hover:border-brand-accent hover:text-brand-accent transition"
            >
              View Our Projects
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT: SCULPTED IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center md:justify-end"
        >
          {/* Decorative Glow */}
          <div className="absolute -inset-6 rounded-full bg-brand-accent/20 blur-3xl" />

          {/* Circular Image Container */}
          <div className="relative h-[360px] w-[360px] overflow-hidden rounded-full border border-gray-700 md:h-[420px] md:w-[420px]">
            <Image
              src="/hero.jpg"
              alt="Construction site"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
