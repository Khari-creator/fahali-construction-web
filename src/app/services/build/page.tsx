"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Hammer,
  HardHat,
  Timer,
  ShieldCheck,
} from "lucide-react";

export default function BuildServicePage() {
  return (
    <main className="bg-white text-neutral-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-accent font-semibold mb-4">
              Our Services
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Build & Construction
            </h1>

            <p className="text-gray-300 text-lg max-w-xl">
              We deliver construction projects with precision, discipline, and
              uncompromising quality from ground-breaking to handover.
            </p>
          </motion.div>

          {/* IMAGE VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative ml-auto w-[360px] h-[360px] md:w-[420px] md:h-[420px]"
          >
            {/* background depth image */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-30 blur-sm">
              <Image
                src="/images/build-hero.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* main image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-red-600/30 shadow-2xl">
              <Image
                src="/hero.jpg"
                alt="Construction and Building Works"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-28 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Building with Excellence
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Fahali Construction Ltd executes projects with a disciplined
              approach to quality, safety, and schedule control. Our site teams
              are experienced, accountable, and performance-driven.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-neutral-600 leading-relaxed">
              We manage materials, subcontractors, and workflows efficiently to
              ensure timely delivery while maintaining the highest construction
              standards.
            </p>
          </motion.div>

        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-16"
          >
            Construction Capabilities
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-10">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 border rounded-2xl hover:shadow-lg transition"
                >
                  <Icon className="w-10 h-10 text-red-600 mb-6" />
                  <h3 className="font-semibold text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xl font-semibold tracking-wide">
            Design → Engineering → Build → Deliver
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let’s Build Something Exceptional
          </h2>

          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Engage our construction team to deliver your project safely, on
            time, and to specification.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-red-600 px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Start Your Build
          </Link>
        </motion.div>
      </section>

    </main>
  );
}

/* ---------- DATA ---------- */

const capabilities = [
  {
    title: "On-Site Construction",
    description:
      "Professional site execution with experienced supervisors and trades.",
    icon: HardHat,
  },
  {
    title: "Quality Control",
    description:
      "Strict quality assurance processes at every stage of construction.",
    icon: ShieldCheck,
  },
  {
    title: "Schedule Management",
    description:
      "Tight control of timelines to ensure on-time project delivery.",
    icon: Timer,
  },
  {
    title: "Structural Works",
    description:
      "Concrete, masonry, steel, and finishing works executed to specification.",
    icon: Hammer,
  },
];
