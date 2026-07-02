"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { FiExternalLink, FiCheck } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

type Project = {
  title: string;
  description: string;
  features: string[];
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Amader Shikkha",
    description:
      "Multi-tenant education management platform where institutions manage courses, admissions, blogs, and galleries with their own branding. Features multi-tenant routing, Google OAuth, and real-time caching.",
    features: [
      "Multi-Tenant Tenant Routing",
      "Google OAuth Integration",
      "Real-time Query Caching",
    ],
    tags: ["React 19", "Vite", "Tailwind", "Firebase", "DaisyUI"],
    liveUrl: "https://amadershikkha.com/",
    image: "/projects/amadershikkha.png",
  },
  {
    title: "ANT — Shop Management",
    description:
      "Role-based B2B e-commerce system linking manufacturers and retailers with QR shop profiles, balance and inventory tracking, and ordering flows with JWT authentication.",
    features: [
      "Role-Based Dashboard System",
      "Inventory & Balance Tracking",
      "JWT & Secure Auth Routing",
    ],
    tags: ["React 19", "Vite", "Tailwind", "Axios", "JWT"],
    liveUrl: "https://ant2025.com/",
    image: "/projects/ant2025.png",
  },
  {
    title: "IMC-Solution",
    description:
      "Corporate site for a sustainable business solutions partner, highlighting supply channels, sustainable sourcing positioning, and engineering services under a modern dark branding narrative.",
    features: [
      "Sustainable Sourcing Portfolio",
      "Modern Supply Narrative UI",
      "Highly Responsive Layouts",
    ],
    tags: ["React 19", "Vite", "Tailwind", "Axios"],
    liveUrl: "https://imc-solution.com/",
    image: "/projects/imc-solution.png",
  },
  {
    title: "Zensoft Lab",
    description:
      "Online educational marketplace and custom software services showcase. Integrates STaaS offerings, cloud infrastructure configurations, and visual portfolio highlights.",
    features: [
      "Educational Course Offerings",
      "Jitsi Live Video Integration",
      "Service & STaaS Marketplace",
    ],
    tags: ["React 19", "Vite", "Tailwind", "Jitsi", "Axios"],
    liveUrl: "https://zensoftlab.com/",
    image: "/projects/zensoftlab.png",
  },
  {
    title: "BlogPage — Blogging Platform",
    description:
      "Clean, modern responsive blog application highlighting dynamic post listings, tag filtering, customizable layouts, and optimized reading interfaces.",
    features: [
      "Dynamic Blogging Stream",
      "Category Tag Filtering",
      "Responsive Reading Grid",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://blogpage-site.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/blogpage",
    image: "/projects/blogpage.png",
  },
  {
    title: "News — Modern News Portal",
    description:
      "Real-time news portal connecting to external feeds, highlighting category sorting, search filtering, and rapid layout rendering across viewports.",
    features: [
      "Real-time API Updates",
      "Dynamic Category Routing",
      "Fast Content Rendering",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Axios", "React Router", "News API"],
    liveUrl: "https://news-psi-blush.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/News",
    image: "/projects/news.png",
  },
  {
    title: "WiztecBD — Property Portal",
    description:
      "Property search system highlighting a flexible filter sidebar for budget, suburb, and property type configurations, sortable cards, and high-performance grids.",
    features: [
      "Multi-Criteria Search Sidebar",
      "Dynamic Favorites List UI",
      "Mobile-First Listing Grid",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Axios", "React Router"],
    liveUrl: "https://wiztecbd-psi.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/WiztecBD",
    image: "/projects/wiztecbd.png",
  },
  {
    title: "Oranic - Natural Skin Care",
    description:
      "Digital skin care product showcase highlight, focusing on organic brand narrative, interactive catalogs, product listings, and sleek CSS transitions.",
    features: [
      "Interactive Product Catalog",
      "Modern Brand Narrative UI",
      "Sleek Hover Transitions",
    ],
    tags: ["React.js", "Vite", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://oranic-natural-skin-are.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/Oranic---Natural-Skin-Care",
    image: "/projects/oranic.png",
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

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
                  <span className="text-[11px] font-bold text-accent uppercase tracking-widest mb-1.5 font-inter">
                    Overview
                  </span>
                  <p className="text-gray-200 font-inter text-[14px] leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-grow flex-col p-6">
                {/* Tech Tags */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-card-border bg-background/50 px-3 py-1 font-inter text-[12px] uppercase tracking-wider text-gray-300 hover:text-white transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="mb-4 text-lg font-bold text-white transition-colors group-hover:text-accent leading-tight font-poppins">
                  {project.title}
                </h3>

                {/* 3 pointed features */}
                <div className="space-y-2 mb-6 flex-grow">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <FiCheck className="text-accent text-[16px] shrink-0 mt-0.5" />
                      <span className="text-[14px] text-gray-300 font-inter font-medium leading-normal">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer with Github & Live link */}
                <div className="mt-auto pt-4 border-t border-card-border/60 flex items-center justify-between">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-300 hover:text-accent font-inter transition-colors duration-300"
                  >
                    <FiExternalLink className="text-base" />
                    <span>Live Demo</span>
                  </a>

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-300 hover:text-accent font-inter transition-colors duration-300"
                    >
                      <FaGithub className="text-base" />
                      <span>Source Code</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-500 font-inter font-bold uppercase tracking-wider select-none">
                      Client Project
                    </span>
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
