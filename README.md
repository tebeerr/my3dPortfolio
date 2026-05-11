# Ramzi Teber — Portfolio

> Production-grade developer portfolio. Next.js 15 · React 19 · React Three Fiber · Motion · Lenis · Tailwind.

**Live target:** [ramziteber.vercel.app](https://ramziteber.vercel.app)

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS 3 + custom design tokens |
| 3D | React Three Fiber + Drei + custom GLSL shader |
| Animation | Motion (Framer Motion v11+) + GSAP |
| Smooth scroll | Lenis |
| Icons | lucide-react |

## Aesthetic direction

**Cyber Atelier** — a dark, architectural portfolio leaning into the terminal/cyber motif from your README. Bricolage Grotesque display + JetBrains Mono code voice. Signature accent `#64ffda` against an obsidian background. Glass surfaces, scanline overlays, holographic 3D hero.

## Quick start

```bash
# Install
npm install

# Dev server (uses Turbopack by default)
npm run dev

# Production build
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000).

> **Note on React 19 RC types:** the `package.json` includes a `types-react@19.0.0-rc.1` override to silence type warnings. If you upgrade to stable React 19 later, remove the override.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + fonts + metadata
│   ├── page.tsx            # Section composition
│   ├── globals.css         # Theme variables + base styles
│   └── api/github/route.ts # Cached GitHub profile fetch
├── components/
│   ├── layout/             # Navbar, footer, cursor, scroll provider
│   ├── sections/           # Hero, About, Experience, Projects, Skills, Contact, Marquee
│   ├── three/              # 3D scenes (R3F)
│   └── ui/                 # Reusable primitives (button, reveal, headers)
├── data/                   # Content (projects, experience, skills)
├── hooks/                  # use-lenis, use-mouse
└── lib/utils.ts            # cn() helper
```

## Customizing content

| What to edit | Where |
|---|---|
| Personal copy (hero bio, about narrative) | `src/components/sections/hero.tsx`, `about.tsx` |
| Project list | `src/data/projects.ts` |
| Experience timeline | `src/data/experience.ts` |
| Skills + galaxy nodes | `src/data/skills.ts` |
| Colors / theme | `tailwind.config.ts` + `globals.css` |
| Metadata / SEO | `src/app/layout.tsx` |

## 3D scenes

- **Hero scene** (`components/three/hero-scene.tsx`) — Holographic avatar globe with a custom fresnel + scanline shader, three orbital rings, particle field, and starfield. Renders only on the client and is intentionally `pointer-events: none` so it never blocks scroll.
- **Skill galaxy** (`components/three/skill-galaxy.tsx`) — 4 nested orbital groups, one per skill category. Hovering a node populates the readout overlay.

Both are loaded via `next/dynamic` with `ssr: false`, so they never block initial paint.

## Adding your resume

Drop `cv.pdf` in `public/` — the hero "Download Resume" button and footer link already reference `/cv.pdf`.

## Deploying

```bash
# Via Vercel CLI
npx vercel

# Or push to a Git repo connected to Vercel
git init && git remote add origin <your-repo> && git push -u origin main
```

That's it — Vercel auto-detects Next.js and ships it.

## Performance notes

- 3D canvases are dynamically imported and gated behind `Suspense`
- `next/font/google` is used for self-hosted, swap-strategy fonts (no FOIT)
- DPR is capped at `[1, 1.8]` to avoid melting retina laptops
- The skill galaxy uses `instancedMesh`-style geometry sharing where possible
- Marquee uses CSS `animation` (GPU layer), not JS
- Custom cursor is disabled on touch / coarse-pointer devices via `matchMedia`

## License

Personal portfolio. Code is yours to fork — content is mine.

---

**Built with intent. Not assembled from a template.**
