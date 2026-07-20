"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FaLaptopCode, FaProjectDiagram, FaGraduationCap, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import Image from "next/image";
import { loadPortfolioData, AboutData } from "@/data/portfolio";

type TabId = "profile" | "experience" | "education";

const statIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGraduationCap,
  FaLaptopCode,
  FaProjectDiagram,
};

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [about] = useState<AboutData>(() => loadPortfolioData().about);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
  ];

  if (!about) return null;

  return (
    <section id="about" className="py-24 bg-card-bg/30 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        <SectionHeading title="Know More About Me" subtitle="About Me" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Aesthetic Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-accent/20 to-blue-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full max-w-sm sm:max-w-md mx-auto rounded-2xl overflow-hidden border border-gray-800/80 bg-card-bg/95 group shadow-2xl">
              <div className="w-full h-full relative flex items-center justify-center">
                <Image
                  src="/tizul.jpeg"
                  alt="Tizul Islam"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Floating Glassmorphic Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 md:right-8 bg-[#0a0a0af0] border border-gray-800/80 p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg shadow-inner">
                <FaLaptopCode />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider font-inter">Current Focus</span>
                <span className="block text-sm font-bold text-white">{about.currentFocus}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Tabs & Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6 lg:pl-4"
          >
            <div>
              <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                {about.heading} <br />
                <span className="text-accent bg-accent/5 px-2.5 py-0.5 rounded border border-accent/15 inline-block mt-2">{about.subheading}</span>
              </h3>
            </div>

            {/* Tab Swapper */}
            <div className="flex border-b border-card-border pb-px gap-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabId)}
                    className={`relative px-4 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer font-inter ${isActive ? "text-accent" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeAboutTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="min-h-[220px] relative">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-4">
                    {about.profileBio.map((para, i) => (
                      <p key={i} className="text-gray-400 font-inter text-[15px] leading-relaxed">{para}</p>
                    ))}
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {about.stats.map((stat, i) => {
                        const StatIcon = statIconMap[stat.icon] ?? FaGraduationCap;
                        return (
                          <div key={i} className="bg-card-bg/60 border border-card-border rounded-xl p-4 text-center transition-all duration-300 hover:border-accent/40 group flex flex-col items-center justify-center">
                            <StatIcon className="text-accent text-xl mb-1.5 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xl font-bold text-white mb-0.5">{stat.value}</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-inter leading-none">{stat.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === "experience" && (
                  <motion.div key="experience" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-4">
                    {about.experience.map((exp, i) => (
                      <div key={i} className="relative border-l border-gray-800 pl-5 ml-1.5 py-1">
                        <div className="absolute left-0 top-2 -translate-x-[4.5px] w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/10" />
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h4 className="text-lg font-bold text-white leading-tight">{exp.role}</h4>
                          <span className="text-[11px] font-fira-code text-accent bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <FaCalendarAlt size={10} /> {exp.period}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-inter font-semibold mb-3 uppercase tracking-wider flex items-center gap-1">
                          <FaBriefcase size={10} /> {exp.company}
                        </p>
                        <p className="text-gray-400 font-inter text-[14px] leading-relaxed mb-4">{exp.description}</p>
                        {exp.projects.length > 0 && (
                          <div>
                            <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-inter mb-2">Projects Shipped</span>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.projects.map((project) => (
                                <span key={project} className="text-[11px] font-inter text-gray-300 bg-background/80 border border-card-border px-2.5 py-0.5 rounded-full">{project}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "education" && (
                  <motion.div key="education" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-4">
                    {about.education.map((edu, i) => (
                      <div key={i} className="relative border-l border-gray-800 pl-5 ml-1.5 py-1">
                        <div className="absolute left-0 top-2 -translate-x-[4.5px] w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/10" />
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h4 className="text-lg font-bold text-white leading-tight">{edu.degree}</h4>
                          <span className="text-[11px] font-fira-code text-accent bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <FaCalendarAlt size={10} /> {edu.period}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-inter font-semibold mb-3 uppercase tracking-wider">{edu.institution}</p>
                        <p className="text-gray-400 font-inter text-[14px] leading-relaxed">{edu.description}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume Button */}
            <div className="pt-4">
              <a
                href="/Tizul_Islam_Resume.pdf"
                download="Tizul_Islam_Resume.pdf"
                className="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-accent bg-accent/5 border border-accent/20 hover:bg-accent hover:text-black transition-all duration-300 font-inter cursor-pointer overflow-hidden group shadow-[0_0_15px_rgba(0,255,153,0.05)] hover:shadow-[0_0_20px_rgba(0,255,153,0.2)]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
