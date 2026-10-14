"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string | string[];
  technologies?: string[];
  type: "work" | "education";
  link?: string;
}

const experiences: Experience[] = [
  {
    id: "ce-degree-bu",
    title: "B.S. Computer Engineering",
    company: "CE Degree BU",
    date: "2018 — 2022",
    description: [
      "Cloud, cybersecurity, and embedded systems.",
      "React Native, IoT, and FPGA projects.",
    ],
    technologies: ["React Native", "C++", "Verilog", "FPGA"],
    type: "education",
  },
  {
    id: "liberty-mutual",
    title: "Software Engineer",
    company: "Liberty Mutual Insurance",
    date: "July 2022 — Present",
    description: [
      "98% build success. 30% faster deployments.",
      "Approximately 25% faster incident recovery with Datadog.",
      "Approximately 30% fewer audit exceptions.",
    ],
    technologies: ["Java", "Spring Boot", "AWS", "Kafka", "GitHub Actions"],
    type: "work",
  },
  {
    id: "bldup",
    title: "Machine Learning Engineer Intern",
    company: "BLDUP",
    date: "2021",
    description: [
      "BERT classification trained on 3M+ permits.",
      "FastAPI inference service with Redis caching.",
    ],
    technologies: ["Python", "PyTorch", "BERT", "FastAPI"],
    type: "work",
  },
  {
    id: "sasha",
    title: "Healthcare Assistant Project",
    company: "SASHA",
    date: "Ongoing",
    description: "Such A Smart Healthcare Assistant. Kept visible while current implementation is still being stabilized.",
    technologies: ["Healthcare", "HTML"],
    type: "work",
    link: "https://github.com/Bryanjaimes/sasha",
  },
];

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slightly increase translucency as card scrolls through viewport.
  // Range kept subtle to mimic iOS glass feel.
  const iconOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 0.74, 0.86]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Connection line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent hidden md:block" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-8 w-2 h-2 -translate-x-[3px] rounded-full bg-blue-500 hidden md:block">
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" />
      </div>

      {/* Card */}
      <div className="glass-card glass-card-hover rounded-2xl p-8 md:ml-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Date */}
          <div className="md:w-40 flex-shrink-0">
            <span className="font-mono text-sm text-zinc-500">{experience.date}</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Title and Company */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-1">
                {experience.title}
              </h3>
              <p
                className={`font-medium ${
                  experience.type === "work" ? "text-blue-400" : "text-purple-400"
                }`}
              >
                {experience.company}
              </p>
            </div>

            {/* Description */}
            {Array.isArray(experience.description) ? (
              <ul className="text-zinc-400 leading-relaxed mb-4 list-disc pl-5 space-y-2">
                {experience.description.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-400 leading-relaxed mb-4">
                {experience.description}
              </p>
            )}

            {/* Technologies */}
            {experience.technologies && (
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    style={{ opacity: iconOpacity }}
                    className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 backdrop-blur-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Link */}
            {experience.link && (
              <a
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative pt-12 pb-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400">
              Career Path
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Experience
          </h2>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
