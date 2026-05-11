"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 600, damping: 30, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 600, damping: 30, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor='hover']")) setHovering(true);
      else setHovering(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60"
        style={{
          x: ringX,
          y: ringY,
          width: hovering ? 50 : 28,
          height: hovering ? 50 : 28,
          boxShadow: hovering
            ? "0 0 30px rgba(100,255,218,0.6), inset 0 0 12px rgba(100,255,218,0.3)"
            : "0 0 14px rgba(100,255,218,0.35)",
          transition: "width 200ms ease, height 200ms ease, box-shadow 200ms ease",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
