"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiPostgresql, SiDocker } from "react-icons/si";
import Magnetic from "./Magnetic";

const socialLinks = [
  { Icon: FaGithub, href: "https://github.com/Tizul-Islam", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/tizul-islam", label: "LinkedIn" },
  { Icon: FaFacebook, href: "https://www.facebook.com/tizulislamtt/", label: "Facebook" }, 
];

export default function Hero() {
  const roles = ["Full Stack Developer", "Software Engineer", "Problem Solver"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[currentRoleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedRole !== currentFullRole) {
        timer = setTimeout(() => {
          setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      if (displayedRole !== "") {
        timer = setTimeout(() => {
          setDisplayedRole(displayedRole.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const floatingTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center pt-32 pb-20 relative overflow-hidden bg-background">
      {/* Visual Accent: Dot Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-20" />

      {/* Decorative Neon Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Copywriting Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
        >
          {/* Status Badge */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 border border-accent/25 bg-accent/5 text-accent px-4 py-1.5 rounded-full text-xs font-semibold font-inter shadow-[0_0_15px_rgba(0,255,153,0.05)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Available for Opportunities
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white font-poppins"
          >
            Hi, I&apos;m <span className="text-white relative">Tizul Islam</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-teal-400">
              {displayedRole}
            </span>
            <span className="text-accent animate-pulse font-light">|</span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p 
            variants={itemVariants} 
            className="text-gray-400 max-w-lg font-inter text-[16px] sm:text-[18px] leading-relaxed"
          >
            Computer Science graduate building responsive frontends, scalable backends, and full-stack web architectures. I craft optimized solutions with React, Next.js, and Node.js.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Magnetic>
              <Link
                href="#contact"
                className="relative inline-flex items-center justify-center bg-accent text-black px-8 py-3 rounded-full font-bold hover:bg-accent-hover transition-all duration-300 shadow-[0_0_20px_rgba(0,255,153,0.25)] hover:shadow-[0_0_30px_rgba(0,255,153,0.45)] transform hover:-translate-y-0.5 font-inter block"
              >
                Hire Me
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="/tizul-islam-cv.pdf"
                download="Tizul-Islam-CV.pdf"
                className="px-8 py-3 rounded-full font-bold text-gray-300 border border-gray-800 hover:border-accent hover:text-accent bg-card-bg/40 hover:bg-accent/5 transition-all duration-300 transform hover:-translate-y-0.5 font-inter cursor-pointer block"
              >
                Download Resume
              </a>
            </Magnetic>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-4 pt-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl bg-card-bg border border-card-border/80 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:bg-accent/5 cursor-pointer"
              >
                <Icon size={19} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: High-tech Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:ml-auto hidden md:block"
        >
          {/* Main Floating Code Editor Card */}
          <motion.div 
            animate={{ y: [0, -12, 0] }} 
            transition={floatingTransition} 
            className="relative group"
          >
            {/* Visual glow backdrop behind the editor */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60 pointer-events-none" />

            <div className="relative bg-[#080808] border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl">
              {/* Fake Mac Window header */}
              <div className="flex px-5 py-3.5 bg-[#0c0c0c] border-b border-gray-900/90 gap-2 items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs text-gray-500 font-inter font-semibold tracking-wide">developer.tsx</div>
                <div className="w-8 h-3" /> {/* Spacer */}
              </div>

              {/* Code Content with syntax highlighting */}
              <div className="p-6 text-xs sm:text-sm font-fira-code leading-relaxed text-gray-400 overflow-x-auto flex">
                {/* Line Numbers */}
                <div className="pr-4 border-r border-gray-900 text-gray-700 select-none text-right flex flex-col font-inter">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                </div>

                {/* Main Code */}
                <div className="pl-4">
                  <p>
                    <span className="text-[#ff79c6]">const</span>{" "}
                    <span className="text-[#50fa7b]">developer</span> = {"{"}
                  </p>
                  <p className="ml-4">
                    name: <span className="text-[#f1fa8c]">&quot;K.M Tizul Islam&quot;</span>,
                  </p>
                  <p className="ml-4">
                    role: <span className="text-[#f1fa8c]">&quot;Full Stack Developer&quot;</span>,
                  </p>
                  <p className="ml-4">
                    skills: [
                    <span className="text-[#f1fa8c]">&quot;Next.js&quot;</span>,{" "}
                    <span className="text-[#f1fa8c]">&quot;TypeScript&quot;</span>,{" "}
                    <span className="text-[#f1fa8c]">&quot;Node&quot;</span>
                    ],
                  </p>
                  <p className="ml-4">
                    hardWorker: <span className="text-[#bd93f9]">true</span>,
                  </p>
                  <p className="ml-4">
                    problemSolver: <span className="text-[#bd93f9]">true</span>,
                  </p>
                  <p className="ml-4 text-accent">
                    hireable: <span className="text-[#bd93f9]">function</span>() {"{"}
                  </p>
                  <p className="ml-8">
                    return <span className="text-[#bd93f9]">this</span>.hardWorker &amp;&amp; <span className="text-[#bd93f9]">this</span>.problemSolver;
                  </p>
                  <p className="ml-4">{"}"}</p>
                  <p>{"};"}</p>
                </div>
              </div>
            </div>

            {/* Bottom-Right Floating Degree Badge */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#0a0a0af0] border border-gray-800/80 rounded-2xl shadow-2xl p-4 flex items-center justify-center backdrop-blur-sm group-hover:border-accent/30 transition-colors"
            >
              <div className="text-center font-inter select-none">
                <span className="block text-2xl font-black text-accent">Clean</span>
                <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1">Code & Design</span>
              </div>
            </motion.div>

            {/* Top-Left Floating Tech Stacks Badge */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 -top-8 bg-[#0a0a0af0] border border-gray-800/80 rounded-2xl shadow-2xl p-3 flex gap-3 items-center justify-center backdrop-blur-sm"
            >
              <div className="flex gap-2.5 text-gray-500 text-lg">
                <span className="hover:text-accent transition-colors"><SiNextdotjs /></span>
                <span className="hover:text-accent transition-colors"><SiTypescript /></span>
                <span className="hover:text-accent transition-colors"><SiPostgresql /></span>
                <span className="hover:text-accent transition-colors"><SiDocker /></span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
