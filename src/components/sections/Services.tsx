"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardHat, Layers, Building2, Ruler } from "lucide-react";

type ServiceItem = {
  title: string;
  image: string;
  icon: React.ElementType;
};

const services: ServiceItem[] = [
  {
    title: "Engineering Services",
    icon: HardHat,
    image: "/images/engineering.jpg",
  },
  {
    title: "Project Management",
    icon: Layers,
    image: "/images/project-management.jpg",
  },
  {
    title: "Real Estate",
    icon: Building2,
    image: "/images/real-estate.jpg",
  },
  {
    title: "Design",
    icon: Ruler,
    image: "/images/design.jpg",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-neutral-100 py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-red-600 font-semibold uppercase tracking-wide">
            Crafting Exceptional Projects
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold text-black">
            Our Services
          </h2>

          <p className="mt-6 text-lg text-black/70 leading-relaxed">
            We deliver fully integrated design, engineering, construction,
            and real estate solutions — executed with precision and vision.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.title}
                layout
                whileHover={{ y: -6 }}
                onClick={() =>
                  setActiveIndex(isActive ? null : index)
                }
                className="relative rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
              >
                {/* Card Content */}
                <div className="p-6 flex flex-col gap-4 relative z-10">
                  <Icon className="w-10 h-10 text-red-600" />
                  <h3 className="text-xl font-bold text-black">
                    {service.title}
                  </h3>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Click Overlay */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/85 flex items-end p-6"
                    >
                      <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-white font-semibold text-lg"
                      >
                        Learn More →
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Process Timeline */}
<div className="mt-32">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-20"
  >
    <span className="text-red-600 font-semibold uppercase tracking-wide">
      Our Proven Process
    </span>

    <h3 className="mt-4 text-3xl lg:text-4xl font-extrabold text-black">
      From Concept to Completion
    </h3>
  </motion.div>

  {/* Timeline */}
  <div className="relative max-w-6xl mx-auto">
    {/* Connector Line */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="hidden md:block absolute top-8 left-0 right-0 h-[2px] bg-red-600 origin-left"
    />

    <div className="grid gap-12 md:grid-cols-4">
      {[
        {
          title: "Design",
          description: "Vision-driven architectural and conceptual planning.",
        },
        {
          title: "Engineering",
          description: "Structural, civil, and systems precision.",
        },
        {
          title: "Build",
          description: "Execution with quality, safety, and efficiency.",
        },
        {
          title: "Deliver",
          description: "On-time handover with uncompromising standards.",
        },
      ].map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          className="relative text-center"
        >
          {/* Step Circle */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
            {index + 1}
          </div>

          <h4 className="text-xl font-bold text-black">
            {step.title}
          </h4>

          <p className="mt-3 text-black/70 leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</div>

    </section>
  );
}
