"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300); // Small delay before closing
          return 100;
        }
        // Accelerates progress slightly at the end
        const increment =
          prev > 70 ? Math.random() * 8 + 4 : Math.random() * 4 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 w-full h-full bg-[#040406] z-[9999] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Logo container with sliding brackets intro */}
          <div className="flex flex-col items-center select-none mb-10">
            <div className="flex items-center text-3xl sm:text-4xl font-black text-white relative">
              {/* Left bracket slides in from left */}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-accent font-bold"
              >
                &lt;
              </motion.span>

              {/* Name scales and fades in */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="mx-1 tracking-wider"
              >
                Tizul
              </motion.span>

              {/* Right bracket slides in from right */}
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-accent font-bold"
              >
                /&gt;
              </motion.span>
            </div>

            {/* Tagline reveals */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xs uppercase tracking-[0.25em] text-gray-500 font-inter mt-3.5"
            >
              Loading Experience
            </motion.p>
          </div>

          {/* Glowing neon progress indicators */}
          <div className="w-52 flex flex-col gap-2">
            <div className="w-full h-[2px] bg-gray-900 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-accent shadow-[0_0_10px_#00ff99]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-fira-code text-gray-500 font-bold uppercase tracking-wider">
              <span>Initializing</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
