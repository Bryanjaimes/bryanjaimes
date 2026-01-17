"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Project {
  id: string;
  icon: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlight: {
    icon: string;
    text: string;
  };
  gradient: string;
  glowColor: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: "a-eye",
    icon: "👁️",
    title: "A-eye (SASHA)",
    description:
      "AI-powered diabetic retinopathy detection system. Catches what humans miss — because early detection means lives saved.",
    longDescription:
      "Using deep learning and computer vision to analyze retinal images, enabling early detection of diabetic retinopathy before irreversible vision loss occurs.",
    tags: ["PyTorch", "CNN", "Medical Imaging", "Python", "ONNX"],
    highlight: {
      icon: "↑",
      text: "Early detection saves vision",
    },
    gradient: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16, 185, 129, 0.2)",
    link: "https://github.com/Bryanjaimes/a-eye",
  },
  {
    id: "opendeploy",
    icon: "🚀",
    title: "OpenDeploy",
    description:
      "Multi-cloud MLOps platform with intelligent cost optimization. Getting diagnostic AI into clinics faster.",
    longDescription:
      "A unified deployment platform that abstracts away cloud complexity, enabling data scientists to deploy ML models to production in minutes, not months.",
    tags: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform"],
    highlight: {
      icon: "↓",
      text: "40% deployment cost reduction",
    },
    gradient: "from-blue-500 to-cyan-400",
    glowColor: "rgba(59, 130, 246, 0.2)",
    link: "https://github.com/Bryanjaimes/opendeploy",
  },
  {
    id: "neural-pathology",
    icon: "🧬",
    title: "Neural Pathology",
    description:
      "Transformer-based cancer cell classification from histopathology slides. Helping pathologists focus on what matters.",
    longDescription:
      "Leveraging vision transformers to analyze whole-slide images, identifying cancerous regions with high precision and providing attention maps for interpretability.",
    tags: ["Vision Transformer", "TensorFlow", "FastAPI", "Whole-Slide Imaging"],
    highlight: {
      icon: "🎯",
      text: "94% classification accuracy",
    },
    gradient: "from-purple-500 to-pink-400",
    glowColor: "rgba(139, 92, 246, 0.2)",
  },
  {
    id: "permit-classifier",
    icon: "📋",
    title: "Permit Classifier",
    description:
      "BERT-based NLP model automating construction permit classification across major US cities.",
    longDescription:
      "Trained on 3M+ permits from Boston, Austin, and San Francisco. Deployed as a production microservice handling real-time classification requests.",
    tags: ["BERT", "NLP", "FastAPI", "PostgreSQL", "Redis"],
    highlight: {
      icon: "📊",
      text: "89% accuracy on 3M+ permits",
    },
    gradient: "from-amber-500 to-orange-400",
    glowColor: "rgba(245, 158, 11, 0.2)",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: project.glowColor }}
      />

      {/* Card */}
      <div className="relative glass-card glass-card-hover rounded-3xl p-8 h-full">
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-500 group-hover:scale-110"
          style={{ background: project.glowColor }}
        >
          {project.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:gradient-text transition-all duration-500">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Highlight */}
        <div
          className={`font-mono text-sm flex items-center gap-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
        >
          <span>{project.highlight.icon}</span>
          <span>{project.highlight.text}</span>
        </div>

        {/* Link arrow */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-blue-500 to-cyan-500" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-blue-400">
              Featured Work
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Bryanjaimes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-white transition-colors group"
          >
            View all projects on GitHub
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
