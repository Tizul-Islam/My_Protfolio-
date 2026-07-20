"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { FiExternalLink, FiCheck } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { loadPortfolioData, Project } from "@/data/portfolio";

export default function Projects() {
  const [projects] = useState<Project[]>(() => loadPortfolioData().projects);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  if (!projects.length) return null;

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="My Recent Projects" subtitle="Portfolio" />

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg/60 backdrop-blur-sm hover:border-accent/40 transition-all duration-300 shadow-xl"
              >
                {/* Image Container with Details Overlay */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-black border-b border-card-border/50">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview screenshot`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-fira-code text-xs text-gray-600">{project.title}</span>
                    </div>
                  )}

                  {/* Details Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#070707fa]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 z-20">
                    <span className="text-[11px] font-bold text-accent uppercase tracking-widest mb-1.5 font-inter">Overview</span>
                    <p className="text-gray-200 font-inter text-[14px] leading-relaxed">{project.description}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-grow flex-col p-6">
                  {/* Tech Tags */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-card-border bg-background/50 px-3 py-1 font-inter text-[12px] uppercase tracking-wider text-gray-300 hover:text-white transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-lg font-bold text-white transition-colors group-hover:text-accent leading-tight font-poppins">
                    {project.title}
                  </h3>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <FiCheck className="text-accent text-[16px] shrink-0 mt-0.5" />
                        <span className="text-[14px] text-gray-300 font-inter font-medium leading-normal">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-card-border/60 flex items-center justify-between">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-300 hover:text-accent font-inter transition-colors duration-300">
                      <FiExternalLink className="text-base" />
                      <span>Live Demo</span>
                    </a>
                    {project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-300 hover:text-accent font-inter transition-colors duration-300">
                        <FaGithub className="text-base" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-gray-500 font-inter font-bold uppercase tracking-wider select-none">Client Project</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {projects.length > 6 && (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold text-accent bg-accent/5 border border-accent/20 hover:bg-accent hover:text-black hover:shadow-[0_0_20px_rgba(0,255,153,0.25)] transition-all duration-300 font-inter cursor-pointer overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
