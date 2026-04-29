"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

type Skill = { name: string; level: number };

const skillCategories = [
  {
    title: "Languages & Web",
    icon: "💻",
    skills: [
      { name: "JavaScript", level: 88 },
      { name: "HTML5 & CSS3", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    title: "Frameworks & APIs",
    icon: "⚙️",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 80 },
      { name: "Node.js & Express", level: 70 },
      { name: "REST API & JWT", level: 70 },
    ],
  },
  {
    title: "Data, Tools & Deploy",
    icon: "🛠️",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL & MySQL", level: 72 },
      { name: "Git & Postman", level: 85 },
      { name: "Vercel, Netlify, cPanel", level: 78 },
    ],
  },
];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300 font-inter">{skill.name}</span>
        <span className="text-sm font-medium text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
          className="bg-accent h-2 rounded-full relative"
        >
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 rounded-full blur-[2px]" />
        </motion.div>
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Technical Expertise" subtitle="My Skills" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-card-bg border border-card-border p-6 rounded-2xl hover:border-accent/30 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                {category.title}
              </h3>

              <div className="mt-4">
                {category.skills.map((skill, j) => (
                  <SkillBar key={j} skill={skill} index={j} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
