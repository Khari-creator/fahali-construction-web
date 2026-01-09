"use client";

import { motion } from "framer-motion";

export default function ContactFormSection() {
  return (
    <section className="bg-gray-100 py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200 p-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Send Us a Message
          </h2>

          <div className="grid gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
            />

            <button
              type="submit"
              className="bg-black text-white py-3 hover:bg-gray-900 transition"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
