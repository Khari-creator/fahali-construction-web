"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Ruler,
  Hammer,
  Settings,
  ClipboardList,
  Building2,
} from "lucide-react";

const services = [
  {
    title: "Design",
    description:
      "Architectural and structural design focused on functionality, compliance, and aesthetics.",
    href: "/services/design",
    icon: Ruler,
  },
  {
    title: "Engineering Services",
    description:
      "Civil, structural, and technical engineering solutions for complex builds.",
    href: "/services/engineering",
    icon: Settings,
  },
  {
    title: "Build",
    description:
      "End-to-end construction delivery with strict quality and timeline control.",
    href: "/services/build",
    icon: Hammer,
  },
  {
    title: "Project Management",
    description:
      "Planning, coordination, and execution oversight from concept to completion.",
    href: "/services/project-management",
    icon: ClipboardList,
  },
  {
    title: "Real Estate",
    description:
      "Development, investment, and property delivery across residential and commercial projects.",
    href: "/services/real-estate",
    icon: Building2,
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-neutral-100 py-28 text-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-lg text-neutral-600">
            Fahali Construction Ltd delivers integrated construction solutions —
            from concept and engineering to execution and delivery.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
              >
                <Icon className="w-10 h-10 text-red-600 mb-6" />

                <h3 className="text-xl font-semibold mb-4">
                  {service.title}
                </h3>

                <p className="text-neutral-600 mb-8">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="inline-flex items-center text-red-600 font-semibold hover:underline"
                >
                  Learn more →
                <a
                  href="https://wa.me/254703204119?text=Hello%2C%20I%20would%20like%20to%20discuss%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition"
                >
                  Contact Us
                </a>
        {/* Process Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 border-t border-neutral-300 pt-14"
        >
          <p className="text-center text-lg font-semibold tracking-wide text-neutral-700">
            Design → Engineering → Build → Deliver
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <Link
            href="/contact"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Talk to Our Team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

