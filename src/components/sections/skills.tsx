"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/data/skills";

const SkillGalaxy = dynamic(
  () => import("@/components/three/skill-galaxy").then((m) => m.SkillGalaxy),
  { ssr: false }
);

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-32"
    >
      <div className="container-rail">
        <SectionHeader
          index="04"
          label="Technical universe"
          title="Orbiting stacks. Grounded fundamentals."
          description="Frontend frameworks at the surface, secure infrastructure underneath. Hover the nodes — each one is a tool I reach for in production."
        />

        <Reveal>
          <SkillGalaxy />
        </Reveal>

        {/* Group detail accordion-style grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08}>
              <div className="glass glass-hover rounded-xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: group.hue,
                      boxShadow: `0 0 12px ${group.hue}`,
                    }}
                  />
                  <span className="mono-label" style={{ color: group.hue }}>
                    [ 0{i + 1} ]
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {group.label}
                  </h3>
                </div>

                <div className="space-y-3">
                  {group.skills.map((s) => (
                    <div key={s.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-mono text-xs text-ink">{s.name}</span>
                        <span className="font-mono text-[10px] text-ink-muted">
                          {s.level}%
                        </span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          className="h-full"
                          style={{
                            background: `linear-gradient(90deg, ${s.color}, ${group.hue})`,
                            boxShadow: `0 0 8px ${s.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
