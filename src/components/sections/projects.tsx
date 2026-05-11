"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Github, X, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { projects, type Project } from "@/data/projects";

const CATEGORIES = ["All", "AI/ML", "Security", "Full-Stack", "Web3", "DevOps"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-32"
    >
      <div className="container-rail">
        <SectionHeader
          index="03"
          label="Selected work"
          title="Things I've built — and broken."
          description="From RAG-powered chatbots to AI-augmented SOCs and decentralized smart contracts. Each project pushed me into a new corner of the stack."
        />

        {/* Filter pills */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-cursor="hover"
                className={`relative rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all ${
                  filter === cat
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-edge/60 text-ink-muted hover:border-accent/40 hover:text-ink"
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.span
                    layoutId="filter-glow"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/10 shadow-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                onOpen={() => setActive(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="glass glass-hover group relative flex flex-col gap-4 rounded-2xl p-6 text-left"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-accent/40" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            {project.year}
          </span>
        </div>
        <span className="rounded-full border border-edge/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-2xl font-semibold text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-accent/80">
          {project.tagline}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-ink-muted">{project.description}</p>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-full border border-edge/60 px-2 py-0.5 font-mono text-[10px] text-ink-muted"
          >
            {s}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="rounded-full px-2 py-0.5 font-mono text-[10px] text-ink-muted">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          read more
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-edge/60 text-ink-muted transition-all group-hover:border-accent/60 group-hover:bg-accent/10 group-hover:text-accent">
          <ArrowUpRight size={14} />
        </span>
      </div>

      {/* Corner accent on hover */}
      <span className="pointer-events-none absolute right-0 top-0 h-12 w-12 overflow-hidden">
        <span className="absolute right-0 top-0 h-0.5 w-8 origin-right scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
        <span className="absolute right-0 top-0 h-8 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
      </span>
    </motion.button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep/85 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8"
          >
            <button
              onClick={onClose}
              data-cursor="hover"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-edge/60 text-ink-muted transition-all hover:border-accent/60 hover:text-accent"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                {project.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {project.year}
              </span>
            </div>

            <h3 className="text-display-md text-ink">{project.title}</h3>
            <p className="mt-2 font-mono text-sm text-accent/90">
              {project.tagline}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-ink-muted sm:text-base">
              {project.longDescription}
            </p>

            <div className="mt-6">
              <p className="mono-label mb-2">Highlights</p>
              <ul className="space-y-1.5 text-sm text-ink-muted">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="mono-label mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-edge/60 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-all hover:bg-accent/15 hover:shadow-glow"
                >
                  <Github size={14} /> Source
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-edge/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink-muted transition-all hover:border-accent/50 hover:text-accent"
                >
                  <ExternalLink size={14} /> Live demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
