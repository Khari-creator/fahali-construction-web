"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Ruler, Layers, PenTool, ClipboardCheck } from "lucide-react";

export default function DesignServicePage() {
  return (
    <main className="bg-white text-neutral-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-accent font-semibold mb-4">
              Our Services
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              Design & Planning
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-xl">
              We transform ideas into build-ready designs through intelligent
              architectural planning, engineering coordination, and regulatory
              compliance.
            </p>
          </motion.div>

          {/* IMAGE VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative ml-auto w-44 sm:w-56 md:w-[360px] h-44 sm:h-56 md:h-[360px]"
          >
            {/* background depth image */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-30 blur-sm">
              <Image
                src="/images/design-hero.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* main image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-red-600/30 shadow-2xl">
              <Image
                src="/images/design-hero.jpg"
                alt="Architectural Design and Planning"
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
              Design with Purpose
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Fahali Construction Ltd delivers functional, compliant, and
              cost-effective designs tailored to project requirements. Our
              design process integrates architectural vision, engineering
              precision, and construction practicality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-neutral-600 leading-relaxed">
              We collaborate closely with clients, consultants, and authorities
              to ensure designs are optimized for execution, budget control,
              and long-term value.
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
            Our Design Capabilities
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
            Ready to Start Your Project?
          </h2>

          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Engage our design team and move confidently from concept to
            construction.
          </p>

          <a
            href="https://wa.me/254703204119?text=Hello%2C%20I%20would%20like%20to%20discuss%20design%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Contact Us
          </a>
        </motion.div>
      </section>

    </main>
  );
}

/* ---------- DATA ---------- */

const capabilities = [
  {
    title: "Architectural Design",
    description:
      "Conceptual and detailed architectural layouts aligned with client vision.",
    icon: PenTool,
  },
  {
    title: "Structural Planning",
    description:
      "Safe, efficient structural systems designed for constructability.",
    icon: Layers,
  },
  {
    title: "Regulatory Compliance",
    description:
      "Approval-ready documentation meeting statutory and regulatory requirements.",
    icon: ClipboardCheck,
  },
  {
    title: "Design Coordination",
    description:
      "Integrated collaboration between architects, engineers, and builders.",
    icon: Ruler,
  },
];
