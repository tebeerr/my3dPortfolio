"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About", index: "01" },
  { href: "#experience", label: "Experience", index: "02" },
  { href: "#projects", label: "Projects", index: "03" },
  { href: "#skills", label: "Skills", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-px w-full origin-left bg-gradient-to-r from-accent via-accent/60 to-transparent"
        style={{ scaleX: progress }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-3 z-40 flex justify-center transition-all duration-500",
          scrolled ? "px-3 sm:px-6" : "px-6 sm:px-10"
        )}
      >
        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "glass border-edge/80 shadow-panel"
              : "border-transparent bg-transparent"
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-2"
            data-cursor="hover"
            aria-label="Go to top"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-md border border-accent/40 bg-accent/10">
              <span className="font-mono text-[11px] font-bold text-accent">R</span>
              <span className="absolute inset-0 animate-pulse-glow rounded-md bg-accent/30 blur-md" />
            </span>
            <span className="hidden font-mono text-sm tracking-wider text-ink sm:inline">
              ramsees<span className="text-accent">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
                  data-cursor="hover"
                >
                  <span className="font-mono text-[10px] text-accent/70">{link.index}</span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-accent transition-all hover:bg-accent/20 hover:shadow-glow"
          >
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent" />
            </span>
            Available
          </a>
        </nav>
      </header>
    </>
  );
}
