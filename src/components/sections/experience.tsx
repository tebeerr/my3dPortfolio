"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Briefcase, GraduationCap, FolderKanban } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { experiences, type Experience } from "@/data/experience";

const iconForType: Record<Experience["type"], React.ReactNode> = {
  work: <Briefcase size={14} />,
  education: <GraduationCap size={14} />,
  project: <FolderKanban size={14} />,
};

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-32"
    >
      <div className="container-rail">
        <SectionHeader
          index="02"
          label="Trajectory"
          title="Where I've shipped, where I've studied."
          description="An engineering journey across full-stack roles, security labs, and academic deep-dives — each step compounding the next."
        />

        <div ref={containerRef} className="relative mt-16">
          {/* Center line track */}
          <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-edge/40 md:left-1/2 md:block md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="pointer-events-none absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent md:left-1/2 md:block md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={`${exp.company}-${i}`} delay={i * 0.08}>
                  <div
                    className={`relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 ${
                      left ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div className={left ? "md:pr-12 md:text-right" : "md:pl-12"}>
                      <TimelineCard exp={exp} align={left ? "right" : "left"} />
                    </div>

                    {/* Node */}
                    <div className="pointer-events-none absolute left-4 top-6 z-10 md:left-1/2 md:-translate-x-1/2">
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />
                        <span className="relative h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(100,255,218,0.8)]" />
                      </span>
                    </div>

                    {/* Period (other side) */}
                    <div
                      className={`hidden pt-6 md:block ${
                        left ? "md:pl-12" : "md:pr-12 md:text-right"
                      }`}
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                        {exp.period}
                      </p>
                      <p className="mt-1 font-mono text-xs text-ink-muted">
                        {exp.location}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  exp,
  align,
}: {
  exp: Experience;
  align: "left" | "right";
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="glass glass-hover relative ml-12 rounded-xl p-6 md:ml-0"
    >
      <div
        className={`flex flex-wrap items-center gap-2 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
          {iconForType[exp.type]}
          {exp.type}
        </span>
        <span className="font-mono text-[11px] text-ink-muted md:hidden">
          {exp.period}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
        {exp.role}
      </h3>
      <p className="mt-1 font-mono text-sm text-accent/90">{exp.company}</p>

      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {exp.description}
      </p>

      <ul className={`mt-4 space-y-1.5 text-sm text-ink-muted ${
        align === "right" ? "md:text-right" : ""
      }`}>
        {exp.achievements.map((a) => (
          <li
            key={a}
            className={`flex items-start gap-2 ${
              align === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
            <span>{a}</span>
          </li>
        ))}
      </ul>

      <div
        className={`mt-4 flex flex-wrap gap-1.5 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        {exp.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-edge/60 px-2 py-0.5 font-mono text-[10px] text-ink-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
