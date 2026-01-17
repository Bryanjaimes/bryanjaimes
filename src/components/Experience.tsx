"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Experience {
  id: string;
  date: string;
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  type: "work" | "education";
}

const experiences: Experience[] = [
  {
    id: "liberty-mutual",
    date: "2022 — Present",
    title: "Software Engineer",
    company: "Liberty Mutual Insurance",
    description:
      "Led CI/CD modernization across Java Spring Boot microservices. Migrated 100% of Premium Posting pipelines from Jenkins/Bamboo to GitHub Actions. Built event-driven integrations with AWS SNS/SQS, DynamoDB, and Kafka for real-time policy processing.",
    technologies: [
      "Java",
      "Spring Boot",
      "AWS",
      "GitHub Actions",
      "Kafka",
      "DynamoDB",
    ],
    type: "work",
  },
  {
    id: "bldup",
    date: "2021",
    title: "Machine Learning Engineer",
    company: "BLDUP",
    description:
      "Built and deployed ML microservice automating permit classification with ~90% accuracy. Trained BERT model on 3M+ permits from Boston, Austin, and San Francisco. Designed production-ready FastAPI service with Redis caching.",
    technologies: ["Python", "PyTorch", "BERT", "FastAPI", "Redis", "PostgreSQL"],
    type: "work",
  },
  {
    id: "bu",
    date: "2018 — 2022",
    title: "B.S. Computer Engineering",
    company: "Boston University",
    description:
      "Foundation in systems engineering, algorithms, and machine learning fundamentals. Focused coursework in deep learning, computer vision, and distributed systems. Senior capstone: Diabetic retinopathy detection system (A-eye).",
    type: "education",
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
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
            <p className="text-zinc-400 leading-relaxed mb-4">
              {experience.description}
            </p>

            {/* Technologies */}
            {experience.technologies && (
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
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

        {/* Resume Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/10 font-mono text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-300 group"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
