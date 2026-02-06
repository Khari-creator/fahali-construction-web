"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ClipboardList,
  BarChart3,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function ProjectManagementPage() {
  return (
    <main className="bg-white text-neutral-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-accent font-semibold mb-4">
              Our Services
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              Project Management
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl">
              We plan, coordinate, and control construction projects to ensure
              predictable outcomes, budget discipline, and timely delivery.
            </p>
          </motion.div>

          {/* Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative ml-auto w-44 sm:w-56 md:w-[360px] h-44 sm:h-56 md:h-[360px] rounded-full bg-gradient-to-br from-red-600 to-red-900 opacity-80"
          />
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
              Control Every Detail
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Our project management approach ensures that scope, cost, and
              schedule are actively controlled. We serve as the central point
              of coordination between clients, consultants, and contractors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-neutral-600 leading-relaxed">
              Through structured reporting, risk management, and performance
              tracking, we deliver transparency and confidence at every phase.
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
            Project Management Capabilities
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
            Keep Your Project on Track
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Let our project management team bring structure, clarity, and
            control to your development.
          </p>

          <a
            href="https://wa.me/254703204119?text=Hello%2C%20I%20would%20like%20to%20discuss%20project%20management%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Speak to a Project Manager
          </a>
        </motion.div>
      </section>
    </main>
  );
}

/* ---------- DATA ---------- */

const capabilities = [
  {
    title: "Project Planning",
    description:
      "Scope definition, scheduling, and execution planning.",
    icon: ClipboardList,
  },
  {
    title: "Cost Control",
    description:
      "Budget tracking, forecasting, and cost optimization.",
    icon: BarChart3,
  },
  {
    title: "Stakeholder Coordination",
    description:
      "Alignment of consultants, contractors, and clients.",
    icon: Users,
  },
  {
    title: "Risk Management",
    description:
      "Identification and mitigation of project risks.",
    icon: ShieldCheck,
  },
];
