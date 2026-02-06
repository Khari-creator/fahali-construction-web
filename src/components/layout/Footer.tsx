"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-white">
      {/* Top Divider */}
      <div className="h-[1px] bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16">
        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-extrabold tracking-tight">
            Fahali Building & Civil Engineering Ltd
          </h3>
          <p className="mt-6 text-white/70 leading-relaxed max-w-sm">
            A leading Kenyan design and build company delivering
            architecturally refined residential, commercial, and infrastructure
            projects with precision and integrity.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="https://www.facebook.com/share/17s3mW59Z8/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fahali Construction Facebook"
            >
              <SocialIcon icon={<Facebook size={18} />} />
            </a>
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
          </div>
        </motion.div>

        {/* removed quick links and services columns per request */}

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="text-lg font-semibold">Get in touch</h4>

          <ul className="mt-6 space-y-4 text-white/70">
            <li className="flex gap-3">
              <MapPin size={18} className="text-red-500" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Biashara%20Street%2C%20Hison%20Plaza%2C%20Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Biashara Street, Hison Plaza, Nairobi
                </a>
            </li>

            <li className="flex gap-3">
              <Phone size={18} className="text-red-500" />
              <a href="tel:+254703204119" className="hover:underline">
                +254 703204119
              </a>
            </li>

            <li className="flex gap-3">
              <Mail size={18} className="text-red-500" />
              <a href="mailto:info@fahalibuilders.com" className="hover:underline">
                info@fahalibuilders.com
              </a>
            </li>
          </ul>

          <a
            href="https://wa.me/254703204119?text=Hello%2C%20I%20would%20like%20to%20start%20a%20project%20with%20Fahali%20Construction.%20Could%20you%20please%20share%20next%20steps%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            Start a Project
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/60">
          <span>
            © {new Date().getFullYear()} The Fahali Building & Civil Engineering Ltd. All rights
            reserved.
          </span>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <ul className="mt-6 space-y-3">{children}</ul>
    </motion.div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li className="group flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition">
      <span className="w-0 group-hover:w-3 h-[2px] bg-red-500 transition-all" />
      {label}
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-white/5 hover:bg-red-600 flex items-center justify-center transition cursor-pointer">
      {icon}
    </div>
  );
}
