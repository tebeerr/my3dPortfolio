"use client";

import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="mono-label">[ {index} ]</span>
          <span className="h-px w-12 bg-gradient-to-r from-accent/60 to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-display-lg text-ink">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
