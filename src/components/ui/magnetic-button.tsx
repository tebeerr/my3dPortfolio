"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  download?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  href = "#",
  variant = "primary",
  children,
  className,
  download,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
        variant === "primary" &&
          "border border-accent/50 bg-accent/10 text-accent hover:bg-accent/15 hover:shadow-glow",
        variant === "ghost" &&
          "border border-edge/60 text-ink-muted hover:border-accent/50 hover:text-accent",
        className
      )}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.a>
  );
}
