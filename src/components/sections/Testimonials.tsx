"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah M",
    initials: "SM",
    text: `I had a specific vision for my maisonette — a bright, modern space that felt both luxurious and functional. The Fahali team not only captured my vision perfectly, but they also exceeded my expectations with their attention to detail and professionalism.`,
  },
  {
    name: "James K",
    initials: "JK",
    text: `From design to delivery, the process was seamless. Communication was clear, timelines were respected, and the final build quality was exceptional.`,
  },
  {
    name: "Linda W",
    initials: "LW",
    text: `Their craftsmanship and project management stood out. I would confidently recommend them to anyone looking for a design and build partner.`,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + testimonials.length) % testimonials.length);

  const next = () =>
    setIndex((index + 1) % testimonials.length);

  return (
    <section
      className="relative py-32 text-white"
      style={{
        backgroundImage: "url('/images/testimonials-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="flex items-center gap-3 text-sm uppercase tracking-wide text-white/80">
            <span className="w-6 h-[2px] bg-white" />
            What our clients say
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold">
            Testimonials
          </h2>

          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl">
            Don’t just imagine your dream space — build it. At The Fahali Building and Construction,
            we turn visions into reality, crafting stunning homes, workspaces,
            and more with meticulous detail and a sustainable touch. Here’s
            what our clients say about their Fahali Building and Construction experience.
          </p>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white text-black rounded-2xl p-10 shadow-xl"
        >
          {/* Quote */}
          <div className="text-6xl font-extrabold leading-none text-black/10">
            “
          </div>

          <p className="mt-6 text-lg leading-relaxed text-black/80">
            {testimonials[index].text}
            <span className="text-red-600 font-semibold cursor-pointer">
              {" "}
              read more...
            </span>
          </p>

          {/* Footer */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                {testimonials[index].initials}
              </div>
              <span className="font-semibold">
                {testimonials[index].name}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
