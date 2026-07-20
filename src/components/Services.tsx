"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { loadPortfolioData, Service } from "@/data/portfolio";
import { getIcon } from "@/data/iconRegistry";

export default function Services() {
  const [services] = useState<Service[]>(() => loadPortfolioData().services);

  if (!services.length) return null;

  return (
    <section id="services" className="py-24 bg-card-bg/30">
      <div className="container mx-auto px-6">
        <SectionHeading title="What I Offer" subtitle="Services" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const IconComponent = getIcon(service.iconKey);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card-bg border border-card-border p-8 rounded-2xl relative group overflow-hidden flex flex-col justify-between h-full hover:border-accent/30 transition-all duration-300 shadow-lg"
              >
                {/* Accent Top Border Glow on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div>
                  {/* Icon Container */}
                  <div className="w-14 h-14 bg-accent/5 border border-accent/10 rounded-xl flex items-center justify-center text-accent text-2xl mb-6 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                    <IconComponent />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 font-poppins">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 font-inter text-[14px] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
