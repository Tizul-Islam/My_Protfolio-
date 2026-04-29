"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { BsCodeSlash, BsLaptop, BsCart3, BsPlug, BsLayers, BsCloudUpload } from "react-icons/bs";

const services = [
  {
    icon: BsCodeSlash,
    title: "React Front-End Development",
    description: "Responsive UIs from design specs using React, Tailwind, and animation libraries like Framer Motion.",
    link: "#projects",
  },
  {
    icon: BsPlug,
    title: "API Integration",
    description: "Connecting SPAs to REST backends with Axios, JWT auth, and clean data flow across the stack.",
    link: "#projects",
  },
  {
    icon: BsLaptop,
    title: "Full-Stack Web Apps",
    description: "End-to-end features with Node.js, Express, and MongoDB or SQL databases where the project needs it.",
    link: "#skills",
  },
  {
    icon: BsCart3,
    title: "B2B & Marketplace UIs",
    description: "Role-based dashboards, commerce flows, and multi-tenant style experiences from real client work.",
    link: "#projects",
  },
  {
    icon: BsLayers,
    title: "Component Architecture",
    description: "Reusable components, modular styling, and maintainable structure for growing codebases.",
    link: "#about",
  },
  {
    icon: BsCloudUpload,
    title: "Deploy & Delivery",
    description: "Shipping to Vercel, Netlify, or cPanel with Git workflows and environment-aware builds.",
    link: "#contact",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-card-bg/30">
      <div className="container mx-auto px-6">
        <SectionHeading title="What I Offer" subtitle="Services" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card-bg border border-card-border p-8 rounded-2xl relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
              <p className="text-gray-400 font-inter text-sm leading-relaxed mb-6">{service.description}</p>

              <a
                href={service.link}
                className="inline-flex items-center text-accent text-sm font-medium hover:text-white transition-colors group/link mt-auto"
              >
                <span className="w-6 h-[1px] bg-accent mr-3 group-hover/link:w-8 transition-all" />
                Learn more
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
