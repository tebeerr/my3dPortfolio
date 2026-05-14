"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Linkedin, MapPin, Send, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setState("sending");

    // Open mailto with prefilled body — no backend dependency
    const subject = `Portfolio contact from ${form.name || "anonymous"}`;
    const body = `${form.message}\n\n— ${form.name || "anonymous"}\n${form.email}`;
    const mailto = `mailto:teberramzi@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailto;
      setState("sent");
      setTimeout(() => {
        setState("idle");
        setForm({ name: "", email: "", message: "" });
      }, 2500);
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-32"
    >
      <div className="container-rail">
        <SectionHeader
          index="05"
          label="Open channel"
          title="Let's build something."
          description="Software developer first, cybersecurity internships, SOC analyst roles , freelance projects, or just a good conversation about secure systems. Inbox is open."
          align="center"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left — quick links */}
          <Reveal className="lg:col-span-5">
            <div className="space-y-3">
              <ContactLink
                icon={<Mail size={18} />}
                title="Email"
                value="teberramzi@gmail.com"
                href="mailto:teberramzi@gmail.com"
              />
              <ContactLink
                icon={<Github size={18} />}
                title="GitHub"
                value="@tebeerr"
                href="https://github.com/tebeerr"
              />
              <ContactLink
                icon={<Linkedin size={18} />}
                title="LinkedIn"
                value="Ramzi Teber"
                href="https://linkedin.com/in/ramzi-teber-44749321b"
              />
              <ContactLink
                icon={<MapPin size={18} />}
                title="Based in"
                value="Tunis, Tunisia · UTC+1"
                href="https://maps.google.com/?q=Tunis,Tunisia"
              />
            </div>

            <div className="mt-6 rounded-xl border border-edge/40 bg-bg-deep/30 p-5">
              <p className="mono-label mb-2">Status</p>
              <p className="text-sm text-ink-muted">
                Actively interviewing for{" "}
                <span className="text-accent">Software Developer</span>,{" "}
                <span className="text-accent">Cybersecurity Engineer</span>, 
                <span className="text-accent">SOC Analyst</span> and <span className="text-accent">Networks/Telecom Consultant</span> roles in the Tunisian
                market.
              </p>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass relative space-y-4 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Jane Doe"
                />
                <FormField
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Message
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="Tell me about the role, project, or idea…"
                  className="w-full resize-none rounded-lg border border-edge/60 bg-bg-deep/40 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-dim focus:border-accent/60 focus:bg-bg-deep/60"
                />
              </div>

              <button
                type="submit"
                disabled={state !== "idle"}
                data-cursor="hover"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-accent/50 bg-accent/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent/15 hover:shadow-glow disabled:opacity-70"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <AnimatePresence mode="wait" initial={false}>
                  {state === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      Send message <Send size={14} />
                    </motion.span>
                  )}
                  {state === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-3 w-3 rounded-full border-2 border-accent border-t-transparent"
                      />
                      Transmitting…
                    </motion.span>
                  )}
                  {state === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={14} /> Sent · opening mail client
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <p className="font-mono text-[10px] text-ink-muted">
                Submitting opens your default mail client with a prefilled draft.
                No data is stored.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      data-cursor="hover"
      className="glass glass-hover group flex items-center justify-between rounded-xl p-4"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge/60 bg-bg-deep/40 text-accent transition-all group-hover:border-accent/60 group-hover:bg-accent/10">
          {icon}
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            {title}
          </p>
          <p className="font-mono text-sm text-ink">{value}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-ink-muted transition-colors group-hover:text-accent">
        →
      </span>
    </a>
  );
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-edge/60 bg-bg-deep/40 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-dim focus:border-accent/60 focus:bg-bg-deep/60"
      />
    </div>
  );
}
