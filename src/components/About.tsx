"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FaLaptopCode, FaProjectDiagram, FaGraduationCap } from "react-icons/fa";
import Image from "next/image";

export default function About() {
  const stats = [
    { icon: FaGraduationCap, value: "2025", label: "CSE Graduate" },
    { icon: FaLaptopCode, value: "6 mo", label: "Zensoft Internship" },
    { icon: FaProjectDiagram, value: "4+", label: "Live Projects" },
  ];

  return (
    <section id="about" className="py-24 bg-card-bg/30">
      <div className="container mx-auto px-6">
        <SectionHeading title="Know More About Me" subtitle="About Me" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
         
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-gray-800 group">
              <div className="w-full h-full bg-gradient-to-br from-card-bg to-[#1a1a1a] flex items-center justify-center">
                <Image 
                  src="/tizul.jpeg" 
                  alt="Tizul Islam" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              I&apos;m a Passionate <span className="text-accent">Web Developer</span>
            </h3>

            <p className="text-gray-400 font-inter leading-relaxed">
              I&apos;m a Computer Science graduate with growing experience in software engineering. I&apos;m comfortable across the stack:
              React for the front end and Node.js with MongoDB and SQL on the back end. I like applying solid engineering practices
              to real products and learning how to make applications scalable and maintainable.
            </p>
            <p className="text-gray-400 font-inter leading-relaxed">
              As a Junior Front-End Developer intern at Zensoft Lab (June–November 2025), I shipped responsive UIs for projects
              including AmaderShikkha, ANT2025, imc-solution, and Zensoft Lab—using React, Framer Motion, API integration, and
              Git-based workflows with designers and backend teams.
            </p>
            <p className="text-gray-400 font-inter leading-relaxed mb-6">
              I completed my B.Sc. in CSE from Green University of Bangladesh (2025). Outside of code, I enjoy cricket and football,
              was a member of GUCC, and took part in ICPC selection and intra-department programming contests.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-card-bg border border-card-border rounded-xl p-4 text-center transition-all duration-300 hover:border-accent/50 group flex flex-col items-center justify-center"
                >
                  <stat.icon className="text-accent text-2xl mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-2xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-xs text-gray-500 font-inter leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="/tizul-islam-cv.pdf"
                download="Tizul-Islam-CV.pdf"
                className="inline-block bg-accent/10 border border-accent/20 text-accent px-6 py-2.5 rounded-full hover:bg-accent hover:text-black transition-colors font-medium"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
