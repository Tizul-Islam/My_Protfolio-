"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const socialLinks = [
  { Icon: FaGithub, href: "https://github.com/Tizul-Islam", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/tizul-islam", label: "LinkedIn" },
  { Icon: FaFacebook, href: "https://www.facebook.com/tizulislamtt/", label: "Facebook" }, 
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const floatingTransition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <section id="home" className="flex items-center justify-center pt-24 pb-16 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start space-y-6"
        >
          <motion.div variants={itemVariants} className="inline-block border border-accent/30 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
            👋 Available for work
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Hi, I&apos;m <span className="text-accent">K.M Tizul Islam</span>
            <br />
            <span className="text-gray-300">Full Stack Developer</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-gray-400 max-w-lg font-inter text-lg">
            Computer Science graduate with hands-on experience in React front ends and Node.js backends. I enjoy turning UI/UX
            designs into responsive interfaces and building scalable, data-driven web applications.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link
              href="#contact"
              className="bg-accent text-black px-8 py-3 rounded-full font-semibold hover:bg-accent-hover transition-colors shadow-[0_0_20px_rgba(0,255,153,0.3)] hover:shadow-[0_0_30px_rgba(0,255,153,0.5)] transform hover:-translate-y-1"
            >
              Hire Me
            </Link>
            <a
              href="/tizul-islam-cv.pdf"
              download="Tizul-Islam-CV.pdf"
              className="px-8 py-3 rounded-full font-semibold border border-gray-600 hover:border-accent hover:text-accent transition-all duration-300 transform hover:-translate-y-1"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-5 pt-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-card-bg border border-card-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Abstract Code Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative lg:ml-auto w-full max-w-md hidden md:block"
        >
          <motion.div animate={{ y: [0, -15, 0] }} transition={floatingTransition} className="relative group">
            {/* Decorative back plate */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70" />

            <div className="relative bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
              {/* Fake Mac Window header */}
              <div className="flex px-4 py-3 bg-[#111] border-b border-gray-800 gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-4 text-xs text-gray-500 font-inter">developer.tsx</div>
              </div>
              {/* Code Content */}
              <div className="p-6 text-sm font-fira-code leading-relaxed text-gray-300 overflow-x-auto">
                <p><span className="text-pink-500">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
                <p className="ml-4">name: <span className="text-yellow-300">&quot;K.M Tizul Islam&quot;</span>,</p>
                <p className="ml-4">role: <span className="text-yellow-300">&quot;Full Stack Developer&quot;</span>,</p>
                <p className="ml-4">skills: [<span className="text-yellow-300">&quot;React&quot;</span>, <span className="text-yellow-300">&quot;Next.js&quot;</span>, <span className="text-yellow-300">&quot;Node.js&quot;</span>, <span className="text-yellow-300">&quot;MongoDB&quot;</span>],</p>
                <p className="ml-4">hardWorker: <span className="text-purple-400">true</span>,</p>
                <p className="ml-4">problemSolver: <span className="text-purple-400">true</span>,</p>
                <p className="ml-4 text-accent">hireable: <span className="text-purple-400">function</span>() {'{'}</p>
                <p className="ml-8">return <span className="text-purple-400">this</span>.hardWorker &amp;&amp; <span className="text-purple-400">this</span>.problemSolver;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'};'}</p>
              </div>
            </div>

            {/* Floating decoration */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 -bottom-8 w-24 h-24 bg-card-bg border border-card-border rounded-xl shadow-xl p-4 flex items-center justify-center backdrop-blur-sm"
            >
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">B.Sc</span>
                <span className="block text-[10px] text-gray-400 uppercase font-inter mt-1">CSE<br />2025</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
