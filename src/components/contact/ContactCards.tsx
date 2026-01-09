"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const items = [
  {
    icon: Phone,
    title: "Phone",
    value: "+254 7XX XXX XXX",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@fahaliconstruction.co.ke",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Nairobi, Kenya",
  },
];

export default function ContactCards() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-gray-200 p-8 text-center hover:border-black transition"
            >
              <item.icon className="mx-auto mb-4 text-gray-900" size={32} />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
