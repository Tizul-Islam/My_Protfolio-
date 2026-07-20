"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { loadPortfolioData, SkillCategory } from "@/data/portfolio";
import { getIcon } from "@/data/iconRegistry";

export default function Skills() {
  const [skillCategories] = useState<SkillCategory[]>(() => loadPortfolioData().skillCategories);

  if (!skillCategories.length) return null;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        <SectionHeading title="Technical Expertise" subtitle="My Skills" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {skillCategories.map((category, i) => {
            const HeaderIcon = getIcon(category.categoryIconKey);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0f0f12]/95 border border-gray-900/90 rounded-3xl p-7 shadow-2xl flex flex-col h-full hover:border-accent/30 transition-colors duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-full border border-gray-800 bg-[#161618] flex items-center justify-center text-white text-lg">
                    <HeaderIcon />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{category.title}</h3>
                </div>

                {/* Skills Tag Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIdx) => {
                    const SkillIcon = getIcon(skill.iconKey);
                    return (
                      <span
                        key={skillIdx}
                        className="inline-flex items-center gap-2 bg-[#151518]/90 border border-gray-800/80 px-3.5 py-2 rounded-full hover:border-accent/30 hover:text-white transition-all duration-300 cursor-default group/pill"
                      >
                        <SkillIcon className={`text-base ${skill.color} group-hover/pill:scale-110 transition-transform duration-300`} />
                        <span className="text-[13px] font-semibold text-gray-200 font-inter leading-none">{skill.name}</span>
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
