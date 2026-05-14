"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

const titles = [
  "Software Engineer",
  "Angular Developer",
  "Cybersecurity Engineer",
  "Python Engineer",
  "Cloud Practitioner",
  "AI Enthusiast",
];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % titles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg pt-20"
    >
      {/* Grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,255,218,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(60% 60% at 50% 50%, #000 30%, transparent 80%)",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-80" />

      {/* 3D scene — full-bleed background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[80vh] w-[80vh] max-h-[700px] max-w-[700px]">
          <HeroScene />
        </div>
      </div>

      {/* Content */}
      <div className="container-rail relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-edge/60 bg-bg-deep/40 px-4 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                Tunis · Tunisia · UTC+1
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 font-mono text-sm text-accent"
            >
              <span className="text-ink-muted">$ </span>
              whoami
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-display-xl font-bold text-ink"
            >
              Ramzi
              <br />
              <span className="text-shimmer">Teber.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 flex h-10 items-center gap-3 overflow-hidden"
            >
              <span className="h-px w-10 bg-accent" />
              <div className="relative h-8 overflow-hidden">
                {titles.map((t, i) => (
                  <motion.span
                    key={t}
                    className="absolute left-0 top-0 whitespace-nowrap font-mono text-lg text-ink-muted sm:text-xl"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{
                      y: i === idx ? 0 : i < idx ? -40 : 40,
                      opacity: i === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              I build production-grade web and mobile applications — then I break
              them to understand why they work. Final-year ING-SSIR student at
              TEK-UP, bridging full-stack engineering and cybersecurity through
              AI-powered tools and secure-by-design systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#projects">
                View Projects
                <ArrowDown size={14} />
              </MagneticButton>
              <MagneticButton href="/resume.pdf" variant="ghost" download>
                <Download size={14} />
                Download Resume
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                <Mail size={14} />
                Contact
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
