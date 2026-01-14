"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const items = [
  {
    icon: Phone,
    title: "Phone",
    value: "+254 703 204 119",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@fahalibuilders.com",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Nairobi, Kenya",
  },
];

export default function ContactCards() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="
                border border-gray-800
                bg-[#0b0b0b]
                p-10
                text-center
                rounded-xl
                hover:border-red-600
                hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]
                transition
              "
            >
              <item.icon
                className="mx-auto mb-5 text-red-600"
                size={36}
              />

              <h3 className="font-semibold text-lg text-white mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
