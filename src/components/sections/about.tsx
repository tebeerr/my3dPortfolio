"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { Code2, Shield, GitBranch, MapPin } from "lucide-react";

interface GitHubUser {
  avatar_url: string;
  public_repos: number;
  followers: number;
  bio: string;
  name: string;
  login: string;
}

export function About() {
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => setUser(data))
      .catch(() => null);
  }, []);

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-32"
    >
      <div className="container-rail">
        <SectionHeader
          index="01"
          label="About"
          title="Engineer first. Builder always."
          description="A hybrid technical profile spanning full-stack development, infrastructure, networks and cybersecurity — sharpened in the lab, shipped in production."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              {/* Avatar card */}
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-bg-deep">
                  {user?.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.name || "Ramzi Teber"}
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover saturate-[0.85] transition-all duration-700 hover:saturate-100"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-deep via-bg to-bg-elevated">
                      <span className="font-mono text-6xl text-accent/40">RT</span>
                    </div>
                  )}
                  {/* Scanline overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(100,255,218,0.04) 0 1px, transparent 1px 4px)",
                    }}
                  />
                  {/* Top-left tag */}
                  <div className="absolute left-3 top-3 rounded border border-accent/40 bg-bg-deep/80 px-2 py-1 backdrop-blur">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-accent">
                      USR: ramsees
                    </p>
                  </div>
                  {/* Bottom-right corner brackets */}
                  <CornerBrackets />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs text-ink-muted">
                      @{user?.login || "tebeerr"}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-accent">
                      online · accepting commits
                    </p>
                  </div>
                  <a
                    href="https://github.com/tebeerr"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="rounded-full border border-edge/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    github →
                  </a>
                </div>
              </div>

              {/* Floating mono badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-4 hidden rotate-3 rounded-md border border-accent/40 bg-bg-deep/90 px-3 py-2 shadow-glow backdrop-blur sm:block"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  ING-4-J-SSIR
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-ink-muted">
                  TEK-UP · 2026
                </p>
              </motion.div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-ink/90 sm:text-lg">
                <p>
                  I'm <strong className="text-ink">Ramzi Teber</strong> — known
                  online as <span className="font-mono text-accent">RAMSEES</span>{" "}
                  — a full-stack ANGULAR / PHP developer and engineering student specializing in IT Systems
                  Security & Networks at TEK-UP University.
                </p>
                <p className="text-ink-muted">
                  My profile is intentionally hybrid: I write production code by
                  day (Angular, PHP/Symfony, Java Spring Boot, Python) and study
                  how those systems fail by night (Wazuh SIEM, AD hardening, MPLS
                  VPNs, ML-based threat detection). The point isn't to chase two
                  careers — it's to build the kind of engineer who can ship a
                  feature <em className="text-accent not-italic">and</em> defend
                  it.
                </p>
                <p className="text-ink-muted">
                  Outside engagements I freelance through Upwork, contribute to
                  open-source AI tooling, and run capstone work blending Wazuh
                  with ML pipelines.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard
                  icon={<GitBranch size={16} />}
                  value={user?.public_repos ?? "30+"}
                  label="Public repos"
                />
                <StatCard
                  icon={<Code2 size={16} />}
                  value="2+"
                  label="Years coding"
                />
                <StatCard
                  icon={<Shield size={16} />}
                  value="ING-SSIR"
                  label="TEK-UP 2026"
                />
                <StatCard
                  icon={<MapPin size={16} />}
                  value="Tunis"
                  label="Tunisia · TN"
                />
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 rounded-xl border border-edge/60 bg-bg-deep/30 p-5">
                <p className="mono-label mb-3">Current focus</p>
                <ul className="space-y-2 text-sm text-ink-muted">
                  <FocusItem>
                    Open source web applications penetration testing — OWASP
                  </FocusItem>
                  <FocusItem>
                    SOC analyst preparation — Wazuh, SIEM workflows, alert
                    engineering
                  </FocusItem>
                  <FocusItem>
                    AI-augmented security tooling — ML detectors, RAG-backed
                    threat intel
                  </FocusItem>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerBrackets() {
  const cls = "absolute h-4 w-4 border-accent/70";
  return (
    <>
      <span className={`${cls} left-2 top-2 border-l border-t`} />
      <span className={`${cls} right-2 top-2 border-r border-t`} />
      <span className={`${cls} bottom-2 left-2 border-b border-l`} />
      <span className={`${cls} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="glass glass-hover rounded-xl p-4">
      <div className="mb-2 text-accent">{icon}</div>
      <p className="font-display text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {label}
      </p>
    </div>
  );
}

function FocusItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}
