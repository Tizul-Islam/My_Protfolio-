"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 font-inter"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold tracking-wider capitalize"
      >
        {title.split(" ").map((word, i, arr) => (
          <span
            key={i}
            className={
              i === arr.length - 1
                ? "text-accent inline-block relative"
                : "text-white inline-block mr-2"
            }
          >
            {word}
            {i === arr.length - 1 && (
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-accent rounded-full" />
            )}
          </span>
        ))}
      </motion.h2>
    </div>
  );
}
