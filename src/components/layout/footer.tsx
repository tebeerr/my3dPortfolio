import { Github, Linkedin, Mail, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-edge/60 bg-bg-deep/60 px-6 py-12">
      <div className="container-rail">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <pre className="font-mono text-[10px] leading-tight text-accent/60 sm:text-xs">{`
  ╔══════════════════════════════════╗
  ║  build it. break it. harden it.  ║
  ║  — RAMSEES                       ║
  ╚══════════════════════════════════╝
`}</pre>
            <p className="mt-4 max-w-md font-mono text-xs text-ink-muted">
              Designed and built by Ramzi Teber. Next.js · React Three Fiber · Motion.
              Deployed on Vercel from Tunis, Tunisia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FooterLink href="https://github.com/tebeerr" icon={<Github size={14} />} label="GitHub" />
            <FooterLink href="https://linkedin.com/in/ramzi-teber-44749321b" icon={<Linkedin size={14} />} label="LinkedIn" />
            <FooterLink href="mailto:teberramzi@gmail.com" icon={<Mail size={14} />} label="Email" />
            <FooterLink href="/RamziTeber_EN.pdf" icon={<FileText size={14} />} label="Resume" download />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-edge/40 pt-6 text-xs text-ink-muted md:flex-row md:items-center">
          <span className="font-mono">
            © {new Date().getFullYear()} Ramzi Teber. All systems operational.
          </span>
          <span className="font-mono text-accent/70">
            v1.0.1
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  label,
  download,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  download?: boolean;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      download={download || undefined}
      data-cursor="hover"
      className="group inline-flex items-center gap-2 rounded-full border border-edge/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-all hover:border-accent/60 hover:text-accent"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
