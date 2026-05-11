"use client";

import { Sparkle } from "lucide-react";

const tokens = [
  "Angular",
  "TypeScript",
  "Python",
  "React",
  "Spring Boot",
  "Docker",
  "Kubernetes",
  "Wazuh SIEM",
  "GitLab CI/CD",
  "MPLS VPN",
  "Active Directory",
  "Symfony",
  "LangChain",
  "Three.js",
  "Linux",
  "Ansible",
];

export function Marquee() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-edge/40 bg-bg-deep/40 py-5"
    >
      <div className="flex w-max animate-marquee items-center gap-6">
        {[...tokens, ...tokens, ...tokens].map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center gap-6 font-mono text-sm uppercase tracking-[0.25em] text-ink-muted"
          >
            <span>{t}</span>
            <Sparkle size={10} className="text-accent/60" />
          </span>
        ))}
      </div>

      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-deep to-transparent" />
    </div>
  );
}
