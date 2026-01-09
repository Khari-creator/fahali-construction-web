"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

export default function ServiceHero({
  eyebrow,
  title,
  description,
  image,
}: ServiceHeroProps) {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 items-center gap-16">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-widest text-brand-accent mb-4">
            {eyebrow}
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {title}
          </h1>

          <p className="text-gray-300 max-w-xl leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center md:justify-end"
        >

          {/* BACKGROUND IMAGE CIRCLE */}
          <div className="absolute w-[420px] h-[420px] rounded-full overflow-hidden opacity-30 blur-sm">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* FOREGROUND IMAGE CIRCLE */}
          <div className="relative w-[360px] h-[360px] rounded-full overflow-hidden border border-red-600/30 shadow-2xl">
            <Image
              src={image}
              alt={title}
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
