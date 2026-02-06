"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-800 bg-black text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6">

        {/* Logo (left half on md+, responsive on smaller screens) */}
        <Link href="/" className="flex items-center flex-1 md:w-1/2">
          <div className="relative h-10 sm:h-12 md:h-16 w-full pl-0">
            <Image
              src="/logo.jpg"
              alt={siteConfig.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation (right half) */}
        <nav className="hidden items-center space-x-8 md:flex w-1/2 justify-end">
          <NavLink href="/">Home</NavLink>

          <DesktopDropdown label="Services">
            <DropdownItem href="/services" label="Our Services" />
            <DropdownItem href="/services/design" label="Design" />
            <DropdownItem href="/services/build" label="Build" />
            <DropdownItem
              href="/services/engineering"
              label="Engineering Services"
            />
            <DropdownItem
              href="/services/project-management"
              label="Project Management"
            />
            <DropdownItem
              href="/services/real-estate"
              label="Real Estate"
            />
          </DesktopDropdown>

          <DesktopDropdown label="Projects">
            <DropdownItem href="/projects" label="Our Projects" />
            <DropdownItem href="/projects/maisonettes" label="Maisonettes" />
            <DropdownItem href="/projects/bungalows" label="Bungalows" />
          </DesktopDropdown>

          <NavLink href="/about">About</NavLink>
          <a href="https://wa.me/254703204119?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition">Contact</a>
           <NavLink href="/admin/projects">Admin</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black px-6 py-6 space-y-4">

          <MobileLink href="/" onClick={() => setMenuOpen(false)}>
            Home
          </MobileLink>

          {/* Services */}
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex w-full items-center justify-between text-left"
          >
            <span>Services</span>
            <ChevronDown
              className={`transition ${servicesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {servicesOpen && (
            <div className="ml-4 space-y-2 text-sm text-gray-400">
              <MobileSubItem href="/services" label="Our Services" />
              <MobileSubItem href="/services/design" label="Design" />
              <MobileSubItem href="/services/build" label="Build" />
              <MobileSubItem
                href="/services/engineering"
                label="Engineering Services"
              />
              <MobileSubItem
                href="/services/project-management"
                label="Project Management"
              />
              <MobileSubItem
                href="/services/real-estate"
                label="Real Estate"
              />
            </div>
          )}

          {/* Projects */}
          <button
            onClick={() => setProjectsOpen(!projectsOpen)}
            className="flex w-full items-center justify-between text-left"
          >
            <span>Projects</span>
            <ChevronDown
              className={`transition ${projectsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {projectsOpen && (
            <div className="ml-4 space-y-2 text-sm text-gray-400">
              <MobileSubItem href="/projects" label="Our Projects" />
              <MobileSubItem href="/projects/maisonettes" label="Maisonettes" />
              <MobileSubItem href="/projects/bungalows" label="Bungalows" />
              <MobileSubItem
                href="/projects/institutions"
                label="Institutions"
              />
            </div>
          )}

          <MobileLink href="/about" onClick={() => setMenuOpen(false)}>
            About
          </MobileLink>

          <a href="https://wa.me/254703204119?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project." onClick={() => setMenuOpen(false)} target="_blank" rel="noopener noreferrer" className="block">
            Contact
          </a>
          <MobileLink href="/admin" onClick={() => setMenuOpen(false)}>
            Admin
          </MobileLink>
        </div>
      )}
    </header>
  );
}

/* ---------- Helpers ---------- */

function NavLink({ href, children }: any) {
  return (
    <Link href={href} className="hover:text-brand-accent transition">
      {children}
    </Link>
  );
}

function DesktopDropdown({ label, children }: any) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 hover:text-brand-accent transition">
        {label}
        <ChevronDown size={16} />
      </button>

      <div className="absolute left-0 top-full z-50 hidden w-64 bg-black border border-gray-800 group-hover:block">
        {children}
      </div>
    </div>
  );
}

function DropdownItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-900 hover:text-brand-accent transition"
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className="block">
      {children}
    </Link>
  );
}

function MobileSubItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className="block py-1 hover:text-white transition">
      {label}
    </Link>
  );
}
