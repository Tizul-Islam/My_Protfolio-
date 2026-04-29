"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  /** Path under /public, e.g. /projects/wiztecbd.png */
  image?: string;
};

const projects: Project[] = [
  {
    title: "Amader Shikkha",
    description:
      "Multi-tenant education management platform: institutions manage courses, admissions, blogs, and galleries with their own branding. Multi-tenant routing, Google OAuth, realtime caching, and performance tuning.",
    tags: ["React 19", "Vite", "Tailwind", "Firebase", "DaisyUI"],
    liveUrl: "https://amadershikkha.com/",
    image: "/projects/amadershikkha.png",
  },
  {
    title: "ANT — B2B E-commerce & Shop Management",
    description:
      "Role-based B2B system linking manufacturers and retailers: QR shop profiles, balance and inventory tracking, transactions, and ordering flows with JWT auth.",
    tags: ["React 19", "Vite", "Tailwind", "Axios", "JWT"],
    liveUrl: "https://ant2025.com/",
    image: "/projects/ant2025.png",
  },
  {
    title: "IMC-Solution",
    description:
      "Corporate site for a global sustainable business solutions partner—tech, supply, and services positioning with a clear service narrative and polished marketing UI.",
    tags: ["React 19", "Vite", "Tailwind", "Axios"],
    liveUrl: "https://imc-solution.com/",
    image: "/projects/imc-solution.png",
  },
  {
    title: "Zensoft Lab",
    description:
      "Online education marketplace and software services presence: STaaS, mobile and web offerings, and cloud portfolio highlights including GenZsoft Cloud themes.",
    tags: ["React 19", "Vite", "Tailwind", "Jitsi", "Axios"],
    liveUrl: "https://zensoftlab.com/",
    image: "/projects/zensoftlab.png",
  },
  {
    title: "BlogPage — Blogging Platform",
    description:
      "Responsive blog app with React and Tailwind CSS: dynamic post listings, clean UI, and interactive content with a focus on performance.",
    tags: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://blogpage-site.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/blogpage",
    image: "/projects/blogpage.png",
  },
  {
    title: "News — Modern News Portal",
    description:
      "Modern responsive news portal with real-time updates across categories. Dynamic API integration, clean UI, and optimized performance for a smooth experience on all devices.",
    tags: ["React", "Vite", "Tailwind CSS", "Axios", "React Router", "News API"],
    liveUrl: "https://news-psi-blush.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/News",
    image: "/projects/news.png",
  },
  {
    title: "WiztecBD — Property Listings Platform",
    description:
      "Modern responsive web app for WiztecBD: property search with filter sidebar (budget, suburb, property type), sortable results, and a responsive listing grid with favorites-ready UI. Clean UX, reusable components, structured layout, and mobile-first design with performance in mind.",
    tags: ["React", "Vite", "Tailwind CSS", "Axios", "React Router"],
    liveUrl: "https://wiztecbd-psi.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/WiztecBD",
    image: "/projects/wiztecbd.png",
  },
  {
    title: "Oranic - Natural Skin Care",
    description:
      "Built a responsive skincare product showcase website using React and Tailwind CSS, featuring modern UI design, product sections, and optimized user experience.",
    tags: ["React.js", "Vite", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://oranic-natural-skin-are.vercel.app/",
    githubUrl: "https://github.com/Tizul-Islam/Oranic---Natural-Skin-Care",
    image: "/projects/oranic.png",
  },
];

const iconBtnClass =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-black shadow-[0_0_20px_rgba(0,255,153,0.45)] transition-transform duration-300 hover:scale-110 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="My Recent Projects" subtitle="Portfolio" />

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-card-border bg-card-bg"
            >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-black">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview screenshot`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <span className="text-center font-fira-code text-sm text-gray-600 transition-opacity duration-300 group-hover:opacity-30">
                      {"// "}
                      {project.title}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 z-10 flex items-center justify-center gap-4 bg-black/70 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconBtnClass}
                    aria-label={`Open ${project.title} live site`}
                    title="Live demo"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="h-6 w-6" strokeWidth={2.2} />
                  </a>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={iconBtnClass}
                      aria-label={`View ${project.title} on GitHub`}
                      title="Source on GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub className="h-7 w-7" />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-grow flex-col p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-accent/30 bg-accent/5 px-2 py-1 font-inter text-[10px] uppercase tracking-wider text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-accent">{project.title}</h3>
                <p className="mb-6 flex-grow font-inter text-sm leading-relaxed text-gray-400">{project.description}</p>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-900/80 bg-emerald-950/50 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                >
                  See Details
                  <FiExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
