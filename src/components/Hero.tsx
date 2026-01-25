"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamic import for Three.js component (client-side only)
const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border border-blue-500/20 animate-pulse" />
    </div>
  ),
});

const stats = [
  { value: "4+", label: "Years Experience" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 3D Globe */}
      <GlobeScene />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-blue-500" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400">
              AI/ML Engineer
            </span>
            <span className="w-10 h-px bg-gradient-to-l from-transparent to-blue-500" />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-8"
          >
            Bryan{" "}
            <em className="italic gradient-text">Jaimes</em>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="#projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="#contact" className="btn-secondary">
              Get in Touch
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12 border-t border-white/10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl italic gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-xs tracking-[0.1em] uppercase text-zinc-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="font-mono text-xs tracking-wider uppercase">Scroll</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
