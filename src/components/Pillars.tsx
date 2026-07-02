"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FaBriefcase, FaPalette, FaLightbulb } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

const pillars = [
  {
    title: "Hireability",
    subtitle: "Engineered for Results",
    icon: FaBriefcase,
    color: "from-accent to-emerald-400",
    description: "Building production-ready, highly optimized applications with clean architecture and solid SEO to deliver immediate business value.",
    points: [
      "Clean, maintainable codebase structures",
      "SEO optimized & fast load speeds",
      "Production-ready deployment pipelines"
    ]
  },
  {
    title: "Aesthetic",
    subtitle: "Visual Quality & Harmony",
    icon: FaPalette,
    color: "from-blue-400 to-cyan-400",
    description: "Designing interface experiences with balanced typography, harmonious color palettes, fluid layouts, and smooth animations.",
    points: [
      "Curated, theme-aligned HSL colors",
      "Fluid responsive layout grids",
      "Subtle, polished micro-interactions"
    ]
  },
  {
    title: "Creativity",
    subtitle: "Immersive & Engaging",
    icon: FaLightbulb,
    color: "from-purple-400 to-pink-400",
    description: "Crafting delightful interactions using custom WebGL rendering, physics-based springs, and unique cursor animations.",
    points: [
      "Hardware-accelerated WebGL ripples",
      "Elastic spring cursor followers",
      "Smooth word-reveal scroll triggers"
    ]
  }
];

export default function Pillars() {
  return (
    <section id="pillars" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-accent/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        <SectionHeading title="Core Pillars of Work" subtitle="My Philosophy" />

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#0f0f12]/90 border border-gray-900/90 rounded-3xl p-8 shadow-2xl flex flex-col justify-between h-full hover:border-accent/20 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Spotlight background card hover decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full border border-gray-800 bg-[#161618] flex items-center justify-center text-white text-xl shadow-lg group-hover:border-accent/30 transition-colors duration-300">
                      <Icon className="text-gray-300 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${pillar.color}`}>
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium font-inter">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-gray-400 font-inter leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Sub-points checklist */}
                <ul className="space-y-3.5 border-t border-gray-900 pt-6">
                  {pillar.points.map((point, pointIdx) => (
                    <li key={pointIdx} className="flex items-start gap-2.5 text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="text-accent text-[11px]" />
                      </span>
                      <span className="text-[13.5px] font-medium font-inter leading-tight">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
