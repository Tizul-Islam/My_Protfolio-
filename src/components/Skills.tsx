"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

// Icons from react-icons
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiShadcnui, 
  SiReactquery,
  SiExpress, 
  SiJsonwebtokens, 
  SiPrisma, 
  SiPostgresql, 
  SiMongodb, 
  SiNginx, 
  SiGithubactions, 
  SiCloudinary, 
  SiStripe, 
  SiOpenai, 
  SiLangchain
} from "react-icons/si";

import { 
  FaReact, 
  FaNodeJs, 
  FaDocker, 
  FaAws, 
  FaShieldAlt, 
  FaBrain,
  FaServer
} from "react-icons/fa";

import { 
  BsDatabase, 
  BsGlobe, 
  BsCpu, 
  BsCodeSlash, 
  BsCloudCheck, 
  BsRobot 
} from "react-icons/bs";

import { BiGitBranch } from "react-icons/bi";

type SkillItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type SkillCategory = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & Languages",
    icon: BsCodeSlash,
    skills: [
      { name: "React.js", icon: FaReact, color: "text-[#61dafb]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178c6]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#38bdf8]" },
      { name: "Framer Motion", icon: SiFramer, color: "text-[#f43f5e]" },
      { name: "Shadcn/UI", icon: SiShadcnui, color: "text-white" },
      { name: "TanStack Query", icon: SiReactquery, color: "text-[#ff4154]" },
    ],
  },
  {
    title: "Backend & APIs",
    icon: FaServer,
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
      { name: "Express.js", icon: SiExpress, color: "text-white" },
      { name: "REST API", icon: BsGlobe, color: "text-[#00ff99]" },
      { name: "JWT Authentication", icon: SiJsonwebtokens, color: "text-[#d63aff]" },
      { name: "Prisma ORM", icon: SiPrisma, color: "text-[#5a67d8]" },
      { name: "RBAC", icon: FaShieldAlt, color: "text-[#ff4a4a]" },
    ],
  },
  {
    title: "Database & Storage",
    icon: BsDatabase,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169e1]" },
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47a248]" },
      { name: "Prisma", icon: SiPrisma, color: "text-[#5a67d8]" },
      { name: "SQL", icon: BsDatabase, color: "text-[#00d2ff]" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: FaDocker,
    skills: [
      { name: "Docker", icon: FaDocker, color: "text-[#2496ed]" },
      { name: "Nginx", icon: SiNginx, color: "text-[#009639]" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "text-[#2088ff]" },
      { name: "CI/CD", icon: BiGitBranch, color: "text-[#ff9d00]" },
    ],
  },
  {
    title: "Cloud & Services",
    icon: FaAws,
    skills: [
      { name: "AWS", icon: FaAws, color: "text-[#ff9900]" },
      { name: "Cloudinary", icon: SiCloudinary, color: "text-[#3448c5]" },
      { name: "Stripe", icon: SiStripe, color: "text-[#635bff]" },
    ],
  },
  {
    title: "AI & Automation",
    icon: BsRobot,
    skills: [
      { name: "OpenAI API", icon: SiOpenai, color: "text-[#10a37f]" },
      { name: "LangChain", icon: SiLangchain, color: "text-[#13b55c]" },
      { name: "RAG", icon: FaBrain, color: "text-[#a855f7]" },
      { name: "pgvector", icon: SiPostgresql, color: "text-[#4169e1]" },
      { name: "n8n", icon: BsCpu, color: "text-[#ff6d5a]" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        <SectionHeading title="Technical Expertise" subtitle="My Skills" />

        {/* Skills Grid matching custom design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {skillCategories.map((category, i) => {
            const HeaderIcon = category.icon;
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
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Tag Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIdx) => {
                    const SkillIcon = skill.icon;
                    return (
                      <span
                        key={skillIdx}
                        className="inline-flex items-center gap-2 bg-[#151518]/90 border border-gray-800/80 px-3.5 py-2 rounded-full hover:border-accent/30 hover:text-white transition-all duration-300 cursor-default group/pill"
                      >
                        <SkillIcon className={`text-base ${skill.color} group-hover/pill:scale-110 transition-transform duration-300`} />
                        <span className="text-[13px] font-semibold text-gray-200 font-inter leading-none">
                          {skill.name}
                        </span>
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
