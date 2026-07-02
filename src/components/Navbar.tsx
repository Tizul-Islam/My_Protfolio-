"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full ${
          scrolled
            ? "top-4 w-[90%] max-w-5xl bg-[#0a0a0af0]/75 border border-card-border/80 shadow-[0_15px_30px_rgba(0,0,0,0.6)] backdrop-blur-lg px-6 py-2.5"
            : "top-0 w-full bg-transparent px-8 py-6 border-b border-transparent"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Magnetic>
            <Link href="#home" className="text-xl font-black text-white flex items-center gap-1 group select-none">
              <span className="text-accent group-hover:-translate-x-1 transition-transform duration-300 font-bold">&lt;</span>
              <span className="tracking-wide">Tizul</span>
              <span className="text-accent group-hover:translate-x-1 transition-transform duration-300 font-bold">/&gt;</span>
            </Link>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-[13px] uppercase tracking-wider font-bold text-gray-400 hover:text-accent font-inter transition-all duration-300"
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredLink === link.name && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 bg-accent/5 border border-accent/10 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <Magnetic>
              <Link
                href="#contact"
                className="px-5 py-2 text-xs uppercase tracking-wider font-bold text-black bg-accent rounded-full hover:bg-accent-hover shadow-[0_0_15px_rgba(0,255,153,0.15)] hover:shadow-[0_0_20px_rgba(0,255,153,0.35)] transition-all duration-300 font-inter block"
              >
                Hire Me
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl text-gray-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-[5%] right-[5%] z-45 bg-[#0a0a0af0]/95 border border-card-border/80 rounded-3xl p-6 backdrop-blur-lg shadow-2xl md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-accent font-inter transition-colors text-base font-bold py-2 border-b border-gray-900/50 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-2.5 text-sm uppercase tracking-wider font-bold text-black bg-accent rounded-xl hover:bg-accent-hover transition-colors font-inter block"
              >
                Hire Me
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
